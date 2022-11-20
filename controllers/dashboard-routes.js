const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth.js");

// route to display dashboard once user is logged in - user can see all posts they have created

router.get("/", withAuth, (req, res) => {
  res.render("dashboard");
});

module.exports = router;
