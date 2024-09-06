import pkg from "pg";
import getConfig from "../config/config.service.js";
const { Pool } = pkg;

// .envdan databaza ma'lumotlarini olish
export const pool = new Pool({
  database: getConfig("DATABASE_NAME"),
  user: getConfig("DATABASE_USER"),
  password: getConfig("DATABASE_PASSWORD"),
  host: getConfig("DATABASE_HOST"),
  port: parseInt(getConfig("DATABASE_PORT")),
});

export async function initDatabase() {
  await connectToDb();
  await setupModels();
}


// Bazaga ulanish
async function connectToDb() {
  try {
    await pool.connect();
    console.log("Bazaga ulandi");
  } catch (err) {
    console.log("Bazaga ulanishda hatolik:", err.message);
  }
}


// Jadvallarni yaratish
async function setupModels() {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            first_name VARCHAR NOT NULL,
            second_name VARCHAR NOT NULL,
            password VARCHAR NOT NULL,
            role VARCHAR NOT NULL,
            created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    await pool.query(
        `
        CREATE TABLE IF NOT EXISTS rooms(
        id SERIAL PRIMARY KEY,
        name VARCHAR
        )
        `);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS courses(
            id SERIAL PRIMARY KEY,
            name VARCHAR,
            teacher_id INT,
            start_date  DATE,
            price  DECIMAL(10,2),
            room_id INT,
            foreign key  (teacher_id) references users(id),
            foreign key  (room_id) references rooms(id)

        )
    `);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS payments(
            id SERIAL PRIMARY KEY,
            student_id INT,
            course_id INT,
            amount DECIMAL(10,2),
            payment_date  DATE,
            foreign key  (student_id) references users(id),
            foreign key  (course_id) references courses(id)
        )
    `);
    
    console.log("jadvallar yaratildi!");
    
  } catch (err) {
    console.log("Jadvallarni yaratishda hatolik boldi", err.message);
  }
}
