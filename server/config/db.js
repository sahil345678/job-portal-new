import mongoose from "mongoose";

// function to connet to kongodb 
const connectDB = async() =>{
  mongoose.connection.on("connected",()=> console.log("Database Connected"))

  await mongoose.connect(process.env.MONGODB_URI)
}

export default connectDB