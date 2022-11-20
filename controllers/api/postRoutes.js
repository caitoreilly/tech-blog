const router = require("express").Router();
const withAuth = require("../../utils/auth.js");
const { Post } = require("../../models");

// POST create post
router.post("/", withAuth, (req, res) => {
  console.log(req.body, "req.body");
  Post.create({
    ...req.body,
    user_id: req.session.user_id,
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
