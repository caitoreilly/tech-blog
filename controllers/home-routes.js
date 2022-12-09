const { Post, Comment, User } = require("../models");

const router = require("express").Router();

// localhost:3001/ works

router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["title", "body", "createdAt", "userId", "id"],
    include: [
      {
        model: Comment,
        attributes: ["body"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", { posts, loggedIn: req.session.loggedIn });
      // res.json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// route to login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// route to signup
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
    attributes: ["title", "body", "createdAt", "userId"],
    // include: [
    //   {
    //     model: Comment,
    //     attributes: ["body"],
    //     include: {
    //       model: User,
    //       attributes: ["username"],
    //     },
    //   },
    //   {
    //     model: User,
    //     attributes: ["username"],
    //   },
    // ],
    include: [User, { model: Comment, include: User }],
  })
    .then((dbPostData) => {
      const post = dbPostData.get({ plain: true });
      console.log(post)
      res.render("singlepost", { ...post, loggedIn: req.session.loggedIn });
      // res.json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
