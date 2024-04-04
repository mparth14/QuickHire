/**
 * Connects to the MongoDB database using Mongoose.
 * @author Hiteshkumar
 * @author Angel
 * @async
 * @function connectDB
 * @returns {Promise<void>}
 */
import mongoose from "mongoose";
import { DB_NAME } from "../config/constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;
