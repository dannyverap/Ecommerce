import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handler";
import { RequestExt } from "../interfaces/request.interface";
import { handleHttP } from "../utils/error.handler";
import { payload } from "../interfaces/payload.interface";

const authMiddleware = (req: RequestExt, res: Response, next: NextFunction) => {
  try {

    if (!req.headers.hasOwnProperty("authorization")) {
      throw new Error("Missing Authorization Header");
      }


    const jwtByUser = req.headers.authorization || "";


    const tokenParts = jwtByUser.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      throw new Error("Invalid Token");
    }

    const jwt = tokenParts[1]; // Obtener el token JWT real
    const jwtVerificado = verifyToken(jwt) as payload;

    if (!jwtVerificado) {
      throw new Error("not Authorized");
    } else {
     
      
      req.payload = jwtVerificado.id;
      next();
    }
  }  catch (error) {
    handleHttP(res, `${error}`);
  }
};

export { authMiddleware };
