const express = require("express");

const categoryController = require("../controllers/category");

const router = express.Router();


router.post("/addcategory", categoryController.insertCategory);

router.get("", categoryController.getAllCategory);



module.exports = router;
