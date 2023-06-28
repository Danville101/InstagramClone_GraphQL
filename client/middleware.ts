import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest){
     const access = req.cookies.get("acceesToken")
     if(!access){
         // const url = req.nextUrl.clone()
          //url.pathname = "/login"
          //return NextResponse.rewrite(url)
         // return NextResponse.redirect(, 307)

       //  console.log("check here",req.cookies.acceesToken)
       if(!req.url.includes("register")){
            return NextResponse.rewrite(new URL('/login', req.url))
       }
     
     }

     if( access && req.url.includes("login")|| access && req.url.includes("register")){
      return NextResponse.rewrite(new URL("/", req.url))
     }

     return NextResponse.next();
}



export const config ={
  matcher:  '/((?!api|_next/static|_next/image|favicon.ico).*)'
}