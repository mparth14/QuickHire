import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import Stripe from "stripe";
import paymentController from "./controllers/payment.controller.js";

dotenv.config();
dotenv.config({
  path: "./.env",
});

const app = express();
const PORT = 5000;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import dummyData from "./routes/v1/dummy.routes.js";
import authData from "./routes/v1/auth.routes.js";
import userData from "./routes/v1/user.routes.js";
import servicesData from "./routes/v1/services.routes.js";
import categoriesData from "./routes/v1/categories.routes.js";
import paymentRoutes from "./routes/v1/payment.routes.js";
import cartRoutes from "./routes/v1/cart.routes.js";
import wishlistRoute from "./routes/v1/wishlist.routes.js";
import serviceOrderRoutes from "./routes/v1/order.routes.js";
import rating from "./routes/v1/review.routes.js";
import userReview from "./routes/v1/userReview.routes.js";
//routes declaration
app.use("/api/v1/dummyData", dummyData);
app.use("/api/v1/auth", authData);
app.use("/api/v1/user", userData);
app.use("/api/v1/services", servicesData);
app.use("/api/v1/categories", categoriesData);
app.use("/api/v1", paymentRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/wishlist", wishlistRoute);
app.use("/api/v1/rating", rating);
app.use("/api/v1/userReview", userReview);
app.post("/api/v1/checkout", paymentController.checkout);
app.use("/api/v1/orders", serviceOrderRoutes);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

app.get("/", (req, res) => {
  res.send("Server is running!");
});
