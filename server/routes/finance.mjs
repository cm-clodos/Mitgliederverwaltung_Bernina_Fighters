import express from "express";
import financeController from "../controller/financeController.mjs";
import { validateTransCategoryData } from "../middleware/validateTransCategoryData.mjs";

const router = express.Router();

router.get("/categories", financeController.handleGetAllTransCategories);
router.post("/categories", validateTransCategoryData, financeController.handleNewTransCategory);
router.delete("/categories/:id", financeController.handleDeleteTransCategory);

export default router;
