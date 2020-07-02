const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const cookieSession = require('cookie-session');
const path = require('path');
const authRoutes = require('./routes/auth-routes');

const config = require('./config/config');
const db = require('./config/db');
const lib = require('./lib');

// Passport config
// require('./config/passport');

// api routes needed

const app = express();

// Set static files
app.use(express.static(path.join(__dirname, 'public')));

// MW - parsing data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth routes


app.use('/auth', authRoutes);

app.use('/', (req, res) => {
  res.render('index');
});

// Express-session

app.use(session({
  secret: 'get_grub',
  resave: false,
  saveUninitialized: false,
}));

// Cookie Session
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [config.cookie.key],
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// lib authentication

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
