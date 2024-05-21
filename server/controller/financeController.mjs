import FinanceHelper from "../helper/FinanceHelper.mjs";
import TransCategory from "../model/TransCategory.mjs";
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

export default {
    handleGetAllTransCategories,
    handleNewTransCategory,
    handleDeleteTransCategory,
};
