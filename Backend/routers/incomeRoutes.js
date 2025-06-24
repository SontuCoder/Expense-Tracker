const express = require("express");

const router = express.Router();
const { protect } = require("../middlewares/authmiddleware.js");

const {
    addIncome,
    getAllIncomes,
    deleteIncomes,
    downloadIncomeExcle
} = require("../controllers/incomeController.js");


router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncomes);
router.delete("/delete/:id", protect, deleteIncomes);
router.get("/downloadexcle/:month", protect, downloadIncomeExcle);

module.exports = router;