import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ error: 'Няма токен' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // добавяме user данни в заявката
    next();
  } catch (err) {
    res.status(401).json({ error: 'Невалиден токен' });
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) return res.status(403).json({ error: 'Само администратори' });
  next();
};

export { authMiddleware, requireAdmin };