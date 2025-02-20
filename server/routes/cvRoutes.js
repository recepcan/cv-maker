import express from "express";
import { createCV, getUserCVs, updateCV, deleteCV, getCVById } from "../controllers/cvController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/save",verifyToken, createCV); // Yeni CV oluştur
router.get("/get/:userId",verifyToken, getUserCVs); // Kullanıcının tüm CV'lerini getir
router.get('/:id', getCVById);
router.put('/update/:id',verifyToken,updateCV)
router.delete("/delete/:id",verifyToken, deleteCV); // CV sil

export default router;
