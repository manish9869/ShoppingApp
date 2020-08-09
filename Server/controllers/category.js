const CategoryData = require("../models/category");

exports.insertCategory = (req, res, next) => {
  console.log(req);
  const url = req.protocol + "://" + req.get("host");
  const category = new CategoryData({
    categoryName: req.body.categoryName,
    categoryDescription: req.body.categoryDescription,
    IsActive: req.body.IsActive,
    image: url + "/images/" + req.files[0].filename,
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
      message: "Category fetched successfully!",
      categoryData: documents,
    });
  }).catch((error) => {
    console.log(error);

    res.status(500).json({
      message: "Fetching Categpry failed!",
    });
  });
};

exports.getActiveCategory = (req, res, next) => {
  const CategoryDataQuery = CategoryData.find({ IsActive: true });

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
  console.log(req.body);

  let image = req.body.image;
  if (req.files) {
    const url = req.protocol + "://" + req.get("host");
    image = url + "/images/" + req.files[0].filename;
  }

  const url = req.protocol + "://" + req.get("host");

  const category = new CategoryData({
    _id: req.body._id,
    categoryName: req.body.categoryName,
    categoryDescription: req.body.categoryDescription,
    image: image,
    ModifiedBy: req.body.ModifiedBy,
    WhenModified: req.body.WhenModified,
  });

  CategoryData.updateOne({ _id: req.params.id }, category)
    .then((result) => {
      console.log(result);
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      console.log(error);
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
};

exports.getCategoryProduct = (req, res, next) => {
  CategoryData.aggregate([
    { $match: { IsActive: true } },
    {
      $lookup: {
        from: "subcategorydatas",
        let: { subcategoryId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$categoryId", "$$subcategoryId"] },
                  { $eq: ["$IsActive", true] },
                ],
              },
            },
          },
          {
            $lookup: {
              from: "productdatas",
              let: { productId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$subcategoryId", "$$productId"],
                        },
                        { $eq: ["$IsActive", true] },
                      ],
                    },
                  },
                },
              ],
              as: "productdata",
            },
          },
        ],
        as: "subcategorydata",
      },
    },
    { $unwind: "$subcategorydata" },
    {
      $group: {
        _id: "$_id",
        categoryName: { $first: "$categoryName" },
        categoryDescription: { $first: "$categoryDescription" },
        IsActive: { $first: "$IsActive" },
        subcategorydata: { $push: "$subcategorydata" },
      },
    },
    { $sort: { categoryName: 1 } },
  ])
    .then((documents) => {
      res.status(200).json({
        message: "Categpry fetched successfully!",
        categoryData: documents,
      });
    })
    .catch((error) => {
      console.log(error);

      res.status(500).json({
        message: "Fetching Categpry failed!",
      });
    });
};
