import { pool } from "../../common/database/database.service.js";


// hona qo'shish
export async function addRoom(req,res,next){
    try{
        const {name} = req.body;
        const result = await pool.query(
            `
                INSERT INTO rooms (name)
                VALUES ($1)
                RETURNING id
            `,
            [name]
        );
        res.status(200).send("Hona muvaffaqiyatli yaratildi!");
    }catch(error){
        console.error("Hona yaratishda xato:", err.message);
        next(err);
    }
}


// barcha honalarni olish
export async function getAllRoom(req,res,next){
    try {
        const result = await pool.query(
            `
                SELECT  * FROM rooms

            `
        );
        res.status(200).send(result.rows);
    } catch (error) {
        next(error);
    }
}