import express from "express";
import getConfig from "./common/config/config.service.js";
import { initDatabase } from "./common/database/database.service.js";
import userRouter from "./controller/users.controller.js";
import expressErrorHandling from "./common/middleware/express.errorHandling.js";
import notFoundRoutes from "./common/middleware/notFoundRoutes.js";
import { accessLogger, errorLogger } from "./common/service/logger.service.js";
import cors from 'cors';
import cookieparser from 'cookie-parser';
// import courseRouter from "./controller/courses.controller.js";
import roomRouter from "./controller/rooms.controller.js";
const app = express();

app.use(cors());
app.use(cookieparser());
const PORT = getConfig("EXPRESS_PORT") || 3000;

process.on("uncaughtException", (err) => {
  errorLogger.error({ type: "uncaughtException", message: err.message });
});
process.on("unhandledRejection", (err) => {
  errorLogger.error({ type: "unhandledRejection", message: err.message });
});

function initRoutes() {
  app.use("/user", userRouter);
  app.use("/room", roomRouter);
  // app.use("/course", courseRouter);
}
async function init() {
  app.use(express.json());

  app.use((req, res, next) => {
    const { url, method } = req;
    accessLogger.info({ url, method });
    next();
  });

  initRoutes();

  app.use(notFoundRoutes);
  app.use(expressErrorHandling);

  await initDatabase();

  app.listen(PORT, () => console.log(`Server ${PORT} ishladi`));
}

init();
