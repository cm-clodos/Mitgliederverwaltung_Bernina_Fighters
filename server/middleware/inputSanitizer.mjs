import sanitizeHtml from "sanitize-html";

function memberDataSanitzer(req, res, next) {
    const { firstname, lastname, email, telephone } = req.body;
    const allowedTags = [];
    const allowedAttributes = {};

    req.body.firstname = sanitizeHtml(firstname, { allowedTags, allowedAttributes });
    req.body.lastname = sanitizeHtml(lastname, { allowedTags, allowedAttributes });
    req.body.email = sanitizeHtml(email, { allowedTags, allowedAttributes });
    req.body.telephone = sanitizeHtml(telephone, { allowedTags, allowedAttributes });
    next();
}

function trikotDataSanitizer(req, res, next) {
    const { name } = req.body;
    const allowedTags = [];
    const allowedAttributes = {};

    req.body.name = sanitizeHtml(name, { allowedTags, allowedAttributes });
    next();
}

function transCategoryDataSanitizer(req, res, next) {
    const { name } = req.body;
    const allowedTags = [];
    const allowedAttributes = {};

    req.body.name = sanitizeHtml(name, { allowedTags, allowedAttributes });
    next();
}

function accountDataSanitizer(req, res, next) {
    const { name, balance } = req.body;
    const allowedTags = [];
    const allowedAttributes = {};

    req.body.name = sanitizeHtml(name, { allowedTags, allowedAttributes });
    req.body.balance = sanitizeHtml(balance, { allowedTags, allowedAttributes });
    next();
}

export {
    memberDataSanitzer,
    trikotDataSanitizer,
    transCategoryDataSanitizer,
    accountDataSanitizer,
};
