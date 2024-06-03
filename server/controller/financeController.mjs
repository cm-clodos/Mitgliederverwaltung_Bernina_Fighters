import FinanceHelper from "../helper/FinanceHelper.mjs";
import TransCategory from "../model/TransCategory.mjs";
import Account from "../model/Account.mjs";
import CreateResponse from "../model/CreateResponse.mjs";
import ApiError from "../model/ApiError.mjs";

const handleGetAllTransCategories = async (req, res) => {
    try {
        const financeHelper = new FinanceHelper();
        const transCategories = await financeHelper.getAllTransCategories();
        res.status(200).json(transCategories);
    } catch (error) {
        console.log(error);
        res.status(500).json(new ApiError("ee-999"));
    }
};

const handleNewTransCategory = async (req, res) => {
    try {
        const financeHelper = new FinanceHelper();
        const transCategory = new TransCategory(req.body.name);
        const result = await financeHelper.addTransCategory(transCategory);
        if (result.success && result.data.affectedRows === 1) {
            res.status(201).json(new CreateResponse("ficatre-201"));
        } else {
            res.status(500).json(new ApiError("ee-999"));
        }
    } catch (error) {
        console.log(error);
        if (error.code === "ER_DUP_ENTRY") return res.status(400).json(new ApiError("fce-400"));
        return res.status(500).json(new ApiError("ee-999"));
    }
};

const handleDeleteTransCategory = async (req, res) => {
    try {
        const financeHelper = new FinanceHelper();
        const result = await financeHelper.deleteTransCategory(req.params.id);
        if (result.success && result.data.affectedRows === 1) {
            res.status(202).json(new CreateResponse("ficatre-202"));
        } else {
            res.status(500).json(new ApiError("fce-404"));
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(new ApiError("ee-999"));
    }
};

const handleGetAllAccounts = async (req, res) => {
    try {
        const financeHelper = new FinanceHelper();
        const accounts = await financeHelper.getAllAccounts();
        res.status(200).json(accounts);
    } catch (error) {
        console.log(error);
        res.status(500).json(new ApiError("ee-999"));
    }
};

const handleNewAccount = async (req, res) => {
    try {
        const financeHelper = new FinanceHelper();
        const account = new Account(req.body.name, req.body.balance);
        const result = await financeHelper.addAccount(account);
        if (result.success && result.data.affectedRows === 1) {
            res.status(201).json(new CreateResponse("fiacctre-201"));
        } else {
            res.status(500).json(new ApiError("ee-999"));
        }
    } catch (error) {
        console.log(error);
        if (error.code === "ER_DUP_ENTRY") return res.status(400).json(new ApiError("fae-400"));
        if (error.code === "ER_WARN_DATA_OUT_OF_RANGE")
            return res.status(422).json(new ApiError("fae-422"));
        return res.status(500).json(new ApiError("ee-999"));
    }
};

export default {
    handleGetAllTransCategories,
    handleNewTransCategory,
    handleDeleteTransCategory,
    handleGetAllAccounts,
    handleNewAccount,
};
