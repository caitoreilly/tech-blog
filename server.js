// Server engine for Tech Blog

// Requires path module
const path = require('path');
// Requires dotenv for sensitive info
require('dotenv').config();
// Requires express
const express = require('express');
// Requires controllers and all the routes in the folder
const routes = require('./controllers/');
// Requires sequelize to connect to the database
const sequelize = require('./config/connection');
// Handlebars helpers
const helpers = require('./utils/helpers');
// Express session to handle session cookies
const session = require('express-session')
// Sequelize store to save the session so the user can remain logged in
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Handlebars template engine for front-end
const expressHandlebars = require('express-handlebars')
// Initialize handlebars for the html templates
const exphbs = expressHandlebars.create({helpers});

// Initialize the server
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize sessions
const sess = {
  // TEAM: FOR YOUR LOCAL TESTING, CREATE A .ENV FILE WITH
  // DB_NAME: pawpals (create this with mysql line first)
  // DB_USER: MySQL Username
  // DB_PW: MySQL Password
  // DB_SESSION_SECRET: this can be literally anything
  secret: "liam",
  cookie: { maxAge: 7200000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
// Tell the app to use Express Session for the session handling
app.use(session(sess));

// Give the server a path to the public directory for static files
app.use(express.static(path.join(__dirname, 'public')));

// Set handlebars as the template engine for the server
app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');

// Use express to part JSON and strings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Give the server the path to the routes
app.use(routes);

// Sets up connection to server, listens on selected port
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on PORT: ' + PORT));
  });