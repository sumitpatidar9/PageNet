



import express from "express";
import env from 'dotenv';
import { Connect } from './Utils/Connection.js';
import { router } from './Routes/Routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

env.config();
app.use(express.json());

const cookiesecret = process.env.COOKIE_SECRET;
app.use(cookieParser(cookiesecret));

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));

const PORT = process.env.PORT;
const URL =  process.env.MONGO_URL;


Connect(URL);
app.use('/', router);


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});