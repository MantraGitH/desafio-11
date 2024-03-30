import persistence from "../../persistence.js";
const { productDao } = persistence;
import ProductReqDTO from "../../dto/product/product.req.dto.js";
import ProductResDTO from "../../dto/product/product.res.dto.js";

export default class ProductRepository {
  constructor() {
    this.dao = productDao;
  }

  async createProduct(product) {
    try {
      const productDTO = new ProductReqDTO(product);
      return await this.dao.create(productDTO);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductById(id) {
    try {
      const response = await this.dao.getById(id);
      if (!response) {
        return false;
      } else {
        const resDTO = new ProductResDTO(response);
        return resDTO;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
