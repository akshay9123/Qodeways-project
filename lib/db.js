import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState) {
    console.log(" Already connected to the database.")
    return
  }

  try {
    await mongoose.connect(process.env.DB_CONNECT)

    console.log("Database connection is successful.");
  } catch (error) {
    console.error(" Database connection failed:", error.message);
    
  }
};

export default connectDB;