const CategoryData = require("../models/category");

exports.insertCategory = (req, res, next) => {
<<<<<<< HEAD
=======
  console.log(req.body);
>>>>>>> 4624675b6722bee2129d20ad50a3b275adc4ce88
  const category = new CategoryData({
    categoryName: req.body.categoryName,
    categoryDescription: req.body.categoryDescription,
    IsActive: req.body.IsActive,
    EnteredBy: req.body.EnteredBy,
    WhenEntered: req.body.WhenEntered,
    ModifiedBy: req.body.ModifiedBy,
    WhenModified: req.body.WhenModified,
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

exports.getSingleCategory = (req, res, next) => {
  CategoryData.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Categpry fetched successfully!",
          categoryData: result,
        });
      } else {
        res.status(404).json({ message: "Category not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching Category failed!",
      });
    });
};

exports.updateCategory = (req, res, next) => {
  const category = new CategoryData({
    _id: req.body._id,
    categoryName: req.body.categoryName,
    categoryDescription: req.body.categoryDescription,
    ModifiedBy: req.body.ModifiedBy,
    WhenModified: req.body.WhenModified,
  });

  CategoryData.updateOne({ _id: req.params.id }, category)
    .then((result) => {
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't udpate post!",
      });
    });
};

exports.deleteCategory = (req, res, next) => {
  CategoryData.deleteOne({ _id: req.params.id })
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
<<<<<<< HEAD
=======
};

exports.updateStatus = (req, res, next) => {
  //console.log(req.body);
  const category = new CategoryData({
    _id: req.body._id,
    IsActive: req.body.IsActive,
    ModifiedBy: req.body.ModifiedBy,
    WhenModified: req.body.WhenModified,
  });
  console.log(category);
  CategoryData.updateOne({ _id: req.params.id }, category)
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
>>>>>>> 4624675b6722bee2129d20ad50a3b275adc4ce88
};
