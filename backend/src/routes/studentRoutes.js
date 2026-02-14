import express from 'express';
// import { getStudents, addStudent, deleteStudent } from '../controllers/studentController.js';
import { getStudents, addStudent } from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Only ADMIN & TNP_OFFICER can view students
router.get(
    '/',
    protect,
    authorizeRoles('ADMIN', 'TNP_OFFICER'),
    getStudents
);

// Only ADMIN & TNP_OFFICER can add students
router.post(
    '/',
    protect,
    authorizeRoles('ADMIN', 'TNP_OFFICER'),
    addStudent
);

/*
router.delete(
    '/:id',
    protect,
    authorizeRoles('ADMIN'),
    deleteStudent
);
*/

export default router;
