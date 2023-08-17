import { model, Model, Schema, Types } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema(
  {
    name:{
      type: String,
      required: true,
    },
    description:{
      type: String,
      default: "Descripción"
    },
    email:{
      type:String,
      required: true,
      unique:true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model("users", UserSchema);
export default UserModel;
