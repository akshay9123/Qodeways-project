import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcryptjs';




const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:1
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    otherDetails:{
        type:String,
    }
})

mongoose.models = {}
userSchema.pre("save", async function(next){
    const encrypted = await bcrypt.hash(this.password.toString(),12)
    this.password = encrypted
    next()
})
const UserSchema = mongoose.model("User", userSchema)
export default UserSchema