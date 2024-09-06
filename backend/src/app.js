import express from "express";
import { initDatabase } from "./common/database/database.service.js";
import userRouter from "./controller/users.controller.js";
import getConfig from "./common/config/config.service.js";
import cors from 'cors'
const app = express();
const PORT = getConfig("EXPRESS_PORT") || 3000;

app.use(express.json());
app.use(cors())
function initRoutes() {
    app.use("/user", userRouter);
    // app.use("/course", courseRouter);
    // app.use("/payment", paymentRouter);
    // app.use("/room", roomRouter);   
}
initRoutes();
initDatabase();
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})