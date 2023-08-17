import { Response } from "express";

const handleHttP = (res:Response, error:string, errorRaw?: any) =>{
    res.status(400)
    res.send({error})
}

export {handleHttP}