import express from 'express';
import { getDrives, addDrive } from '../controllers/driveController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', protect, getDrives);

router.post(
    '/',
    protect,
    authorizeRoles('ADMIN', 'TNP_OFFICER'),
    addDrive
);

export default router;
