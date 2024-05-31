import express from "express";
import financeController from "../controller/financeController.mjs";
import { validateTransCategoryData } from "../middleware/validateTransCategoryData.mjs";
import { validateAccountData } from "../middleware/validateAccountData.mjs";
import { transCategoryDataSanitizer, accountDataSanitizer } from "../middleware/inputSanitizer.mjs";

const router = express.Router();

router.get("/categories", financeController.handleGetAllTransCategories);
router.post(
    "/categories",
    transCategoryDataSanitizer,
    validateTransCategoryData,
    financeController.handleNewTransCategory
);
router.delete("/categories/:id", financeController.handleDeleteTransCategory);

router.get("/accounts", financeController.handleGetAllAccounts);
router.post(
    "/accounts",
    accountDataSanitizer,
    validateAccountData,
    financeController.handleNewAccount
);

export default router;
