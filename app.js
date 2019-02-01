// global imports
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");

// Local imports
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const errorController = require("./controllers/error");
const User = require("./models/user");

// Global Variables
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = "mongodb+srv://user:user@cluster0-uyecl.mongodb.net/shop";
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions"
});
const csrfProtuction = csrf();

app.set("view engine", "ejs");
app.set("views", "views");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: "secrect key",
  resave: false,
  saveUninitialized: false,
  store: store
}));
app.use(csrfProtuction);
app.use(flash())

// User Check
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(result => {
    app.listen(PORT, () => {
      console.log(`Server Started at port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });