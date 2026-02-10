import express from 'express';
import { getStudents, addStudent } from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Everyone logged in can view
router.get('/', protect, getStudents);

// Only ADMIN & TNP can add
router.post(
    '/',
    protect,
    authorizeRoles('ADMIN', 'TNP_OFFICER'),
    addStudent
);

export default router;
