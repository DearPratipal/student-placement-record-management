import express from 'express';
import { importFromGoogleSheet } from '../controllers/googleSheetController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post(
    '/students',
    protect,
    authorizeRoles('ADMIN', 'TNP_OFFICER'),
    importFromGoogleSheet
);

export default router;
