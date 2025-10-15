const path = require('path');
const cors = require('cors');
const multer = require('multer');
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const http = require('http');
const trashMgt = require('./backend/controllers/trashMgt');
const authMiddleware = require('./backend/middleware/auth'); // Import the middleware
let upload = multer();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const WebSocket = require('ws');
global.websocketServer = new WebSocket.Server({ server });

global.websocketServer.on('connection', (webSocketClient) => {

});


// app.post('/api/client', upload.none(),  (req, res) => {
//     console.log('Received data:', req.body);
//     res.send('success');
// });
 

app.get('/api/clients', authMiddleware, trashMgt.getClient);
app.post('/api/clients', upload.fields([]), authMiddleware, trashMgt.createClient);
app.put('/api/clients/update/:id',upload.fields([]), authMiddleware, trashMgt.updateClient);
app.delete('/api/delete/clients/:id', authMiddleware, trashMgt.deleteClient);
app.post('/api/clients/search',upload.fields([]), authMiddleware, trashMgt.searchClient);
app.post('/api/clients/sendMessage',upload.fields([]), authMiddleware, trashMgt.sendMessage);

app.post('/api/clients/:id/levelChange',  upload.none(), trashMgt.levelChange)

app.get('/api/records', authMiddleware, trashMgt.getRecords);
app.get('/api/records/:id', authMiddleware, trashMgt.getOneClient);
app.post('/api/record/update/:id', authMiddleware, trashMgt.updateRecord);
app.post('/api/auth', upload.fields([]), trashMgt.login);

app.post('/api/user', upload.fields([]), trashMgt.createUser);
app.get('/api/users',authMiddleware, trashMgt.getUsers);
app.get('/api/user/:id',authMiddleware, trashMgt.getUser);
app.delete('/api/user/:id',authMiddleware, trashMgt.destroyUser);



// ui uri ********************************************
app.use('/', serveStatic(path.join(__dirname,'/dist')))
app.get(/.*/, function(req, res){
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

  

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Server running on http://localhost:' + port);
});