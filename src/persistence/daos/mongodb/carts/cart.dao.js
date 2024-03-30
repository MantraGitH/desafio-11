import MongoDao from "../mongo.dao.js";
import { CartModel } from "./cart.model.js";

export default class CartsMongoDao extends MongoDao {
  constructor() {
    super(CartModel);
  }

  async addProdToCart(existCart, prodId) {
    try {
      const newProd = {
        quantity: 1,
        product: prodId,
      };
      existCart.products.push(newProd);
      const response = await this.model.updateOne(
        { _id: existCart._id },
        existCart
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async removeProdToCart(existCart, productToRemove) {
    try {
      if (!existCart) {
        throw new Error("Carrito no encontrado");
      }
      if (!existCart.products || existCart.products.length === 0) {
        throw new Error("El carrito no tiene productos");
      }
      if (!productToRemove._id) {
        throw new Error("Producto sin id");
      }
      const productIndex = existCart.products.findIndex(
        (p) => p.product._id.toString() === productToRemove._id.toString()
      );
      if (productIndex === -1) {
        throw new Error("Producto no encontrado en el carrito");
      }
      existCart.products.splice(productIndex, 1);
      const updatedCart = await existCart.save();
      return updatedCart;
    } catch (error) {
      console.error(error);
      throw new Error("Error al remover el producto del carrito");
    }
  }

  async clearCart(cart) {
    try {
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      cart.products = [];
      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      console.error(error);
      throw new Error("Error al limpiar el carrito");
    }
  }
}
