import { Router } from "express";
import { addUser, loginUser} from "../core/user/user.service.js";

const userRouter = Router();

userRouter.get("/", getAllPayments);
userRouter.post("/login",loginUser);

export default userRouter;