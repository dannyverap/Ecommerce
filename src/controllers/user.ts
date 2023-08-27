import { Request, Response, request } from "express";
import {
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "../service/user";
import { handleHttP } from "../utils/error.handler";
import { RequestExt } from "../interfaces/request.interface";
import { validateMongoId } from "../utils/validateMongoId";

const getAllUsers = async (req: RequestExt, res: Response) => {
  try {
    const allUsers = await getAllUsersService();
    res.send(allUsers );
  } catch (error) {
    handleHttP(res, `${error}`);
  }
};

const getUserById = async ({ params }: RequestExt, res: Response) => {
  try {
    const { id } = params;
    validateMongoId(id)
    const user = await getUserByIdService(id);
    res.send(user);
  } catch (error) {
    handleHttP(res, `${error}`);
  }
};

const updateUser = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const updatedUser = await updateUserService(id, body);
    res.send(updatedUser);
  } catch (error) {
    handleHttP(res, `${error}`);
  }
};

const deleteUser = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const deletedUser = await deleteUserService(id);
    res.send(deletedUser);
  } catch (error) {
    handleHttP(res, `${error}`);
  }
};


export { getAllUsers, getUserById, updateUser, deleteUser};
