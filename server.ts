import app from './src/app';
import dotenv from 'dotenv'
import connectDB from './src/config/connectDB';

dotenv.config();


const PORT: number = Number(process.env.PORT) || 3000

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is listining on PORT: ${PORT}`);
    })
}

startServer();