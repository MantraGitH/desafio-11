import ProductMongoDao from "./daos/mongodb/products/product.dao.js";
import UserMongoDao from "./daos/mongodb/users/user.dao.js";
import ProductFSDao from "./daos/filesystem/products/product.dao.js";
import UserFSDao from "./daos/filesystem/users/user.dao.js";
import CartsMongoDao from "./daos/mongodb/carts/cart.dao.js";
import CartFsDao from "./daos/filesystem/carts/cart.dao.js";
import "dotenv/config";
import { initMongoDB } from "../config/connection.js";
import TicketMongoDao from "./daos/mongodb/tickets/ticket.dao.js";

let userDao;
let productDao;
let cartDao;
let ticketDao;
const persistence = process.argv[2]; 
switch (persistence) {
  case "FS":
    userDao = new UserFSDao("./src/persistence/daos/filesystem/users.json");
    productDao = new ProductFSDao(
      "./src/persistence/daos/filesystem/products.json"
    );
    cartDao = new CartFsDao("./src/persistence/daos/filesystem/carts.json");
    ticketDao = new TicketMongoDao(
      "./src/persistence/daos/filesystem/tickets.json"
    );
    console.log(persistence);
    break;
  case "MONGO":
    await initMongoDB();
    userDao = new UserMongoDao();
    productDao = new ProductMongoDao();
    cartDao = new CartsMongoDao();
    ticketDao = new TicketMongoDao();
    console.log(persistence);
    break;
  default:
    userDao = new UserFSDao("./src/persistence/daos/filesystem/users.json");
    productDao = new ProductFSDao(
      "./src/persistence/daos/filesystem/products.json"
    );
    cartDao = new CartFsDao("./src/persistence/daos/filesystem/carts.json");
    ticketDao = new TicketMongoDao(
      "./src/persistence/daos/filesystem/tickets.json"
    );
    break;
}

export default { userDao, productDao, cartDao, ticketDao };
