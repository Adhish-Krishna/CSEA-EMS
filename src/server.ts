import express, {Express, Request, Response} from "express";
import dotenv from 'dotenv';
import cors from 'cors';

//importing routers
import userAuthRouter from "./api/auth/userAuth/auth.js";

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

//using the router as middlewares
app.use('/auth/user', userAuthRouter);

app.listen(PORT, ()=>{
    console.log(`Server running on the port: ${PORT}`);
})