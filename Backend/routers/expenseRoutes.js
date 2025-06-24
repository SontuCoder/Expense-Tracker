const express = require("express");

const router = express.Router();
const { protect } = require("../middlewares/authmiddleware.js");

const {
    addExpense,
    getAllExpenses,
    deleteExpense,
    downloadExpenseExcle
} = require("../controllers/expenseController.js");


router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpenses);
router.delete("/delete/:id", protect, deleteExpense);
router.get("/downloadexcle/:month", protect, downloadExpenseExcle);

module.exports = router;