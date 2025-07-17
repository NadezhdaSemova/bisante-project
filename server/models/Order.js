import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  customerAddress: String,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  isShipped: { type: Boolean, default: false },
  isPaid: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);


