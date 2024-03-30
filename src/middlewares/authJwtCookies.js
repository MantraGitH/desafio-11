import jwt from "jsonwebtoken";
import UserMongoDao from "../persistence/daos/mongodb/users/user.dao.js";
import config from "../config/config.js";

const userDao = new UserMongoDao();
const SECRET_KEY = config.SECRET_KEY_JWT;

export const checkAuthCookie = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    const decode = jwt.verify(token, SECRET_KEY);
    // console.log('decoded');
    console.log(decode);
    const user = await userDao.getById(decode.userId);
    if (!user) return res.status(400).json({ msg: "Unauthorized" });
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Unauthorized" });
  }
};
