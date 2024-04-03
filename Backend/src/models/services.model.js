import mongoose from 'mongoose';

const { Schema } = mongoose;

const serviceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: [120, 'Description must be at least 120 characters'],
        maxlength: [1500, 'Description cannot exceed 1500 characters']
    },
    category: {
        type: String,
        required: true
    },
    subCategory: String,
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return /^[0-9]+$/.test(value); 
            },
            message: 'Price must be a number'
        }
    },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    sellerId: {
        type: String,
        required: true
    },
    imgUrl: String,
    currentRating: { type: Number, default: 0 },
    numberOfRatings: { type: Number, default: 0 },
    isPopular: { type: Boolean, default: false },
});

export default mongoose.model('Service', serviceSchema);
