// routes/orderRoutes.js
import express from 'express';
import Order from '../models/Order.js';
import { sendOrderEmail } from "../services/emailService.js";

const router = express.Router();

// Всички поръчки
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Грешка при зареждане на поръчките.' });
  }
});

// Добавяне на нова поръчка
router.post('/', async (req, res) => {
  try {
    const { customerName, customerPhone, customerEmail, customerAddress, items } = req.body;

    if (!customerName || !customerPhone || !customerAddress || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Невалидни данни за поръчка.' });
    }

    const newOrder = new Order({
      customerName,
      customerPhone,
      customerEmail,
      customerAddress,
      items
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('❌ Грешка при създаване на поръчка:', err);
    res.status(500).json({ error: 'Грешка при създаване на поръчката.' });
  }
});

router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    // 📧 изпращаме имейл
    await sendOrderEmail(req.body);

    res.status(201).json(newOrder);
  } catch (err) {
    console.error("❌ Грешка при създаване на поръчка:", err);
    res.status(500).json({ error: "Грешка при създаване на поръчка" });
  }
});

// Маркиране като изпълнена
router.patch('/:id/complete', async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Поръчката не е намерена' });

    order.isCompleted = true;
    await order.save();

    res.json({ message: 'Поръчката е завършена', order });
  } catch (err) {
    console.error('Грешка при приключване на поръчката:', err);
    res.status(500).json({ message: 'Сървърна грешка' });
  }
});

// router.patch('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { isShipped, isPaid } = req.body;

//   try {
//     const order = await Order.findById(id);
//     if (!order) return res.status(404).json({ message: 'Поръчката не е намерена' });

//     if (typeof isShipped === 'boolean') order.isShipped = isShipped;
//     if (typeof isPaid === 'boolean') order.isPaid = isPaid;

//     await order.save();
//     res.json({ message: 'Успешно обновено', order });
//   } catch (err) {
//     console.error('Грешка при обновяване:', err);
//     res.status(500).json({ message: 'Сървърна грешка' });
//   }
// });

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, { new: true });

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: 'Грешка при обновяване на поръчката' });
  }
});

// Изтриване на поръчка
router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Поръчката е изтрита.' });
  } catch (err) {
    res.status(500).json({ error: 'Грешка при изтриване.' });
  }
});

export default router;

