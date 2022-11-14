// Gather routes to export to the server
const router = require("express").Router();
const homeRoutes = require("./home-routes");
const apiRoutes = require("./api");

// Dependencies
// Server connection
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
