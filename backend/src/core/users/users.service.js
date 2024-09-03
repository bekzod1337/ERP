import { pool } from "../../common/database/database.service.js";
import bcrypt from 'bcrypt';
// Barcha foydalanuvchilarni olish
export async function getAllUser(req, res) {
    try {
      if (req.user && req.user.role === 'admin') {
        const result = await pool.query('SELECT * FROM users;');
        res.status(200).send(result.rows);
      } else {
        res.status(403).send("Sizda bu ma'lumotlarga kirish huquqi yo'q.");
      }
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






export async function login(req, res) {
    try {
        const { id, password } = req.body;

        // Foydalanuvchini id bo'yicha qidirish
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(401).send('Foydalanuvchi topilmadi.');
        }

        const user = result.rows[0];

        // Parolni tekshirish
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).send("Noto'g'ri parol");
        }

        // Foydalanuvchi rolining qiymatini tekshirish va yoʻnaltirish
        switch (user.role) {
            case 'student':
                return res.redirect('file:///C:/Users/user/Desktop/ERP/frontend/student/html/index.html');
            case 'teacher':
                return res.redirect('/teacher.html');
            case 'admin':
                return res.redirect('/admin.html');
            default:
                return res.status(403).send('Noaniq rol.');
        }
    } catch (err) {
        console.error("Kirishda xatolik bo'ldi:", err.message);
        res.status(500).send("Kirishda xatolik bo'ldi: " + err.message);
    }
}