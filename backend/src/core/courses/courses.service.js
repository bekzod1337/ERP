import { pool } from "../../common/database/database.service.js";


// kurs qo'shish
export async function addCourse(req,res,next){
    try {
        const newCourse = req.body;
        const result = await pool.query(
            `
                INSERT INTO courses (name, teacher_id, start_time, end_time, start_date,price, room_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `,[newCourse.name,newCourse.teacher_id,newCourse.start_time, newCourse.end_time, newCourse.start_date, newCourse.price , newCourse.room_id]
        );
        res.status(200).send("Kurs muvaffaqiyatli qo'shildi!");
    } catch (error) {
        next(error)
    }
}

// get all course
export async function getAllCourse(req, res, next) {
    try {
        const result = await pool.query(
            `
            SELECT 
                c.id,
                c.name AS course_name,
                u.first_name AS teacher_first_name,
                u.second_name AS teacher_second_name,
                c.start_date,
                c.start_time,
                c.end_time,
                c.price,
                r.name AS room_name
            FROM 
                courses c
            JOIN 
                users u ON c.teacher_id = u.id
            JOIN 
                rooms r ON c.room_id = r.id
            `
        );

        res.status(200).send(result.rows);
    } catch (error) {
        next(error);
    }
}


// kursni o'chirish
export async function deleteCourse(req,res,next){
    try {
        const { id } = req.params;
        const result = await pool.query(
          `
                DELETE FROM courses WHERE id=$1
            `,
            [id]
            );
            res.send("guruh o'chirildi");
    }catch(err){
        res.send("guruh o'chirishda hatolik bo'ldi", err+message);
        next(err);
    }
}