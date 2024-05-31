import { checkAccountName, checkAccountBalance, trimData } from "../services/FieldChecker.mjs";

export function validateAccountData(req, res, next) {
    req.body = trimData(req.body);

    const { name, balance } = req.body;

    const errors = [];
    const accountNameError = checkAccountName(name);
    const accountBalanceError = checkAccountBalance(balance);
    console.log(accountBalanceError);

    if (Object.keys(accountNameError).length > 0) errors.push(accountNameError);
    if (Object.keys(accountBalanceError).length > 0) errors.push(accountBalanceError);

    if (errors.length > 0) {
        res.status(400).json(errors);
    } else {
        next();
    }
}
