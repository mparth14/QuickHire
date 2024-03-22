import express from "express"
import dotenv from 'dotenv';
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./db/index.js";


dotenv.config();
dotenv.config({
    path: './.env'
})

const app = express()
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import dummyData from "./routes/v1/dummy.routes.js";
import servicesRoutes from "./routes/v1/service.routes.js"; // Update the import path
import userRoutes from "./routes/v1/user.routes.js";
import authRoutes from "./routes/v1/auth.routes.js";

//routes declaration
app.use("/api/v1/dummyData", dummyData);
app.use("/api/v1/auth", authRoutes); 
app.use("/api/v1/services", servicesRoutes); // Update the route path
app.use("/api/v1/user", userRoutes); 

connectDB()
.then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

app.get("/", (req, res) => {
    res.send("Server is running!")
})
