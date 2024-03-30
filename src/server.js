import express from "express";
import morgan from "morgan";
import MainRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./utils/logger.js";
import { __dirname, mongoStoreOptions } from "./utils/utils.js";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import viewsRouter from "./routes/views.router.js";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import { info } from "./docs/info.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const mainRouter = new MainRouter();
const app = express();

const spects = swaggerJSDoc(info);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(spects));

app.use(session(mongoStoreOptions));

app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(cookieParser(config.SECRET_COOKIES));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/loggerTest", (req, res) => {
  logger.error("error en el endpoint de prueba");
  res.send("probando logger");
});
app.use("/api", mainRouter.getRouter());
app.use("/views", viewsRouter);
app.use(errorHandler);

const PORT = config.PORT;

app.listen(PORT, () => logger.info(`Server ok en puerto: ${PORT}`));
