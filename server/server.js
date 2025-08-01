import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/products.js';
// import orderRoutes from './routes/productRoutes.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admins', adminRoutes)



// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'wine-store'
  })
  .then(() => console.log('✅ Успешна връзка с MongoDB!'))
  .catch((err) => console.error('❌ Грешка при свързване с MongoDB:', err));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('❌ Нещо се обърка!');
});

app.listen(PORT, () => {
  console.log(`🚀 Сървърът работи на http://localhost:${PORT}`);
});

