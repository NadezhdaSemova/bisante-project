import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  grape: { type: String },
  vintage: { type: Number },
  bottleType: { type: String },
  alcohol: { type: String },
  description: { type: String },
  purchaseCount: { type: Number, default: 0}
});

const Product = mongoose.model('Product', productSchema);

export default Product;
