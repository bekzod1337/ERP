import { Router } from "express";
import { addUser, loginUser} from "../core/user/user.service.js";
import { authGuard } from "../common/guard/auth.guard.js";

const userRouter = Router();

userRouter.get("/", getAllPayments);
userRouter.post("/login",authGuard,loginUser);

export default userRouter;