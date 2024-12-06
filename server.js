
const express = require('express')
const http = require('http')
const app = express()

const cors = require('cors')
app.use(cors())


const { Server } = require('socket.io')
const server = http.createServer(app)



//now setup socket

const io = new Server(server, {
    cors:
    {
        origin: "http://localhost:5173",
        methods: ["POST", "GET"]
    }
})


//now handle the socket connection


io.on('connection', (socket) => {
    console.log("a user is connected", socket.id);


    // now listening to an event

    socket.on('message', (data) => {
        console.log("message revieved : ", data);


        //broadcassting message to all the clienets
        io.emit('message',data);

    })



 socket.on('disconnect',()=>
{
    console.log('a user disconnected',socket.id);
    
})


})


//now start the server 

server.listen(3000,()=>
{
    console.log("server is running in port 3000");
    
})

