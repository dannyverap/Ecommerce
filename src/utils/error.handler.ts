import { Response } from "express";

const handleHttP = (res: Response, error: string, errorRaw?: any) => {
    res.status(400).send(error);
}

export { handleHttP }
