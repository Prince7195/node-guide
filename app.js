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
const { get404 } = require("./controllers/error");
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
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// User Check
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});

// Routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(get404);

app.use((err, req, res, next) => {
  res.status(500).render("500", { pageTitle: "Internal Server Error", path: "/500" });
});

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(result => {
    app.listen(PORT, () => {
      console.log(`Server Started at port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });