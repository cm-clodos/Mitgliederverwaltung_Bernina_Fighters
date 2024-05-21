import { checkTransCategoryName, trimData } from "../services/FieldChecker.mjs";

export function validateTransCategoryData(req, res, next) {
    req.body = trimData(req.body);

    const { name } = req.body;

    const errors = [];
    const transCategoryNameError = checkTransCategoryName(name);

    if (Object.keys(transCategoryNameError).length > 0) errors.push(transCategoryNameError);

    if (errors.length > 0) {
        res.status(400).json(errors);
    } else {
        next();
    }
}
