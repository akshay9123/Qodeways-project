import mongoose from "mongoose";


const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.DB_CONNECT)
        console.log("Connection is success")
    } catch (error) {
        console.log("Connection is failed")
        process.exit(1)
    }
}

connectDB()

export default mongoose