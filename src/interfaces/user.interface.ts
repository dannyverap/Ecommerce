import { ObjectId } from "mongoose";
import { Auth } from "./auth.interface";

export interface User extends Auth {
  firstName: String;
  lastName: String;
  mobile: String;
  role: String;
  cart: any[];
  address: ObjectId[];
  wishlist: ObjectId[];
}
