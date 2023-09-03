import mongoose, { ObjectId } from "mongoose";

export interface Product {
    select(fields: any): Product;
    title: String,
    slug: String,
    description: String,
    price: Number,
    category: ObjectId,
    brand: String,
    quantity: Number,
    sold: Number,
    images: String[],
    color: String,
    ratings: [
        {
            star:Number,
            postedby:{type:ObjectId,ref:"User"}
        }
    ]
}