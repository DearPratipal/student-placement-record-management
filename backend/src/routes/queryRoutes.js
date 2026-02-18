import express from "express";
// import { createQuery, getQueries } from "../controllers/queryController.js";
import { createQuery, getQueries, updateQueryStatus, deleteQuery } from "../controllers/queryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";


const router = express.Router();

// router.post("/api/queries", createQuery);
// router.get("/api/queries", getQueries);
router.post("/", createQuery);
router.get("/", getQueries);
router.put("/:id", updateQueryStatus);
router.delete("/:id", deleteQuery);

router.get(
    "/",
    protect,
    authorizeRoles("ADMIN"),
    getQueries
);

export default router;
