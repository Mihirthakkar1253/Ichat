import { configDotenv } from 'dotenv';
import express from 'express';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import {createServer} from 'http';
import cors from 'cors';
const app=express();
const server=new createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:['Get',"Post"],
        credentials:true,   

    }
});

app.use(cors());
io.on("connection",(socket)=>{
   console.log("User Connected");
   console.log("id",socket.id);
   socket.on('message',({room,message})=>{
    console.log(room);
    io.to(room).emit('receive-message',message);
   
   
   })
   socket.on('room-join', (roomName) => {
    socket.join(roomName)  
    socket.emit('joined-room', `Joined ${roomName}`);   
    })
   
   socket.on('disconnect',()=>{
    console.log(`user disconnected,${socket.id}`);
   })
   socket.emit("Welcome",'welcome to server');
     
})

dotenv.config();
app.get('/',(req,res)=>{
    res.send("Hello World!!");

})


server.listen(process.env.PORT,()=>{
    console.log(`server is listening on port ${process.env.PORT}`);
})