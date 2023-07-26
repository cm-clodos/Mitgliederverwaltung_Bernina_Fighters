import {
    checkTrikotNumber,
    checkTrikotName,
    checkAvailable,
    checkMemberId,
    trimData
} from "../services/FieldChecker.mjs";

export function validateTrikotData(req, res, next) {
    if (req.body.number === undefined) req.body.number = req.params.id;
    req.body = trimData(req.body);

    const {number, name, available, member_id} = req.body;

    const errors = []
    const trikotNumberError = checkTrikotNumber(number);
    const trikotNameError = checkTrikotName(name);
    const availableError = checkAvailable(available);
    const memberIdError = checkMemberId(member_id);

    if (Object.keys(trikotNumberError).length > 0) errors.push(trikotNumberError);
    if (Object.keys(trikotNameError).length > 0) errors.push(trikotNameError);
    if (Object.keys(availableError).length > 0) errors.push(availableError);
    if (Object.keys(memberIdError).length > 0) errors.push(memberIdError);

    if (errors.length > 0) {
        res.status(400).json(errors);
    } else {
        next();
    }
}