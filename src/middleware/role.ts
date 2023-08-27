import { NextFunction, Request, Response } from "express";
import { RequestExt } from "../interfaces/request.interface";
import { handleHttP } from "../utils/error.handler";
import { getUserByIdService } from "../service/user";

const roleMiddleware = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        const userId = req.payload
        
        const userRole = await (await getUserByIdService(`${userId}`)).role
        
        if (userRole !== "admin") {
            throw new Error ("Your are not an admin")
        }
        console.log( userRole);
        
        next()
        
    } catch (error) {
        handleHttP(res, `${error}`);
      }
}

export { roleMiddleware}