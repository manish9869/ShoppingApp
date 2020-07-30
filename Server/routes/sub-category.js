const express = require("express");

const SubcategoryController = require("../controllers/sub-category");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.post(
  "/addsubcategory",
  checkAuth,
  SubcategoryController.insertSubCategory
);

//router.get("", SubcategoryController.getAllsubCategory);

router.get("/:id", SubcategoryController.getSingleSubCategory);

router.get("/getByCategory/:id", SubcategoryController.getByCategory);

//router.put("/:id", SubcategoryController.updateSubCategory);
router.put("/:id", checkAuth, SubcategoryController.updateSubCategory);

router.delete("/:id", checkAuth, SubcategoryController.deleteSubCategory);

router.post("/updateStatus/:id", SubcategoryController.updateStatus);
router.get("", SubcategoryController.getAllCategpryandSubCategory);

module.exports = router;
