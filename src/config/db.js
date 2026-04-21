import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

pool.connect((err, client, release) => {
  if (err) return console.error("DB connection error:", err.stack);
  console.log("Connected to PostgreSQL");
  release();
});

export default pool;
