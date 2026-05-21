import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://srinivasanezhumalai2636_db_user:SjJSJuRzQdaIf8VG@cluster0.jgo1zkq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.warn("Server will continue running, but DB-dependent routes will fail.");
  }
};

export default connectDB;
