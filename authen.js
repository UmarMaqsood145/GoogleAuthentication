const passport = require('passport'); 
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '405301759025-4e1he3qj8boi9et5dig2k0an1o6tusc0.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});