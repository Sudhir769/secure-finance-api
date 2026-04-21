import express from 'express';
import pool from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import userRoutes from './routes/userRoutes.js';
import recordRoutes from './routes/recordRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/records', recordRoutes);

app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT current_database()');
        console.log('connected to database in server.js');
        res.send(`Connected to database: ${result.rows[0].current_database}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Backend is healthy',
    });
});

app.get('/home', (req, res) => {
    res.send('home page');
})
app.get('/', (req, res) => {
    console.log('log in terminal');
    res.status(200).send('Secure backend from Sudhir Maurya');
})

app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});

