import {
    checkTransDate,
    checkType,
    checkTransactionAmount,
    checkDescription,
    checkAccountId,
    checkTransCategoryId,
    trimData,
    capitalizeFirstLetter,
} from "../services/FieldChecker.mjs";

export function validateTransactionData(req, res, next) {
    req.body = trimData(req.body);
    req.body.name = capitalizeFirstLetter(req.body.description);

    const { amount, description, trans_date, transCategory_id, account_id, type } = req.body;

    const errors = [];
    const transDateError = checkTransDate(trans_date);
    const typeError = checkType(type);
    const transactionAmountError = checkTransactionAmount(amount);
    const descriptionError = checkDescription(description);
    const accountIdError = checkAccountId(account_id);
    const transCategoryIdError = checkTransCategoryId(transCategory_id);

    if (Object.keys(transDateError).length > 0) errors.push(transDateError);
    if (Object.keys(typeError).length > 0) errors.push(typeError);
    if (Object.keys(transactionAmountError).length > 0) errors.push(transactionAmountError);
    if (Object.keys(descriptionError).length > 0) errors.push(descriptionError);
    if (Object.keys(accountIdError).length > 0) errors.push(accountIdError);
    if (Object.keys(transCategoryIdError).length > 0) errors.push(transCategoryIdError);

    if (errors.length > 0) {
        res.status(400).json(errors);
    } else {
        next();
    }
}
