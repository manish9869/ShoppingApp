const ProductData = require("../models/product");
const CategoryData = require("../models/category");

exports.addproducts = (req, res, next) => {
  //console.log(req.files);
  const url = req.protocol + "://" + req.get("host");

  //url + "/images/" + req.file.filename

  var files = [];
  var fileKeys = Object.keys(req.files);

  fileKeys.forEach((items) => {
    files.push(url + "/images/" + req.files[items].filename);
  });

  console.log(files);

  const productData = new ProductData({
    categoryId: req.body.categoryId,
    subcategoryId: req.body.subcategoryId,
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    keywords: req.body.keywords,
    productMRPrice: req.body.productMRPrice,
    productSellingPrice: req.body.productSellingPrice,
    Flavor: req.body.Flavor,
    Weight: req.body.Weight,
    ISCODAvailable: req.body.ISCODAvailable,
    image: files,
    IsActive: req.body.IsActive,
    EnteredBy: req.body.EnteredBy,
    WhenEntered: req.body.WhenEntered,
    ModifiedBy: req.body.ModifiedBy,
    WhenModified: req.body.WhenModified,
  });

  productData
    .save()
    .then((result) => {
      // console.log(result);
      res.status(201).json({
        message: "Product created!",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Some error Occurd",
      });
    });
};

exports.getAllProducts = (req, res, next) => {
  ProductData.find()
    // .populate("categoryId")
    // .populate("subCategoryId")
    .populate({
      path: "subcategoryId",

      populate: {
        path: "categoryId",
      },
    })
    .then((documents) => {
      res.status(200).json({
        message: "Products fetched successfully!",
        productData: documents,
      });
    })
    .catch((error) => {
      console.log(error);

      res.status(500).json({
        message: "Fetching Category failed!",
      });
    });
};

exports.deleteProduct = (req, res, next) => {
  ProductData.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting posts failed!",
      });
    });
};

exports.getSingleProduct = (req, res, next) => {
  ProductData.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Product fetched successfully!",
          productData: result,
        });
      } else {
        res.status(404).json({ message: "Product not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching Product failed!",
      });
    });
};

exports.getSingleProductImages = (req, res, next) => {
  ProductData.findById(req.params.id)
    .then((result) => {
      if (result) {
        console.log(result.image);

        res.status(200).json({
          message: "Product fetched successfully!",
          productImages: result.image,
        });
      } else {
        res.status(404).json({ message: "Product not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching Product failed!",
      });
    });
};

exports.updateProduct = (req, res, next) => {
  console.log(req.body);
  const url = req.protocol + "://" + req.get("host");

  //url + "/images/" + req.file.filename

  var files = [];
  var fileKeys = Object.keys(req.files);

  fileKeys.forEach((items) => {
    files.push(url + "/images/" + req.files[items].filename);
  });

  console.log(files);

  const productData = new ProductData({
    _id: req.body.id,
    categoryId: req.body.categoryId,
    subcategoryId: req.body.subcategoryId,
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    keywords: req.body.keywords,
    productMRPrice: req.body.productMRPrice,
    productSellingPrice: req.body.productSellingPrice,
    Flavor: req.body.Flavor,
    Weight: req.body.Weight,
    ISCODAvailable: req.body.ISCODAvailable,
    image: files,
    //IsActive: req.body.IsActive,
    //EnteredBy: req.body.EnteredBy,
    //WhenEntered: req.body.WhenEntered,
    ModifiedBy: req.body.ModifiedBy,
    WhenModified: req.body.WhenModified,
  });

  ProductData.updateOne({ _id: req.params.id }, productData)
    .then((result) => {
      // console.log(result);
      res.status(201).json({
        message: "Product updated!",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Some error Occurd",
      });
    });
};

exports.updateStatus = (req, res, next) => {
  console.log(req.body.id);
  const product = new ProductData({
    _id: req.body.id,
    IsActive: req.body.IsActive,
    ModifiedBy: req.body.ModifiedBy,
    WhenModified: req.body.WhenModified,
  });
  console.log(req.params.id);
  ProductData.updateOne({ _id: req.params.id }, product)
    .then((result) => {
      if (result.nModified > 0) {
        console.log("Update successful!");
        res.status(200).json({ message: "Update successful!" });
      } else {
        console.log("Not authorized!");
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      console.log("Couldn't udpate post! " + error);
      res.status(500).json({
        message: "Couldn't udpate post!",
      });
    });
};
