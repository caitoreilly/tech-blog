const router = require("express").Router();
const { User, Post } = require("../../models");
const { restore } = require("../../models/User");

// login route that will verify the uers's identity (expects email & pw)
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }
    console.log(dbUserData);
    console.log("++++++++++");
    console.log(req.session);

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      console.log(req);

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

// GET /api/users
router.get("/", (req, res) => {
  // Access our User model and run .findAll() method
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["title", "body"],
      },
      // include the Comment model here:
      {
        model: Comment,
        attributes: ["body"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id." });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post("/", (req, res) => {
  console.log(req.body);
  //expects {username: "Lernantino", email: "lernantino@gmail.com", password: "password123"}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }).then((dbUserData) => {
    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      console.log(dbUserData);
      console.log("+++++++++++++");
      console.log(req.session);
      res.json(dbUserData);
    });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
