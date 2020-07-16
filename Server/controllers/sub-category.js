const SubCategoryData = require("../models/sub-category");

const CategoryData = require("../models/category");

exports.insertSubCategory = (req, res, next) => {
  console.log(req.body);
  const subcategory = new SubCategoryData({
    categoryId: req.body.categoryId,
    subcategoryName: req.body.subcategoryName,
    subcategoryDescription: req.body.subcategoryDescription,
    IsActive: req.body.IsActive,
    EnteredBy: req.body.EnteredBy,
    WhenEntered: req.body.WhenEntered,
    ModifiedBy: req.body.ModifiedBy,
    WhenModified: req.body.WhenModified,
  });

  subcategory
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

exports.getAllsubCategory = (req, res, next) => {
  SubCategoryData.find()
    .then((documents) => {
      res.status(200).json({
        message: "Categpry fetched successfully!",
        subcategoryData: documents,
      });
    })
    .catch((error) => {
      console.log(error);

      res.status(500).json({
        message: "Fetching Categpry failed!",
      });
    });
};

exports.getSingleSubCategory = (req, res, next) => {
  SubCategoryData.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Categpry fetched successfully!",
          subcategoryData: result,
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

exports.updateSubCategory = (req, res, next) => {
  const subcategory = new SubCategoryData({
    _id: req.body._id,
    categoryId: req.body.categoryId,
    subcategoryName: req.body.subcategoryName,
    subcategoryDescription: req.body.subcategoryDescription,
    ModifiedBy: req.body.ModifiedBy,
    WhenModified: req.body.WhenModified,
  });
  console.log(subcategory);
  SubCategoryData.updateOne({ _id: req.params.id }, subcategory)
    .then((result) => {
      console.log(result);
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

exports.deleteSubCategory = (req, res, next) => {
  SubCategoryData.deleteOne({ _id: req.params.id })
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

// exports.getAllCategpryandSubCategory = (req, res, next) => {
//   console.log("test");

//   CategoryData.aggregate([
//     {
//       $lookup: {
//         from: "subcategorydatas", // collection to join
//         localField: "_id", //field from the input documents
//         foreignField: "categoryId", //field from the documents of the "from" collection
//         as: "subcategorydata", // output array field
//       },
//     },
//   ])
//     .then((documents) => {
//       res.status(200).json({
//         message: "Categpry fetched successfully!",
//         categoryData: documents,
//       });
//     })
//     .catch((error) => {
//       console.log(error);

//       res.status(500).json({
//         message: "Fetching Categpry failed!",
//       });
//     });
// };

exports.getAllCategpryandSubCategory = (req, res, next) => {
  console.log("getAllCategpryandSubCategory");
  SubCategoryData.find()
    .populate("categoryId")
    .exec((documents, result) => {
      //  console.log(result);
      res.status(200).json({
        message: "Categpry fetched successfully!",
        subcategoryData: result,
      });
    });
};
