// global imports
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// Local imports
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const { mongoConnect } = require("./util/database");
const User = require("./models/user");

// Global Variables
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "views");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  User.findById("5c44a942ff78890500165bf4")
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

// Routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`);
  });
});