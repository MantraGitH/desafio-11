import Controllers from "./class.controller.js";
import UserService from "../services/user.services.js";
import { HttpResponse, errorsDictionary } from "../utils/http.response.js";
const httpResponse = new HttpResponse();
const userService = new UserService();

export default class UserController extends Controllers {
  constructor() {
    super(userService);
  }

  register = async (req, res, next) => {
    try {
      const newUser = await userService.register(req.body);
      if (!newUser) {
        return httpResponse.Forbidden(res, errorsDictionary.ERROR_CREATE_USER);
      } else {
        return httpResponse.Ok(res, newUser);
      }
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const token = await userService.login(req.body);
      if (!token) {
        return httpResponse.Unauthorized(res, errorsDictionary.ERROR_LOGIN);
      } else {
        res.cookie("token", token, { httpOnly: true });
        return httpResponse.Ok(res, token);
      }
    } catch (error) {
      next(error);
    }
  };

  profile = async (req, res, next) => {
    try {
      const { first_name, last_name, email, role } = req.user;
      return httpResponse.Ok(res, {
        first_name,
        last_name,
        email,
        role,
      });
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const user = req.user;
      const tokenResetPass = await userService.resetPassword(user);
      if (tokenResetPass) {
        res.cookie("tokenpass", tokenResetPass);
        return httpResponse.Ok(res, {
          msg: "Email reset password ok",
        });
      } else return httpResponse.NotFound(res, "email not send");
    } catch (error) {
      next(error);
    }
  };

  async updatePassword(req, res, next) {
    try {
      const user = req.user;
      const { pass } = req.body;
      const { tokenpass } = req.cookies;
      console.log("token en controller: ", tokenpass);
      if (!tokenpass)
        return httpResponse.Forbidden(res, errorsDictionary.ERROR_TOKEN);
      const updPass = await userService.updatePassword(user, pass);
      if (!updPass)
        return httpResponse.NotFound(res, errorsDictionary.ERROR_PASSWORD);
      res.clearCookie("tokenpass");
      return httpResponse.Ok(res, updPass);
    } catch (error) {
      next(error.message);
    }
  }
}
