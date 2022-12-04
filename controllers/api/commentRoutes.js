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
  // check the session
  if (req.session) {
    Comment.create({
      body: req.body.body,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id,
    }).then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

module.exports = router;
