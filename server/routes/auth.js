
import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: 'Админ с това потребителско име вече съществува.' });

    const newAdmin = new User({ username, password });
    await newAdmin.save();

    res.status(201).json({ success: true, admin: { username: newAdmin.username } });
  } catch (err) {
    console.error('Admin register error:', err);
    res.status(500).json({ message: 'Грешка при регистрация' });
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
