import Services from "./class.services.js";
import persistence from "../persistence/persistence.js";
const { userDao } = persistence;
import { sendMail } from "./mailing.user.services.js";

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  register = async (user) => {
    try {
      const response = await userDao.register(user);
      await sendMail(user, "register");
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  login = async (user) => {
    try {
      const userExist = await userDao.login(user);
      return userExist;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  resetPassword = async (user) => {
    try {
      const token = await this.dao.resetPassword(user);
      if (token) {
        return await sendMail(user, "resetPassword", token);
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updatePassword = async (user, password) => {
    try {
      const response = await userDao.updatePassword(user, password);
      if (!response) {
        return false;
      } else {
        return response;
      }
    } catch (error) {
      throw new Error(error.menssage);
    }
  };
}
