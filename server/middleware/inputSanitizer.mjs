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

function transactionDataSanitizer(req, res, next) {
    const { amount, description, trans_date, transCategory_id, account_id, type } = req.body;
    const allowedTags = [];
    const allowedAttributes = {};

    req.body.amount = sanitizeHtml(amount, { allowedTags, allowedAttributes });
    req.body.description = sanitizeHtml(description, { allowedTags, allowedAttributes });
    req.body.date = sanitizeHtml(trans_date, { allowedTags, allowedAttributes });
    req.body.categoryId = sanitizeHtml(transCategory_id, { allowedTags, allowedAttributes });
    req.body.accountId = sanitizeHtml(account_id, { allowedTags, allowedAttributes });
    req.body.type = sanitizeHtml(type, { allowedTags, allowedAttributes });
    next();
}

export {
    memberDataSanitzer,
    trikotDataSanitizer,
    transCategoryDataSanitizer,
    accountDataSanitizer,
    transactionDataSanitizer,
};
