import winston from "winston";
import "winston-mongodb";
import config from "../config/config.js";

const logConfiguration = {
  transports: [
    winston.add(
      new winston.transports.MongoDB({
        options: { useUnifiedTopology: true },
        db: config.MONGO_URL,
        collection: "logs",
        tryReconnect: true,
        level: "error",
      })
    ),
    new winston.transports.Console({ level: "silly" }),

    new winston.transports.File({
      filename: "./logs.log",
      level: "info",
    }),
  ],
};

export const logger = winston.createLogger(logConfiguration);
