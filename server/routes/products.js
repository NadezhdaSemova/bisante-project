import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET всички продукти
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('❌ Грешка при зареждане на продукти:', err.message);
    res.status(500).json({ error: 'Сървърна грешка' });
  }
});

// POST нов продукт
router.post('/', async (req, res) => {
  const {
    name,
    year,
    color,
    price,
    image,
    grape,
    vintage,
    bottleType,
    alcohol,
    description
  } = req.body;

  try {
    const newProduct = new Product({
      name,
      year,
      color,
      price,
      image,
      grape,
      vintage,
      bottleType,
      alcohol,
      description
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Грешка при създаване на продукт:', error);
    res.status(500).json({ error: 'Възникна грешка при записване на продукта' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Продуктът не е намерен' });
    res.json(product);
  } catch (error) {
    console.error('Грешка при намиране на продукта:', error);
    res.status(500).json({ message: 'Възникна грешка при намиране на продукта' });
  }
});


// DELETE продукт
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
