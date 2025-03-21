import { NextResponse as res } from "next/server";
export const config = {
    matcher: '/admin/:path*'
}

export const middleware = ( request) =>{
    const cookies  = request.cookies.get("Access Token")
    console.log(cookies);

    
  }