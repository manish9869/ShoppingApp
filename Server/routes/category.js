const express = require("express");

const categoryController = require("../controllers/category");
const extractFile = require("../middleware/file");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.post("/addcategory", extractFile, categoryController.insertCategory);

router.get("", categoryController.getAllCategory);
router.get("/getCategpryProduct", categoryController.getCategoryProduct);

router.get("/getActiveCategories", categoryController.getActiveCategory);

router.get("/:id", categoryController.getSingleCategory);

router.put("/:id", extractFile, categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);

router.post("/updateStatus/:id", categoryController.updateStatus);

module.exports = router;
