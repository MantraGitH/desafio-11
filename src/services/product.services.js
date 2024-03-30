import Services from "./class.services.js";
import persistence from "../persistence/persistence.js";
const { productDao } = persistence;
import { generateProduct } from "../utils/utils.js";
import ProductRepository from "../persistence/repository/product/product.repository.js";
const productRepository = new ProductRepository();

export default class ProductService extends Services {
  constructor() {
    super(productDao);
  }

  async createMocksProducts(cant = 100) {
    try {
      const productsArray = [];
      for (let i = 0; i < cant; i++) {
        const product = generateProduct();
        productsArray.push(product);
      }
      const products = await productDao.create(productsArray);
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createProduct(product) {
    try {
      const newProduct = await productRepository.createProduct(product);
      if (!newProduct) {
        return false;
      } else {
        return newProduct;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductById(id) {
    try {
      const product = await productRepository.getProductById(id);
      if (!product) {
        return false;
      } else {
        return product;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
