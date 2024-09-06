import { Router } from "express";
// import { authGuard } from "../common/guard/auth.guard.js";
import { getAllUser, addUser, getUser, deleteUser, getAllStudents, getAllTeachers, getAllAdmins, getSearch } from "../core/users/users.service.js";

const userRouter = Router();

userRouter.get("/", getAllUser);              // barchani olish
userRouter.get("/students", getAllStudents);  // o'quvchilarni olish
userRouter.get("/teachers", getAllTeachers);  // o'qituvchilarni olish
userRouter.get("/admins", getAllAdmins);      // adminlarni olish
userRouter.post("/",addUser);                 // odam qo'shish
userRouter.get("/:id",getSearch);             // foydalanuvchini qidirish
// userRouter.put("/:id",updateUser);
userRouter.delete("/:id",deleteUser);         // foydalanuvchini o'chirish


export default userRouter;