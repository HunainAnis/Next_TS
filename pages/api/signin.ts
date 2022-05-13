import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma'
export default async (req:NextApiRequest, res:NextApiResponse) => {
    const salt = bcrypt.genSaltSync();
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({
            email:user.email,
            id: user.id,
            time: Date.now()
        }, "hello", { expiresIn: "8h"})
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("TRAX_ACCESS_TOKEN", token, {
                httpOnly: true,
                maxAge: 8 * 60 * 60,
                path:"/",
                sameSite:"lax",
                secure: process.env.NODE_ENV==='production'
            })
        )
    
        res.json(user)
    }else {
        res.status(401);
        res.json({
            error: "Email or password is incorrect"
        })
    }
    
}