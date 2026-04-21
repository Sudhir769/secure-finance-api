import express from 'express';
import recordController from '../controller/recordController.js';

import authenticateToken from '../middleware/auth.js';
import authorize  from '../middleware/authorize.js';

const router = express.Router();

router.post("/", authenticateToken, authorize("Admin"), recordController.createRecord);
router.get("/", authenticateToken, authorize("Viewer", "Analyst", "Admin"), recordController.getRecords);
router.get("/summary", authenticateToken, authorize("Analyst", "Admin"), recordController.getSummary);
router.get( "/:id", authenticateToken, authorize("Viewer", "Analyst", "Admin"), recordController.getRecordById);
router.put("/:id", authenticateToken, authorize("Admin"), recordController.updateRecord);
router.delete( "/:id", authenticateToken, authorize("Admin"), recordController.deleteRecord);

export default router;
