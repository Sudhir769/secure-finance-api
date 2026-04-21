import db from "../config/db.js"; 


const createUser = async (email, passwordHash, role = "Viewer") => {
    const query = `INSERT INTO users (email, password_hash, role)
    VALUES ($1, $2, $3)
    RETURNING id, email, role, status, created_at;`
    const values = [email, passwordHash, role];
    const result = await db.query(query, values);
    return result.rows[0];
};

const getUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = $1;`;
    const result = await db.query(query, [email]);
    return result.rows[0];
};

export default { createUser, getUserByEmail };