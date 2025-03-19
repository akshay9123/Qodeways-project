import '@/lib/db';
import UserSchema from '@/schema/user.schema';
import { NextResponse as res } from 'next/server';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

// FUNCTION TO GENERATE THE ACCESS TOKEN
const getToken = (payload) => {
    return jwt.sign(payload, process.env.ACESS_TOKEN_SECRET, { expiresIn: '15m' });
};

export const POST = async (request) => {
    try {


        // EXTRACT THE CREDENTIALS GIVEN BY THE USER
        const { firstName, lastName, email, phone, password, otherDetails } = await request.json();


        // CHECK IF ANY SECTION IS NOT EMPTY
        if (!firstName || !lastName || !email || !phone || !password) {
            return res.json({ success: false, message: 'Kindly insert all the input fields' });
        }


        // IF EACH DETAILS ARE GIVEN BY USER THEN SAVE MAKE SCHEMA FOR THE DATABASE
        const user = await UserSchema.create({
            firstName,
            lastName,
            email,
            phone,
            password,
            otherDetails,
        });


        // GENERATE THE JWT TOKEN
        const accessToken = getToken({ id: user._id, firstName: user.firstName });


        // SET THE TOKEN INTO THE COOKIE
        const cookie = serialize('token', accessToken, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            path: '/',
            maxAge: 15 * 60, 
        });

        // RETURN THE SUCCESS MESSAGE
        const response = res.json({ success: true });
        response.headers.set('Set-Cookie', cookie);

        return response;

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
