import express, {Express, Request, Response} from "express";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()

const PORT: string = process.env.PORT || '3000'

const app: Express = express();

app.use(cors())
app.use(express.json())

app.get('/', (req: Request,res: Response)=>{
    res.json({
        mesage:"Daddy-EMS server is running..."
    })
})

app.listen(PORT, ()=>{
    console.log(`Server running on the port: ${PORT}`);
})