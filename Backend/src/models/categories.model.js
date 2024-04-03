import mongoose from 'mongoose';
const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  services: {
    type: [String],
    required: true
  }
});
 
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subcategories: {
    type: [SubcategorySchema],
    required: true
  }
});
 
 
const Category = mongoose.model('Category', CategorySchema);
 
export default Category;
 
