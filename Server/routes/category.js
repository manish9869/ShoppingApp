const express = require("express");

const categoryController = require("../controllers/category");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.post("/addcategory", checkAuth, categoryController.insertCategory);

router.get("", categoryController.getAllCategory);

router.get("/getActiveCategories", categoryController.getActiveCategory);

router.get("/:id", categoryController.getSingleCategory);

router.put("/:id", checkAuth, categoryController.updateCategory);

router.delete("/:id", checkAuth, categoryController.deleteCategory);

router.post("/updateStatus/:id", checkAuth, categoryController.updateStatus);

module.exports = router;
