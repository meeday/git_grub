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
    async (accessToken, refreshToken, profile, done) => {
      try {
        const newUser = {
          id: await uuid.v4(),
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          surname: profile.name.familyName,
          avatar: profile.photos[0].value,
        };
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
