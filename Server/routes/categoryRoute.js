const express = require("express");

const categoryController = require("../controllers/categoryController");

const router = express.Router();


router.post("/addcategory", categoryController.insertCategory);




module.exports = router;
