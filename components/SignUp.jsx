'use client'
import React, { useState } from "react";
import jwt from "jwt-simple"

const SignUp = () => {

  const [fname,setFname]= useState("")
  const [lname,setLname] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [phone,setPhone]= useState("")
  const [file,setfile] = useState(null)
  const [otherDetails, setOtherDetails] = useState("")
  const [submitted, setSubmited] = useState(false)
  const [token, setToken] = useState("")



  const secretKey = "qodeways"
  const handleSubmit = () => {
    if (!email) {
      alert("Please enter an email!");
      return;
    }

    // Generate JWT token
    
    const newToken = jwt.encode({ email, fname, lname, phone, otherDetails }, secretKey);
    setToken(newToken);
    setSubmited(true);
  };
 
  

  return (
    <div className="p-5 bg-gray-200 flex flex-col gap-6 max-w-lg mx-auto">

      {/* Heading */}
      <div className="text-center font-bold">
        <h1 className="text-2xl" >Get A Quote</h1>
        <h2 className="text-lg" >Get a Quote Immediately Upon Form Submission</h2>
      </div>

      {submitted ? (
        <>

        <div>First Name : {fname}</div>
        <div>Last Name : {lname}</div>
        <div>Email : {email}</div>
        <div>Phone : {phone}</div>
        <div>Password : {password}</div>
        <div>Other Details : {otherDetails}</div>
        <div>Token : {token}</div>
        

        </>
      ): (
        <>


      {/* Name Section */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" placeholder="First Name" required className="w-full sm:w-1/2 border-2 border-black p-2 rounded-lg" onChange={(e)=>setFname(e.target.value)} />

        <input type="text" placeholder="Last Name" required className="w-full sm:w-1/2 border-2 border-black p-2 rounded-lg" onChange={(e)=>setLname(e.target.value)}/>
      </div>

      {/* Email */}
      <input type="email" placeholder="Email Address" required className="w-full border-2 border-black p-2 rounded-lg" onChange={(e)=>setEmail(e.target.value)}/>

      {/* Phone */}
      <input type="tel" placeholder="Phone" required className="w-full border-2 border-black p-2 rounded-lg" 
        onChange={(e)=>setPhone(e.target.value)}
      />

      {/* Password */}
      <input type="password" placeholder="Password" required className="w-full border-2 border-black p-2 rounded-lg" 
        onChange={(e)=>setPassword(e.target.value)}
      />

      {/* Other Details */}
      <textarea placeholder="Other Details" className="w-full h-24 border-2 border-black p-2 rounded-lg" 
      onChange={(e)=>setOtherDetails(e.target.value)}></textarea>

      {/* File Upload */}
      <div className="w-full h-24 border-2 border-black p-2 rounded-lg flex flex-col items-center justify-center text-center">
        <input type="file" className="w-auto text-center" onChange={(e)=>setfile(event.target.files[0])}/>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button className="border-2 border-blue-500 bg-blue-500 text-white py-3 px-6 rounded-lg cursor-pointer hover:bg-blue-600" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      </>
      )}

    </div>
  );
};

export default SignUp;
