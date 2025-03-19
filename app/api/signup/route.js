import '@/lib/db'
import UserSchema from '@/schema/user.schema';
import { NextResponse as res } from "next/server";
import jwt from 'jsonwebtoken'

const getToken = (payload) =>{
    const acessToken = jwt.sign(payload, process.env.ACESS_TOKEN_SECRET, {expiresIn:'15m'})
    return acessToken 
}
export const POST = async(request) =>{
    try {

        // EXTRACTING THE DETAILS THAT ARE INSERTED BY THE USER
        const {firstName,lastName,email,phone,password,otherDetails} = await request.json()


        // IF ANY VALUES ARE EMPTY THEN REFLECT THE ERROR
        if(!firstName || !lastName || !email || !phone || !password){
            return res.json({success:false, Message:"Kindly Insert ALl the input fileds"})
        }


        // Create and save the user
        const user = await UserSchema.create({
            firstName,
            lastName,
            email,
            phone,
            password,
            otherDetails,
        });


        // GENERATING THE TOKEN INSIDE THE USER DETAILS
        const x = getToken({firstName:user.firstName})
        console.log(x)


        // RETURN THE SUCCESS MESSAGE
        return res.json({ success: true });

        
    } catch (error) {
        return res.json(
            {success:false, message:error.message}
        )
    }
}