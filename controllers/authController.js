const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { findUserByEmail,createUser, findUserByEmail } = require("../model/User");



const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, "SECRET_KEY", { expiresIn: "1h" });

    res.json({ token, user_id: user.user_id, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const handleRegister = async (req, res) => {
    const { name, email, password, role = "guest" } = req.body;
  
    try {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const userCount = await pool.query("SELECT COUNT(*) FROM users");
      const user_id = `${role.substring(0, 2)}${parseInt(userCount.rows[0].count) + 1}`;
  
      const newUser = await createUser(name, email, hashedPassword, role, user_id);
  
      res.status(201).json({ message: "Registration successful.", user: newUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

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
