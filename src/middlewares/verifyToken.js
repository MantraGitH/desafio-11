import jwt from "jsonwebtoken";
import UserMongoDao from "../persistence/daos/mongodb/users/user.dao.js";
import config from "../config/config.js";

const userDao = new UserMongoDao();
const SECRET_KEY = config.SECRET_KEY_JWT;

export const verifyToken = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) return res.status(401).json({ msg: "User Unauthorized" });
  try {
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, SECRET_KEY);
    console.log("Token decodificado");
    console.log(decode);
    const user = await userDao.getById(decode.userId);
    if (!user) return res.status(400).json({ msg: "User Unauthorized" });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "User Unauthorized" });
  }
};
