// src/routes/pdfRoutes.js
import express from 'express';
import { createPDF } from '../controllers/pdfController.js';

const router = express.Router();

// PDF oluşturma route'u
router.post('/create-pdf', createPDF);

export default router;
