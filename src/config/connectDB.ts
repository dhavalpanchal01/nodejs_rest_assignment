import mongoose from 'mongoose';


const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
          console.log("MongoDB connected successfully!");
        });
    
        mongoose.connection.on("error", (error: any) => {
          console.log("error in connecting with database", error);
        });
    
        await mongoose.connect(process.env.MONGODB_URI!);
      } catch (error: any) {
        console.error("Failed to connect with MongoDB", error);
        process.exit(1);
      }
}

export default connectDB;