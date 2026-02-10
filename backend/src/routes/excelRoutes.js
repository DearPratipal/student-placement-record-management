import express from 'express';
import upload from '../middleware/upload.js';
import { importStudentsFromExcel } from '../controllers/excelController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post(
    '/students',
    protect,
    authorizeRoles('ADMIN', 'TNP_OFFICER'),
    upload.single('file'),
    importStudentsFromExcel
);

export default router;
