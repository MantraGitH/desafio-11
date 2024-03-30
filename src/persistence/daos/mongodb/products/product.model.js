import { Schema, model } from "mongoose";

export const productsCollection = "products";

export const productSchema = new Schema({
  product_name: { type: String, required: true },
  product_description: { type: String, required: true },
  product_price: { type: Number, required: true },
  product_stock: { type: Number, required: true },
});

export const ProductModel = model(productsCollection, productSchema);
