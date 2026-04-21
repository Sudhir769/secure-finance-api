import db from "../config/db.js";
const createRecord = async (userId,amount,type,category,transactionDate,notes) => {
    const query = `
        INSERT INTO financial_records (user_id, amount, type, category, transaction_date, notes)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`;
    const values = [userId, amount, type, category, transactionDate, notes];
    const result = await db.query(query, values);
    return result.rows[0];
};

const getRecordById = async (id, userId) => {
  const query = `
        SELECT * FROM financial_records 
        WHERE id = $1 AND user_id = $2;
    `;
  const result = await db.query(query, [id, userId]);
  return result.rows[0];
};

const getRecords = async (userId, type, category) => {
  let query = `SELECT * FROM financial_records WHERE user_id = $1`;
  const values = [userId];
  let paramCounter = 2; 

  if (type) {
    query += ` AND type = $${paramCounter}`;
    values.push(type);
    paramCounter++;
  }

  if (category) {
    query += ` AND category = $${paramCounter}`;
    values.push(category);
    paramCounter++;
  }

  query += ` ORDER BY transaction_date DESC;`;

  const result = await db.query(query, values);
  return result.rows;
};

const updateRecord = async ( id, amount, type, category, transactionDate, notes) => {
  const query = `
        UPDATE financial_records 
        SET amount = $1, type = $2, category = $3, transaction_date = $4, notes = $5
        WHERE id = $6
        RETURNING *;
    `;
  const values = [amount, type, category, transactionDate, notes, id];
  const result = await db.query(query, values);
  return result.rows[0];
};

const deleteRecord = async (id) => {
  const query = `
        DELETE FROM financial_records 
        WHERE id = $1 
        RETURNING *;
    `;
  const result = await db.query(query, [id]);
  return result.rows[0];
};

const getDashboardSummary = async (userId) => {
  const query = `
        SELECT 
            COALESCE(SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END), 0) AS total_income,
            COALESCE(SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END), 0) AS total_expenses
        FROM financial_records 
        WHERE user_id = $1;
    `;
  const result = await db.query(query, [userId]);
  const summary = result.rows[0];

  const income = parseFloat(summary.total_income);
  const expenses = parseFloat(summary.total_expenses);
  const netBalance = income - expenses;

  return {
    totalIncome: income,
    totalExpenses: expenses,
    netBalance: netBalance,
  };
};

export default { createRecord, getRecordById, getRecords, updateRecord, deleteRecord, getDashboardSummary };