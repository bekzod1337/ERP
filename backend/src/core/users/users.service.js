import { pool } from "../../common/database/database.service.js";
import jwt from 'jsonwebtoken';
import getConfig from "../../common/config/config.service.js";







// Barcha foydalanuvchilarni olish
export async function getAllUser(req, res) {
    try {
        const result = await pool.query(`SELECT * FROM users`);
        res.status(200).send(result.rows);
    } catch (err) {
      res.status(500).send("Foydalanuvchilarni olishda hatolik bo'ldi: " + err.message);
    }
  }




// Bitta foydalanuvchini olish
export async function getUser(req, res) {
    try {
        const id = req.params.id;
        const result = await pool.query(
            `
                SELECT * FROM users  WHERE id = $1
            `,[id]
        );
        if(result.rows.length) {
        res.status(200).send(result.rows[0]);
        }else{
            res.status(404).send("Foydalanuvchi topilmadi");
        }
    }catch(err){
        res.status(500).send("Foydalanuvchini olishda hatolik boldi:" + err.message);
    }
}




// Foydalanuvchi qo'shish
export async function addUser(req, res) {
    try {
        const newUser = req.body;
        const result = await pool.query(
            `
                INSERT INTO users (first_name, second_name, password, role)
                VALUES ($1, $2, $3, $4)
                RETURNING id
            `,
            [newUser.first_name, newUser.second_name, newUser.password, newUser.role]
        );

        const newUserId = result.rows[0].id;
        res.status(200).send(`Foydalanuvchi muvaffaqiyatli qo'shildi. Foydalanuvchi id raqami: ${newUserId}`);
    } catch (err) {
        console.error("Foydalanuvchi qo'shishda xatolik bo'ldi:", err.message);
        res.status(500).send("Foydalanuvchi qo'shishda xatolik bo'ldi:" + err.message);
    }
}


// foydalanuvchini yangilash

// pass


// foydalanuvchini o'chirish
export async function deleteUser(req,res) {
    try {
        const { id } = req.params;
        const result = await pool.query(
          `
                DELETE FROM users WHERE id=$1
            `,
            [id]
            );
            res.send("Foydalanuvchi o'chirildi");
    }catch(err){
        res.send("Foydalanuvchi o'chirishda hatolik bo'ldi", err+message);
    }
}



// o'quvchilarni olish
export async function getAllStudents(req, res) {
    try {
        const result = await pool.query(`
            SELECT * FROM users WHERE role = 'student';
            `);
        res.status(200).send(result.rows);
    } catch (err) {
      res.status(500).send("Foydalanuvchilarni olishda hatolik bo'ldi: " + err.message);
    }
}




// o'qituvchilarni olish
export async function getAllTeachers(req, res) {
    try {
        const result = await pool.query(`
            SELECT * FROM users WHERE role = 'teacher';
            `);
        res.status(200).send(result.rows);
    } catch (err) {
      res.status(500).send("Foydalanuvchilarni olishda hatolik bo'ldi: " + err.message);
    }
}



// adminlarni olish
export async function getAllAdmins(req, res) {
    try {
        const result = await pool.query(`
            SELECT * FROM users WHERE role = 'admin';
            `);
        res.status(200).send(result.rows);
    } catch (err) {
      res.status(500).send("Foydalanuvchilarni olishda hatolik bo'ldi: " + err.message);
    }
}



// qidiruv orqali olish
export async function getSearch(req, res) {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `
            SELECT * FROM users WHERE first_name LIKE '%${id}%' OR second_name LIKE '%${id}%';
            `
        );
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).send("Foydalanuvchini olishda hatolik bo'ldi: " + err.message);
    }
}

// token yaratish
function generateAccsessToken(data){
    return jwt.sign(data, getConfig("JWT_ACCESS_SECRET"), {expiresIn: "15m"});
}

// tokenni yangilash
function generateRefreshToken(data){
    return jwt.sign(data, getConfig("JWT_REFRESH_SECRET", {expiresIn: "8h"}));
}



// Login tekshirish
export async function login(req, res,next) {
    try {
        const { id, password } = req.body;
        const result = await pool.query(`
            SELECT * FROM users WHERE id = $1 AND password = $2;
        `, [id, password]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const { role } = user;
            const accsessToken = await generateAccsessToken({id: id});
            const refreshToken = await generateRefreshToken({id: id});
            res.status(200).json({
                success: true,
                role: role,
                accsessToken,
                refreshToken
            });
        } else {
            res.status(401).json({ message: 'Foydalanuvchi topilmadi' });
            return;
        }
    } catch (err) {
        console.error("Ma'lumot olishda xato:", err.message);
        next(err);
    }
}
