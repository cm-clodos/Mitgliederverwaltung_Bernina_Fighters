import express from "express";
import financeController from "../controller/financeController.mjs";

const router = express.Router();

router.get("/categories", financeController.handleGetAllTransCategories);
router.post("/categories", financeController.handleNewTransCategory);
router.delete("/categories/:id", financeController.handleDeleteTransCategory);

export default router;
