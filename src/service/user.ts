import UserModel from "../models/user";
import { User } from "../interfaces/user.interface";

const getAllUsersService = async () => {
  const allUsers = await UserModel.find();
  return allUsers;
};

const getUserByIdService = async (id: string) => {
  const user = await UserModel.findOne({ _id: id });
  if (!user) {
    throw  new Error ("user not found");
  }
  return user;
};

const updateUserService = async (id: string, data: Partial<User>) => {
  const userToUpdate = await UserModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  if (!userToUpdate) {
    throw  new Error ("user not found");
  }
  return userToUpdate;
};

const deleteUserService = async (id: string) => {
  const user = await UserModel.findOneAndDelete({ _id: id });
  if (!user) {
    throw  new Error ("user not found");
  }
  return `${user?.firstName} Deleted :C`;
};

export {
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
};
