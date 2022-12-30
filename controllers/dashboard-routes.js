const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth.js");

// route to display dashboard once user is logged in - user can see all posts they have created
router.get("/", withAuth, (req, res) => {
  console.log(req.session.userId);
  Post.findAll({
    where: {
      userId: req.session.userId,
    },
    attributes: ["title", "body", "id"],
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
      res.render("dashboard", { posts, loggedIn: true });
      // res.json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// route to edit one post in dashboard with id
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: ["title", "body", "id"],
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
      // res.json(dbPostData);
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("onepost-dash", {
          ...post,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
