import { Router } from 'express';
import { addCourse, deleteCourse, getAllCourse } from '../core/courses/courses.service.js';

const courseRouter = Router();
 
courseRouter.get("/", getAllCourse);              // barchani olish
courseRouter.post("/", addCourse);               // odam qo'shish
// courseRouter.get("/:id", getSearch);            // foydalanuvchini qidirish
// courseRouter.put("/:id", updateUser);
courseRouter.delete("/:id", deleteCourse);        // foydalanuvchini o'chirish

export default courseRouter;
