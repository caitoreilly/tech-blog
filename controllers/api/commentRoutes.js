const router = require("express").Router();
const withAuth = require("../../utils/auth.js");
const { Comment } = require("../../models");

// route to get all comments
router.get("/", (req, res) => {
  Comment.findAll()
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// ability to post a comment when loggedIn
router.post("/", (req, res) => {
  console.log(req.body);
  // check the session

  Comment.create({
    body: req.body.body,
    postId: req.body.post_id,
    userId: req.session.userId,
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
