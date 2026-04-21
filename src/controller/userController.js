import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userService from '../services/userService.js';

const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await userService.createUser(email, passwordHash, role);

        return res.status(201).json({ message: "User registered successfully", user: newUser })
    } catch (error) {
        res.status(500).json({ message: "Server error during Registration", error: error.message });  
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) { 
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user.id, role:user.role },
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        return res.status(200).json({ message: "Login successful", token: token });
    } catch (error) {
        res.status(500).json({ message: "Server error during Login", error: error.message });
    
    }

};

export default { register, login };