import express, {Express, Request, Response} from "express";
import dotenv from 'dotenv';

dotenv.config()

const PORT: string = process.env.PORT || '3000'

const app: Express = express();

app.get('/', (req: Request,res: Response)=>{
    res.send("Hello World");
})

app.listen(PORT, ()=>{
    console.log(`Server running on the port: ${PORT}`);
})