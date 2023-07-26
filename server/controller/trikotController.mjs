import Trikot from "../model/Trikot.mjs";
import TrikotHelper from "../helper/TrikotHelper.mjs";
import ApiError from "../model/ApiError.mjs";
import CreateResponse from "../model/CreateResponse.mjs";
import EncryptionService from "../services/EncryptionService.mjs";
import fs from "fs";
import {
    exportAllTrikotList,
    exportAvailableTrikotList
} from "../services/ExportService.mjs";

const handleGetAllTrikots = async (req, res) => {
    const trikotHelper = new TrikotHelper();
    const encryptionService = new EncryptionService();
    try {
        const trikots = await trikotHelper.getAllTrikots();
        const decryptedTrikotData = encryptionService.decryptTrikotData(trikots);
        return res.status(200).json(decryptedTrikotData);
    } catch (error) {
        console.log(error);
        res.status(500).json(new ApiError("ee-999"));
    }
}

const handleNewTrikot = async (req, res) => {
    const trikot = new Trikot(
        req.body.number,
        req.body.name,
        req.body.available,
        req.body.member_id);

    trikot.member_id = (trikot.member_id === "null") ? null : trikot.member_id;
    const trikotHelper = new TrikotHelper();
    try {
        const result = await trikotHelper.addTrikot(trikot);
        if (result.success && result.data.affectedRows === 1) return res.status(201).json(new CreateResponse("tere-201"));
    }
    catch (error) {
        console.log(error);
        if (error.code === "ER_DUP_ENTRY") return res.status(400).json(new ApiError("te-400"))
        else if (error.code === "ER_NO_REFERENCED_ROW_2") return res.status(400).json(new ApiError("me-404"));
        return res.status(500).json(new ApiError("ee-999"));
    }
}

const handleUpdateTrikot = async (req, res) => {
    const trikot = new Trikot(
        req.params.id,
        req.body.name,
        req.body.available,
        req.body.member_id);

    trikot.member_id = (trikot.member_id === "null") ? null : trikot.member_id;
    const trikotHelper = new TrikotHelper();
    try {
        const result = await trikotHelper.updateTrikot(trikot);
        if (result.data.affectedRows === 0) return res.status(404).json(new ApiError("te-404"));
        return res.status(200).json(new CreateResponse("tere-200"));
    } catch (error) {
        console.log(error);
        if (error.code === "ER_DUP_ENTRY") return res.status(400).json(new ApiError("me-401"))
        else if (error.code === "ER_NO_REFERENCED_ROW_2") return res.status(400).json(new ApiError("me-404"));
        return res.status(500).json(new ApiError("ee-999"));
    }
}

const handleDeleteTrikot = async (req, res) => {
    const trikotNumber = req.params.id;
    const trikotHelper = new TrikotHelper();
    try {
        const result = await trikotHelper.deleteTrikotByNumber(trikotNumber);
        if (result.success && result.data.affectedRows === 1) return res.status(200).json(new CreateResponse("tere-202"));
        return res.status(404).json(new ApiError("te-404"));
    } catch (error) {
        console.log(error);
        res.status(500).json(new ApiError("ee-999"));
    }
}

const handleTrikotListExportFile = async (req, res) => {
    const filter = req.query.filter;
    let downloaded;
    try {
        if (filter === "all") {
            downloaded = await exportAllTrikotList(filter);
        } else if (filter === "available") {
            downloaded = await exportAvailableTrikotList(filter);
        }
        const folderPath = '../server/temp';
        const filename = `${filter}TrikotList.csv`;

        if (fs.existsSync(`${folderPath}/${filename}`) && downloaded) {
            res.download(`${folderPath}/${filename}`, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    fs.unlink(`${folderPath}/${filename}`, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("File deleted");
                        }
                    });
                }
            });
        } else {
            console.log("File not found");
            res.status(404).json(new ApiError("fe-404"));
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(new ApiError("ee-999"));
    }
};

export default {
    handleGetAllTrikots,
    handleNewTrikot,
    handleUpdateTrikot,
    handleDeleteTrikot,
    handleTrikotListExportFile
}