import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from '../config/db.js';

// import { PORT } from '../config/server-config.js';

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

connectDB();
const PORT=3000;

function setup_and_start_server(){
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}

setup_and_start_server();