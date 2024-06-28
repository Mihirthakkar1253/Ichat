import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './Routes/auth.routes.js'
import connectToMongo from './db/connectToMongoDb.js';
const app=express();
dotenv.config();
const port=process.env.PORT;
app.use(cors());

app.use('/api/auth',authRoutes);

app.listen(port,()=>{
    connectToMongo();
    console.log(`server is listening in ${port}`);
})

app.get('/',(req,res)=>{
    res.send("welcome to server");
})

