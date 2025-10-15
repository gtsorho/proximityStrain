const { Sequelize, DataTypes} = require('sequelize');
const client = require('./client')
const record = require('./record')
const user = require('./user')
require('dotenv').config();



const sequelize = new Sequelize(
    process.env.DATABASE, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false
    }
)

const db = {}
db.sequelize = sequelize
db.sequelize = Sequelize

db.client = client(sequelize, DataTypes)
db.record = record(sequelize, DataTypes)
db.user = user(sequelize, DataTypes)


db.client.hasMany(db.record)
db.record.belongsTo(db.client)

db.client.belongsTo(db.user)
db.user.hasMany(db.client)


// db.sensor = sensor(sequelize, DataTypes)

sequelize.sync({alter:false, force:false})
.then(()=>{
    console.log('all data in sync')
})

sequelize.authenticate().then(() =>{
    console.log('Connection has been established successfully.');
}). catch((error) => {
    console.error('Unable to connect to the database:', error);
})

module.exports = db

