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
import servicesData from "./routes/v1/services.routes.js";



//routes declaration
app.use("/api/v1/dummyData", dummyData);
app.use('/api/v1/services', servicesData);

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
