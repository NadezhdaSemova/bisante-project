// routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed, isAdmin });
    await user.save();
    res.status(201).json({ message: 'Регистрацията е успешна' });
  } catch (err) {
    res.status(400).json({ error: 'Потребителят вече съществува или има грешка' });
  }
});

// Вход
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await User.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Невалиден потребител' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Грешна парола' });

    res.json({ success: true, admin: { username: admin.username } });
  } catch (err) {
    res.status(500).json({ message: 'Грешка при вход' });
  }
});

export default router;
