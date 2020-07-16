const express = require("express");

const SubcategoryController = require("../controllers/sub-category");

const router = express.Router();

router.post("/addsubcategory", SubcategoryController.insertSubCategory);

//router.get("", SubcategoryController.getAllsubCategory);

router.get("/:id", SubcategoryController.getSingleSubCategory);

router.put("/:id", SubcategoryController.updateSubCategory);

router.delete("/:id", SubcategoryController.deleteSubCategory);

router.get("", SubcategoryController.getAllCategpryandSubCategory);

module.exports = router;
