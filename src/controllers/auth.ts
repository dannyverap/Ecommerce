import { Request, Response, request, response } from "express";
import {
  blockUserService,
  loginUserService,
  registerNewUserService,
  unblockUserService
} from "../service/auth";
import { handleHttP } from "../utils/error.handler";
import { RequestExt } from "../interfaces/request.interface";
import { getUserByIdService } from "../service/user";

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
    const user = await loginUserService(body);
    res.send(user);
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

export { registerUser, loginUser, getProfile, blockUser, unblockUser };
