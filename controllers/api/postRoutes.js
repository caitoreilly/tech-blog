const router = require("express").Router();
const withAuth = require("../../utils/auth.js");
const { Post } = require("../../models");

// POST create post
router.post("/", withAuth, (req, res) => {
  console.log(req.session.userId);
  Post.create({
    ...req.body,
    userId: req.session.userId,
  })
    .then((newPostData) => {
      if (!newPostData) {
        res.status(404).json({ message: "No user found with this id." });
        return;
      }
      res.json(newPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
