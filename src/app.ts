import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors())


app.use('/', (req: Request, res: Response, next: NextFunction) => {
    console.log('server is up')
    return res.send('server is up');
})


export default app;