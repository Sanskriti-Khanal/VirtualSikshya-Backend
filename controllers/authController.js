const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//Google Login
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ where: { email: profile.emails[0].value } });

      if (!user) {
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          role: "guest",
          user_id: `guest${Date.now()}`,
          password: null, // No password for social login
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

//Facebook

const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ["id", "displayName", "emails"]
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ where: { email: profile.emails[0].value } });

      if (!user) {
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          role: "guest",
          user_id: `guest${Date.now()}`,
          password: null, // No password for social login
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

//Linkedin
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "/auth/linkedin/callback",
    scope: ["r_emailaddress", "r_liteprofile"]
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ where: { email: profile.emails[0].value } });

      if (!user) {
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          role: "guest",
          user_id: `guest${Date.now()}`,
          password: null, // No password for social login
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));
