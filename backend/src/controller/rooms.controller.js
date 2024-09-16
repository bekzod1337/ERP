import { Router } from 'express';
import { addRoom, getAllRoom } from '../core/rooms/rooms.service.js';

const roomRouter = Router();
 
roomRouter.get("/", getAllRoom);              // barcha honani olish
roomRouter.post("/", addRoom);               // hona qo'shish
// roomRouter.get("/:id", getSearch);            // foydalanuvchini qidirish
// roomRouter.put("/:id", updateUser);
// roomRouter.delete("/:id", deleteRoom);        // foydalanuvchini o'chirish

export default roomRouter;
