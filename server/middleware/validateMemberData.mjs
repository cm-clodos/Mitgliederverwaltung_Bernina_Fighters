import {
    checkLastname,
    checkFirstname,
    checkEmail,
    checkRoleId,
    checkTelephone,
    checkActive,
    checkEntryDate,
    trimData, formatFirstLetterOfNames
} from "../services/FieldChecker.mjs";

export function validateMemberData(req, res, next) {
    req.body = trimData(req.body);
    req.body.firstname = formatFirstLetterOfNames(req.body.firstname)
    req.body.lastname = formatFirstLetterOfNames(req.body.lastname)

    const {firstname, lastname, email, telephone, active, role_id, entry_date} = req.body;

    const errors = []
    const firstnameError = checkFirstname(firstname);
    const lastnameError = checkLastname(lastname);
    const emailError = checkEmail(email);
    const telephoneError = checkTelephone(telephone);
    const activeError = checkActive(active);
    const roleIdError = checkRoleId(role_id);
    const entryDateError = checkEntryDate(entry_date);

    if (Object.keys(firstnameError).length > 0) errors.push(firstnameError);
    if (Object.keys(lastnameError).length > 0) errors.push(lastnameError);
    if (Object.keys(emailError).length > 0) errors.push(emailError);
    if (Object.keys(telephoneError).length > 0) errors.push(telephoneError);
    if (Object.keys(activeError).length > 0) errors.push(activeError);
    if (Object.keys(roleIdError).length > 0) errors.push(roleIdError);
    if (Object.keys(entryDateError).length > 0) errors.push(entryDateError);

    if (errors.length > 0) {
        res.status(400).json(errors);
    } else {
        next();
    }
}

