import "dotenv/config";
import { sign, verify } from "jsonwebtoken";
import { payload } from "../interfaces/payload.interface";

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "";

const generateToken = (id: string) => {
  const jwt = sign({ id }, JWT_SECRET, { expiresIn: "20s" });
  return jwt;
};

const generateRefreshToken = (id: string) => {
  const jwt = sign({ id }, JWT_REFRESH_SECRET, { expiresIn: "3d" }) as String;
  return jwt;
};
const verifyToken = (jwt: string) => {
  const validToken = verify(jwt, JWT_SECRET) as payload;
  return validToken;
};

const verifyRefreshToken = (refreshToken: string, id: string) => {
  const tokenDecoded = verify(refreshToken, JWT_REFRESH_SECRET) as payload;
  if (tokenDecoded.id !== id)
    throw new Error("There is something wrong with the refresh token");

  const accessToken = generateToken(id);
  return accessToken;
};

export { generateToken, generateRefreshToken, verifyToken, verifyRefreshToken };
