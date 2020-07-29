const express = require("express");

const ProductController = require("../controllers/product");
const extractFile = require("../middleware/file");
const router = express.Router();

router.post("/addproducts", extractFile, ProductController.addproducts);

//router.get("", SubcategoryController.getAllsubCategory);

router.get("/:id", ProductController.getSingleProduct);

router.put("/:id", extractFile, ProductController.updateProduct);

router.delete("/:id", ProductController.deleteProduct);

// router.post("/updateStatus/:id", SubcategoryController.updateStatus);
router.get("", ProductController.getAllProducts);

router.get("/singleproduct/:id", ProductController.getSingleProductImages);

module.exports = router;
