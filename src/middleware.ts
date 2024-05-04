import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";




export async function middleware(req : NextRequest) {

    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
    const isLoggedIn = !!token;

    if (req.nextUrl.pathname === "/account" && !isLoggedIn) {
        return NextResponse.redirect("http://localhost:3000/signin")
    }
    
    if ((req.nextUrl.pathname === "/signin" || req.nextUrl.pathname === "/signup") && isLoggedIn) {
        return NextResponse.redirect("http://localhost:3000/")
    }

    if(req.nextUrl.pathname === "/verify" && isLoggedIn) {
        return NextResponse.redirect("http://localhost:3000/")
    }

}

// export const config = {
//     matcher: "/account",
// }