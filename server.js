const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('passport');
const cookieSession = require('cookie-session');

const config = require('./config/config');
const db = require('./config/db');
const lib = require('./lib');

//api routes needed 

const app = express();

// MW - parsing data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Session
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [config.cookie.key],
}));

// MW - passport
app.use(passport.initialize());
app.use(passport.session());

// Set template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set static files
app.use('/assets', express.static('assets'));

//lib authentication


const init = async () => {
  try {
    // Attempt a database connection
    await db.connect();
    // Setup passport
    require('./config/passport');
    // Start express
    app.listen(config.express.port, () => console.log('APP Running!'));
  } catch {
    console.log('ERROR - failed to start app database issue');
    process.exit(1);
  }
};
init();
