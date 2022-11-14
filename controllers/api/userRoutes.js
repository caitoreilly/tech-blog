const router = require("express").Router();
const { User } = require("../../models");

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    const validPW = userData.checkPassword(req.body.password);
    if (!validPW) {
      res.status(404).json({ message: "Incorrect password!" });
      return;
    }
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      res.json(userData);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
