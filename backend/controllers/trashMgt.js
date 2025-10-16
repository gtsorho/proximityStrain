const Joi = require('joi')
const axios = require('axios');
const db = require('../models')
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const {Op, Sequelize, where } = require("sequelize")
require('dotenv').config();


let ioInstance;


module.exports = {

    getClient: async(req, res)=>{
        let clients = await db.client.findAll({include: db.user})
        res.send(clients)
    },
    createClient: async (req, res) => {
        function validExtOfficer(client){
            const schema = Joi.object({
                name:Joi.string().required(),
                phone:Joi.string().allow(null).optional(),
                location: Joi.string().required(),
                coordinates: Joi.string().required(),
                remark: Joi.string().valid('HIGH', 'LOW','MID'),
                level: Joi.number().allow(null),
                user:Joi.number().required()
            })
            return schema.validate(client)
        }
        const validate = validExtOfficer(req.body) 
        if (validate.error) return res.status(400).send(validate.error.details[0].message)

         client = {
            'name': req.body.name,
            'phone': null,
            'location': req.body.location,
            'coordinates': req.body.coordinates,
            'userId':req.body.user
        }

        client = await db.client.create(client)
        record = await db.record.create({ clientId:client.id, level:0,  isVerified: true });
        res.send(client)
    }, 
    updateClient: async (req, res) => {
        function validExtOfficer(client){
            const schema = Joi.object({
                name:Joi.string().allow(null),
                phone:Joi.string().allow(null),
                location: Joi.string().allow(null),
                coordinates: Joi.string().allow(null),
                user:Joi.number().allow(null)
            }).unknown(true)
            return schema.validate(client)
        }
        const validate = validExtOfficer(req.body) 
        if (validate.error) return res.status(400).send(validate.error.details[0].message)
        if(req.body.user) req.body['UserId'] = req.body.user

        client = await db.client.update(req.body, {
            where:{id : req.params.id}
        })

        res.send(client)
    }, 
    deleteClient: async(req, res) =>{
       let client = await db.client.destroy({
            where: {
              id: req.params.id
            }
          });
          res.sendStatus(200)
    },
    searchClient: async (req, res) => {
        const searchValue = req.body

        const whereClause = {};

        if (searchValue) {
              whereClause[Op.or] = [
                { name: { [Op.like]: `%${searchValue}%` } },
                { phone: { [Op.like]: `%${searchValue}%` } },
                { remark: { [Op.like]: `%${searchValue}%` } },
                { location: { [Op.like]: `%${searchValue}%` } },
              ]
          }
    
        const searchResults = await db.client.findAll({
            where: whereClause,
        });
     
        res.send(searchResults)
    },
    sendMessage: async (clientId) => { 
        let client  = await db.client.findOne({where:{id:clientId}, include: db.user})
        axios.post('https://api.mnotify.com/api/sms/quick?key=tAUkX60KwFyFKzxCv4YZKdGH3', 
        {
            recipient: [client.user.phone],
            sender: process.env.MNOTIFY_TOPIC,
            message: `${client.name} sensor at ${client.location} triggered, HIGH strain`,
            is_schedule: 'false',
            schedule_date: ''
        })
        .then(response => {
            return response.data
        })
        .catch(error =>{
            console.log(error)
        })
    },
    getRecords: async (req, res) => {
        try {
            let records = await db.record.findAll({
                include: db.client,
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            res.send(records);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    },
    updateRecord: async (req, res) => {
        record = await db.record.update({'isVerified':true}, {
            where:{id : req.params.id}
        })
        res.send(record)
    },
    levelChange: async (req, res) =>{ 
        let level;

        const previousRecord = await db.record.findOne({
        where: { clientId: req.params.id },
        order: [['createdAt', 'DESC']], 
        });


        if (req.body.level >= 80 ) {
            level = 'HIGH';
    
            if(req.body.level >= 80 && previousRecord.dataValues.level >= 80 ){
                record = await db.record.update({ level:req.body.level }, {where:{id : previousRecord.dataValues.id}});
            }else{
                record = await db.record.create({ clientId: req.params.id, level:req.body.level,  isVerified: true });
                module.exports.sendMessage(req.params.id)
            }
        } else if (req.body.level > 20 && req.body.level < 80) {
            level = 'MID';
            if( req.body.level > 20 && req.body.level < 80  &&   previousRecord.dataValues.level > 20 && previousRecord.dataValues.level < 80  ){
                record = await db.record.update({ level:req.body.level }, {where:{id : previousRecord.dataValues.id}});
            }else{
                record = await db.record.create({ clientId: req.params.id, level:req.body.level, isVerified: true });
            }
        } else {
            level = 'LOW';
            if(req.body.level <= 20 && previousRecord.dataValues.level <= 20 ){
                record = await db.record.update({ level:req.body.level }, {where:{id : previousRecord.dataValues.id}});
            }else{
                record = await db.record.create({ clientId: req.params.id, level:req.body.level });
            }

        }

        await db.client.update(
            { level: req.body.level, remark: level },
            {
                where: { id: req.params.id },
            }
        );

        let newData = await db.client.findOne({where:{id:req.params.id}});

        if (global.websocketServer) {
            global.websocketServer.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(newData));
                }
            });
        }

        res.send('level changed');  

    },
    getOneClient: async (req, res) => {
        try {
            let records = await db.client.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: db.record,
                        where: {
                            level: { [Op.gt]: 80 }
                        },
                        order: [
                            ['createdAt', 'DESC']
                        ]
                    }
                ]
            });
            res.send(records);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },    
    setIoInstance: (io) => {
        ioInstance = io;
    },
    login: async(req, res) => {
        const { username, password } = req.body;

        try {
            const user = await db.user.findOne({ where: { username } });

            if (!user || !(await user.isValidPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_KEY, { expiresIn: '23h' });

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    createUser: async (req, res) => {
        function validExtOfficer(user){
            const schema = Joi.object({
                username:Joi.string().required(),
                phone:Joi.string().allow(null),
                password:Joi.string().required(),
                confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
            })
            return schema.validate(user)
        }
        const validate = validExtOfficer(req.body) 
        if (validate.error) return res.status(400).send(validate.error.details[0].message)

        try {
        const user = await db.user.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error:error });
        }
    },
    getUsers: async (req, res) => {
        try {
            const users = await db.user.findAll();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getUser: async (req, res) => {
        try {
        const user = await db.user.findByPk(req.params.id);
    
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        await user.update(req.body);
        res.json(user);
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        }
    },
    destroyUser: async (req, res) => {
        try {
        const user = await db.user.findByPk(req.params.id);
    
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        }
    }
}