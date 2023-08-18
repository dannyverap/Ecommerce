import UserModel from "../models/user";
import { User } from "../interfaces/user.interface";
import { Auth } from "../interfaces/auth.interface";
import { verify, encrypt } from "../utils/bcrypt.handler";
import { generateToken } from "../utils/jwt.handler";

const registerNewUserService = async ({
  email,
  password,
  firstName,
  lastName,
  mobile,
}: User) => {
  const userInDB = await UserModel.findOne({ email });

  if (userInDB) throw "User already exists";

  const hashedPassword = await encrypt(password)

  const newUser = await UserModel.create({
    email,
    password:hashedPassword,
    firstName,
    lastName,
    mobile,
  });
  return newUser;
};

const loginUserService = async ({ email, password }: Auth) => {
  const userInDB = await UserModel.findOne({ email });

  if (!userInDB) throw "Wrong user or password";

  const hashedPassword = userInDB.password;
   
  const matchedPassword = await verify(password, hashedPassword);
  
  if (!matchedPassword) throw "Wrong user or password";

  const token = generateToken(`${userInDB._id}`)
  
  const data = {
    token,
    userInDB,
  };

  return data
};

export { registerNewUserService , loginUserService};
