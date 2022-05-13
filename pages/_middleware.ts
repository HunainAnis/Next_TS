import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

const signedInPages = ["/", "/playlist", "/library"]
export default function middleware(req:NextRequest) {
    if(signedInPages.find(p=>p===req.nextUrl.pathname)) {
        const token = req.cookies.TRAX_ACCESS_TOKEN;
        if(!token) {
            const url = req.nextUrl.clone()
            url.pathname = '/signin'
            return NextResponse.redirect(url)
        }
    }
}