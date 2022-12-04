const router = require("express").Router();
const withAuth = require("../../utils/auth.js");
const { Comment } = require("../../models");

router.get("/", (req, res) => {
  Comment.findAll()
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// ability to post a comment when loggedIn
router.post("/", withAuth, (req, res) => {
  console.log(req.body);
  // check the session
  if (req.session) {
    Comment.create({
      ...req.body,
      postId: req.body.postId,
      // use the id from the session
      userId: req.session.userId,
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

module.exports = router;
