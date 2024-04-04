/**
 * @authors 
 * Rahul Hambarde
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * Mongoose schema for password reset token
 */
const tokenSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    token: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;