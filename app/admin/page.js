import React from 'react'
import { auth } from '../auth'
import { redirect } from "next/navigation";
export const metadata  = {
    title:"Admin"
}
const  page = async() => {

  const session = await auth()
  console.log(session)

  if(!session?.user) redirect("/login")


  return (
    <div>Welcome Admin</div>
  )
}

export default page