import UserModel from "../models/user";
import { User } from "../interfaces/user.interface";
import { Auth } from "../interfaces/auth.interface";
import { verify, encrypt } from "../utils/bcrypt.handler";
import {
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
} from "../utils/jwt.handler";
import { updateUserService } from "./user";

const registerNewUserService = async ({
  email,
  password,
  firstName,
  lastName,
  mobile,
}: User) => {
  const userInDB = await UserModel.findOne({ email });

  if (userInDB) throw new Error("User already exists");

  const hashedPassword = await encrypt(password);

  const newUser = await UserModel.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    mobile,
  });
  return newUser;
};

const loginUserService = async ({ email, password }: Auth) => {
  const userInDB = await UserModel.findOne({ email });

  if (!userInDB) throw new Error("Wrong user or password");

  const hashedPassword = userInDB.password;

  const matchedPassword = await verify(password, hashedPassword);

  if (!matchedPassword) throw new Error("Wrong user or password");

  const token = generateToken(`${userInDB._id}`);
  const refreshToken = await generateRefreshToken(`${userInDB._id}`);
  const updatedUser = await updateUserService(`${userInDB._id}`, {
    refreshToken: `${refreshToken}`,
  });

  const data = {
    token,
    user:updatedUser,
  };

  return data;
};

const blockUserService = async (id: string) => {
  const userToBlock = await UserModel.findOneAndUpdate(
    { _id: id },
    { isBlocked: true },
    { new: true }
  );

  if (!userToBlock) {
    throw new Error("user not found");
  }

  return userToBlock;
};

const unblockUserService = async (id: string) => {
  const userToUnblock = await UserModel.findOneAndUpdate(
    { _id: id },
    { isBlocked: false },
    { new: true }
  );

  if (!userToUnblock) {
    throw new Error("user not found");
  }

  return userToUnblock;
};

const findUserByRefreshTokenService = async (refreshToken: string) => {

  const userInDB = await UserModel.findOne({refreshToken:refreshToken});
  if (!userInDB)
    throw new Error("No refresh token present in db or aaaa matched");
  return userInDB;
};



export {
  registerNewUserService,
  loginUserService,
  blockUserService,
  unblockUserService,
  findUserByRefreshTokenService,
};
