const CategoryData = require("../models/categoryModel");

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
