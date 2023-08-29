import { ObjectId } from "mongoose";
import { Auth } from "./auth.interface";

export interface User extends Auth {
  firstName: String;
  lastName: String;
  mobile: String;
  role: String;
  isBlocked: boolean;
  refreshToken: String;
  cart: String[];
  address: ObjectId[];
  wishlist: ObjectId[];
}
