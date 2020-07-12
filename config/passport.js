const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const uuid = require('uuid');
const User = require('../models/User');
require('dotenv').config();

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const returnedUser = await User.findByPk(id);
    done(null, returnedUser);
  } catch (err) {
    done(err, null);
  }
});

// Setup of Google Strategy
passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/redirect',
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    // Callback function when a user logs in through Google OAuth
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Create a new object using data from the Google profile object
        const newUser = {
          id: await uuid.v4(),
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          surname: profile.name.familyName,
          avatar: profile.photos[0].value,
        };
        // Search the Users table to identify if Google ID already exists. If the Google ID does not exist, create a new user in the DB
        let user = await User.findOne({
          where: { googleId: profile.id },
        });
        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error('ERROR - passport.js - GoogleStrategy', err);
      }
    },
  ),
);
