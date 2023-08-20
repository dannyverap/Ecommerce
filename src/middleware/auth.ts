import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handler";
import { RequestExt } from "../interfaces/request.interface";

const authMiddleware = (req: RequestExt, res: Response, next: NextFunction) => {
  try {

    const a = req.headers.hasOwnProperty("authorization")
    console.log(a);
    
    if (!a) {
        throw new Error("Missing Authorization Header");
      }


    const jwtByUser = req.headers.authorization || "";


    const tokenParts = jwtByUser.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      throw new Error("Invalid Token");
    }

    const jwt = tokenParts[1]; // Obtener el token JWT real
    const jwtVerificado = verifyToken(jwt);

    if (!jwtVerificado) {
      throw new Error("not Authorized");
    } else {
      req.payload = jwtVerificado;
      next();
    }
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

export { authMiddleware };
