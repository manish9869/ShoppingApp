const CategoryData = require("../models/category");

exports.insertCategory = (req, res) => {
  console.log(req);
  const category = new CategoryData({
    categoryName: req.body.categoryName,
    categoryDescription: req.body.categoryDescription,
  });

  category
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Category created!",
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

exports.getAllCategory = (req, res, next) => {
  const CategoryDataQuery = CategoryData.find();

  CategoryDataQuery.then((documents) => {
    res.status(200).json({
      message: "Categpry fetched successfully!",
      categoryData: documents,
    });
  }).catch((error) => {
    console.log(error);

    res.status(500).json({
      message: "Fetching Categpry failed!",
    });
  });
};
