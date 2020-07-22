const ProductData = require("../models/product");

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
    subCategoryId: req.body.subcategoryId,
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
