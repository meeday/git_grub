const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path');

const authRoutes = require('./routes/auth-routes');
const handlebarRoutes = require('./routes/handlebar-routes');
const config = require('./config/config');
const db = require('./config/db');

// Passport config
require('./config/passport');

// api routes needed

const app = express();

// Cookie Session
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [config.cookie.key],
}));

// Set static files
app.use(express.static(path.join(__dirname, 'public')));

// MW - parsing data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Routes

app.use('/auth', authRoutes);
app.use('/', handlebarRoutes);

// Initialize app

const init = async () => {
  try {
    // Attempt a database connection
    await db.connect();
    // Start express
    app.listen(config.express.port, () => console.log('APP Running!'));
  } catch {
    console.log('ERROR - failed to start app database issue');
    process.exit(1);
  }
};
init();
