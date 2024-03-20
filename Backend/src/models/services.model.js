import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  sub_category: String,
  price: Number,
  created_date: Date,
  updated_date: Date,
  isActive: Boolean,
  seller_id: String,
  img_url: String
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
