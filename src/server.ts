import express, {Express, Request, Response} from "express";

const PORT: number = 3000;

const app: Express = express();

app.get('/', (req: Request,res: Response)=>{
    res.send("Hello World");
})

app.listen(PORT, ()=>{
    console.log(`Server running on the port: ${PORT}`);
})