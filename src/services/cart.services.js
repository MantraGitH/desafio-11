import Services from "./class.services.js";
import persistence from "../persistence/persistence.js";

const { cartDao, productDao } = persistence;

export default class CartService extends Services {
  constructor() {
    super(cartDao);
  }

  async remove(id) {
    try {
      const cartDel = await cartDao.delete(id);
      if (!cartDel) {
        return false;
      } else {
        return cartDel;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProdToCart(cartId, prodId) {
    try {
      const existCart = await cartDao.getById(cartId);
      if (!existCart) {
        return false;
      }
      const existProd = await productDao.getById(prodId);
      if (!existProd) {
        return false;
      }
      const existProdInCart = existCart.products.find((p) => {
        return p.product._id.toString() === prodId.toString();
      });
      if (existProdInCart) {
        existProdInCart.quantity++;
        existCart.save();
        return existProdInCart;
      } else {
        return await cartDao.addProdToCart(existCart, prodId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async removeProdToCart(cartId, prodId) {
    try {
      const existCart = await cartDao.getById(cartId);
      console.log("Carrito existente:", existCart);

      if (!existCart) {
        throw new Error("Carrito no encontrado");
      }

      const existProd = await productDao.getById(prodId);
      console.log("existProd-->", existProd);

      if (!existProd) {
        throw new Error("Producto no encontrado");
      }

      const existProdInCart = existCart.products.find(
        (p) => p.product._id.toString() === prodId.toString()
      );

      if (existProdInCart && existProdInCart.quantity > 0) {
        existProdInCart.quantity--;
        await existCart.save();
        return existProdInCart;
      } else {
        return await cartDao.removeProdToCart(existCart, prodId);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error al remover el producto del carrito");
    }
  }

  async updateProdQuantityToCart(cartId, prodId, quantity) {
    try {
      const existCart = await getById(cartId);
      console.log("carrito existente:", existCart);
      if (!existCart) return false;

      const existProd = existCart.products.find(
        (p) => p.product._id.toString() === prodId.toString()
      );
      console.log("producto existente:", existProd);
      if (!existProd) return false;

      return await cartDao.updateProdQuantityToCart(
        existCart,
        existProd,
        quantity
      );
    } catch (error) {
      console.log(error);
    }
  }

  async clearCart(cartId) {
    try {
      const existCart = await cartDao.getById(cartId);
      console.log("carrito existente:", existCart);
      if (!existCart) {
        return false;
      } else {
        return await cartDao.clearCart(existCart);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error al limpiar el carrito");
    }
  }
}
