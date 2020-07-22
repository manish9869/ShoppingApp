const express = require("express");

const ProductController = require("../controllers/product");
const extractFile = require("../middleware/file");
const router = express.Router();

router.post("/addproducts", extractFile, ProductController.addproducts);

//router.get("", SubcategoryController.getAllsubCategory);

// router.get("/:id", SubcategoryController.getSingleSubCategory);

// router.put("/:id", SubcategoryController.updateSubCategory);

// router.delete("/:id", SubcategoryController.deleteSubCategory);

// router.post("/updateStatus/:id", SubcategoryController.updateStatus);
// router.get("", SubcategoryController.getAllCategpryandSubCategory);

module.exports = router;
