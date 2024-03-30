import MongoDao from "../mongo.dao.js";
import { UserModel } from "./user.model.js";
import { createHash, isValidPassword } from "../../../../utils/utils.js";
import jwt from "jsonwebtoken";
import config from "../../../../config/config.js";
//import { tr } from "@faker-js/faker";

const SECRET_KEY_JWT = config.SECRET_KEY_JWT;

export default class UserMongoDao extends MongoDao {
  constructor() {
    super(UserModel);
  }

  generateToken(user) {
    const payload = {
      userId: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY_JWT, {
      expiresIn: "20m",
    });
    return token;
  }

  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await this.model.findOne({ email });
      if (!existUser) {
        const newUser = await this.model.create({
          ...user,
          password: createHash(password),
        });
        //const token = this.generateToken(newUser)
        return newUser;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.getByEmail(email);
      if (userExist) {
        const passValid = isValidPassword(userExist, password);
        if (!passValid) return false;
        else {
          const token = this.generateToken(userExist);
          return token;
        }
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  async getByEmail(email) {
    try {
      const user = await this.model.findOne({ email });
      if (!user) {
        console.log("Usuario no encontrado para el email:", email);
        return null;
      }
      console.log("Usuario encontrado:", user.email);
      return user;
    } catch (error) {
      console.log("Error en getByEmail:", error);
      throw error;
    }
  }

  async resetPassword(user) {
    try {
      const { email } = user;
      const userExist = await this.getByEmail(email);
      if (userExist) return this.generateToken(userExist, "1h");
      else return false;
    } catch (error) {
      throw new Error(error.menssage);
    }
  }

  async updatePassword(user, password) {
    try {
      const isEqual = isValidPassword(user, password);
      if (isEqual) {
        return false;
      } else {
        const newPass = createHash(password);
        return await this.update(user_id, { password: newPass });
      }
    } catch (error) {
      throw new Error(error.menssage);
    }
  }
}
