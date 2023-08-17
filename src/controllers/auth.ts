import { Request, Response, request, response } from "express";
import { loginUserService, registerNewUserService } from "../service/auth";
import { handleHttP } from "../utils/error.handler";


const registerUser = async ({body} : Request, res:Response) =>{
    try {
        const newUser = await  registerNewUserService(body)
        res.send(newUser)
    } catch (error) {
        handleHttP(res,`${error}`)
        
    }
}   

const loginUser = async ({body}:Request, res:Response) =>{
    try {
        const user = await  loginUserService(body)
        res.send(user)
    } catch (error) {
        handleHttP(res,`${error}`)
    }
}


export {registerUser, loginUser}