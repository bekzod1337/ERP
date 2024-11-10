import { Router } from 'express';
import { getAllUser, addUser, deleteUser, getAllStudents, getAllTeachers, getAllAdmins, getSearch, login } from '../core/users/users.service.js';
import { authenticateToken } from '../common/middleware/authenticateToken.js';
import { isAdmin } from '../common/middleware/isAdmin.js';

const userRouter = Router();

userRouter.post("/login", login);

userRouter.use(authenticateToken); // Apply authentication middleware to all routes below

userRouter.get("/", getAllUser);              // Get all users
userRouter.get("/students", getAllStudents);  // Get students
userRouter.get("/teachers", getAllTeachers);  // Get teachers
userRouter.get("/admins", getAllAdmins);      // Get admins
userRouter.post("/", addUser);       // Add user - admin only 
userRouter.get("/:id", getSearch);            // Search user
userRouter.delete("/:id", deleteUser); // Delete user - admin only

export default userRouter;
