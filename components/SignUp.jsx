"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState(null);
  const [otherDetails, setOtherDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please enter an email and password");
      return;
    }

    const formData = { 
      firstName: fname, 
      lastName: lname, 
      email, 
      phone, 
      password, 
      otherDetails 
    };

    try {
      await signUp(formData);
      setSubmitted(true);
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || error.message);
      alert("Signup failed! " + (error.response?.data?.message || error.message));
    }
  };

  const signUp = async (values) => {
    try {
      await axios.post("/api/signup", values, { headers: { "Content-Type": "application/json" } });
      router.push("/signup");
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      alert("Signup failed! " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="p-5 bg-gray-200 flex flex-col gap-6 max-w-lg mx-auto">
      {/* Heading */}
      <div className="text-center font-bold">
        <h1 className="text-2xl">Get A Quote</h1>
        <h2 className="text-lg">Get a Quote Immediately Upon Form Submission</h2>
      </div>

      {submitted ? (
        <>
          <div>
            <h1>Data is submitted Successfully, You can Login Now</h1>
          </div>
        </>
      ) : (
        <>
          {/* Name Section */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="text" placeholder="First Name" required className="w-full sm:w-1/2 border-2 border-black p-2 rounded-lg" onChange={(e) => setFname(e.target.value)} />
            <input type="text" placeholder="Last Name" required className="w-full sm:w-1/2 border-2 border-black p-2 rounded-lg" onChange={(e) => setLname(e.target.value)} />
          </div>

          {/* Email */}
          <input type="email" placeholder="Email Address" required className="w-full border-2 border-black p-2 rounded-lg" onChange={(e) => setEmail(e.target.value)} />

          {/* Phone */}
          <input type="tel" placeholder="Phone" required className="w-full border-2 border-black p-2 rounded-lg" onChange={(e) => setPhone(e.target.value)} />

          {/* Password */}
          <input type="password" placeholder="Password" required className="w-full border-2 border-black p-2 rounded-lg" onChange={(e) => setPassword(e.target.value)} />

          {/* Other Details */}
          <textarea placeholder="Other Details" className="w-full h-24 border-2 border-black p-2 rounded-lg" onChange={(e) => setOtherDetails(e.target.value)}></textarea>

          {/* File Upload */}
          <div className="w-full h-24 border-2 border-black p-2 rounded-lg flex flex-col items-center justify-center text-center">
            <input type="file" className="w-auto text-center" onChange={(e) => setFile(e.target.files[0])} />
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
