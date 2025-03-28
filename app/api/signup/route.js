import '@/lib/db';
import UserSchema from '@/schema/user.schema';
import { redirect } from 'next/navigation';
import { NextResponse as res } from 'next/server';



// SIGNUP API 
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


        
        // IF EVERYTHING IS FINE THEN RETURN SUCCESS
        return res.json({ success: true, message: 'User registered successfully', user }, { status: 201 });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
