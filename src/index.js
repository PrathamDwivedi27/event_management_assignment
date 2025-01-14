import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from '../config/db.js';
import apiRoutes from "../routes/index.js";

// import { PORT } from '../config/server-config.js';

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api",apiRoutes);

app.get('/', (req, res) => {
    res.send('Backend is running successfully!');
});
  

connectDB();
const PORT=3000;

function setup_and_start_server(){
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}

setup_and_start_server();