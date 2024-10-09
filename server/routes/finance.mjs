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
router.get("/accounts/:id/transactions", financeController.handleGetAllTransactionsFromAccount);
router.get(
    "/accounts/:id/transactions/income",
    financeController.handleGetAllTransactionsTypeIncomeFromAccount
);
router.get(
    "/accounts/:id/transactions/expense",
    financeController.handleGetAllTransactionsTypeExpenseFromAccount
);
router.post(
    "/accounts",
    accountDataSanitizer,
    validateAccountData,
    financeController.handleNewAccount
);
router.get("/transaction/:id", financeController.handleGetTransactionById);
router.put("/transaction/:id", financeController.handleUpdateTransactionById);
router.delete("/transaction/:id", financeController.handleDeleteTransactionById);
router.post("/transaction", financeController.handleNewTransaction);
//router.post("/transaction/expense", financeController.handleNewTransaction);

export default router;
