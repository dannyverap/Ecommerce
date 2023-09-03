import mongoose, { model, Model, Schema, Types } from "mongoose";
import { Product } from "../interfaces/product.interface";

const ProductSchema = new Schema<Product>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      // mongoose.Schema.Types.ObjectId,
      type: String,
      ref: "Category",
    },
    brand: {
      type: String,
      required: true,
      // enum: ["Apple", "Samsung", "Lenovo"],
    },
    quantity: {
      type: Number,
      required: true,
      // select: false,
    },
    sold: {
      type: Number,
      default: 0,
      // select:false,
    },
    images: {
      type: [String],
    },
    color: {
      type: String,
      required: true,
      // enum: ["Black", "Brown", "Red"],
    },
    ratings: [
      {
        star: Number,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductModel = model("products", ProductSchema);
export default ProductModel;
