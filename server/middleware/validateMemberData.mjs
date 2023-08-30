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

    const errorChecks = [
        { error: firstnameError, key: 'firstname' },
        { error: lastnameError, key: 'lastname' },
        { error: emailError, key: 'email' },
        { error: telephoneError, key: 'telephone' },
        { error: activeError, key: 'active' },
        { error: roleIdError, key: 'role_id' },
        { error: entryDateError, key: 'entry_date' }
    ];

    errorChecks.forEach(({ error, key }) => {
        if (Object.keys(error).length > 0) {
            errors.push({ key, error });
        }
    });

    if (errors.length > 0) {
        res.status(400).json(errors);
    } else {
        next();
    }
}

