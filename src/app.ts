import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';



const app: Application = express();


app.use(cors())
app.use(express.json());


import userRoutes from './routes/user.routes'
app.use('/api/users', userRoutes)

app.use('/', (req: Request, res: Response, next: NextFunction) => {
    return res.send('Server is up!')
})


export default app;