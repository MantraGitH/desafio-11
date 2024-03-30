import MongoDao from "../mongo.dao.js";
import { TicketModel } from "./ticket.model.js";

export default class TicketMongoDao extends MongoDao {
  constructor() {
    super(TicketModel);
  }

  // async create(obj) {
  //    try {
  //      return await TicketModel.create(obj);
  //     } catch (error) {
  //       throw new Error(error);
  //     };
  //   };
}
