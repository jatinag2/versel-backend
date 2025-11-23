import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
app.use(express.urlencoded({extended: true}));
// connect to DB + Cloudinary
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("hi jatin");


// ✅ CORS Configuration (fixed: include 'token' in allowedHeaders)
const allowedOrigins = [
  "http://localhost:5173",  // frontend
  "http://localhost:5174",  // admin
  "https://prescripto-hospital-management-system.onrender.com" // deployed site
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"], // ✅ added 'token'
  credentials: true,
}));

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API Working");
});
app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

// Start server
app.listen(port, () => console.log(`✅ Server started on PORT: ${port}`));
