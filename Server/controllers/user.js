const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserData = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new UserData({
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      password: hash,
    });

    user
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Invalid authentication credentials!",
        });
      });
  });
};

exports.loginUser = (req, res, next) => {
  let fetchedUserData;

  UserData.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fetchedUserData = user;
      return bcrypt(fetchedUserData.password, req.body.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }

      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Invalid authentication credentials!",
      });
    });
};
