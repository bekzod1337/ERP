import { Router } from "express";
// import { authGuard } from "../common/guard/auth.guard.js";
import { getAllUser, addUser, getUser, deleteUser } from "../core/users/users.service.js";

const userRouter = Router();

userRouter.get("/", getAllUser);
userRouter.post("/",addUser);
userRouter.get("/:id",getUser);
// userRouter.put("/:id",updateUser);
userRouter.delete("/:id",deleteUser);

export default userRouter;