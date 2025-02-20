import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // MongoDB bağlantısını içe aktar
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import pdfRoutes from './routes/pdfRoutes.js';
import cvRoutes from './routes/cvRoutes.js';




// Cookie parser middleware'i kullanıyoruz


const app = express();
dotenv.config(); // Çevresel değişkenleri yükle

app.use(cookieParser());
app.use(bodyParser.json());

// Middleware'ler
app.use(cors());
app.use(express.json());


connectDB();


// PDF oluşturma route'u
app.use('/server', pdfRoutes);
app.use('/server/user', userRoutes);
app.use('/server/auth', authRoutes);
app.use('/server/cv', cvRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Sunucu ${PORT} portunda çalışıyor.`));
