import "dotenv/config";
import {sign, verify} from "jsonwebtoken"
import { payload } from "../interfaces/payload.interface";

const JWT_SECRET = process.env.JWT_SECRET  || ""

const generateToken = (id:string) => {
    const jwt = sign({id}, JWT_SECRET,{expiresIn:"2h"})
    return jwt
}

const verifyToken = (jwt:string) => {
    const validToken = verify(jwt,JWT_SECRET) as payload
    return validToken
}

export {generateToken, verifyToken}