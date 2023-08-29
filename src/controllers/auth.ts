import { Request, Response, request, response } from "express";
import {
  blockUserService,
  findUserByRefreshTokenService,
  loginUserService,
  registerNewUserService,
  unblockUserService,
} from "../service/auth";
import { handleHttP } from "../utils/error.handler";
import { RequestExt } from "../interfaces/request.interface";
import { getUserByIdService } from "../service/user";
import { verifyRefreshToken } from "../utils/jwt.handler";

const registerUser = async ({ body }: Request, res: Response) => {
  try {
    const newUser = await registerNewUserService(body);
    res.send(newUser);
  } catch (error) {
    handleHttP(res, `${error}`);
  }
};

const loginUser = async ({ body }: Request, res: Response) => {
  try {
    const { token, user } = await loginUserService(body);
    res.cookie("refreshToken", user.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 3 * 60 * 60 * 1000,
    });
    res.json({ token,user });
  } catch (error) {
    handleHttP(res, `${error}`);
  }
};

const getProfile = async (req: RequestExt, res: Response) => {
  try {
    const userId = req.payload;
    const user = await getUserByIdService(`${userId}`);
    res.send(user);
  } catch (error) {
    handleHttP(res, `${error}`);
  }
};

const blockUser = async ({ params }: RequestExt, res: Response) => {
  try {
    const { id } = params;
    const user = await blockUserService(id);
    res.send(user);
  } catch (error) {
    handleHttP(res, `${error}`);
  }
};

const unblockUser = async ({ params }: RequestExt, res: Response) => {
  try {
    const { id } = params;
    const user = await unblockUserService(id);
    res.send(user);
  } catch (error) {
    handleHttP(res, `${error}`);
  }
};

const refreshToken = async (req: RequestExt, res: Response) => {
  try {
    const { refreshToken } = req.cookies;
    
    if (!refreshToken) throw new Error("No refresh token in cookie");
    const user = await findUserByRefreshTokenService(refreshToken);
    
    const accessToken = await verifyRefreshToken(refreshToken,`${user._id}`)

    res.json({"token":accessToken})
  } catch (error) {
    handleHttP(res, `${error}`);
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  blockUser,
  unblockUser,
  refreshToken,
};
