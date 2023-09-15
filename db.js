import mongoose from "mongoose";

const connectDB = async () => {
    try{
  const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  console.log(`MONGODB connected: ${conn.connection.host}`);
  }catch(error){
     console.log(error);
     process.exit(1);
  }
}

console.log("connection established");

export default connectDB;