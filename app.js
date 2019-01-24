// global imports
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Local imports
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
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
  User.findById("5c49f39f059b4e06e072aa85")
    .then(user => {
      req.user = user;
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

mongoose.connect("mongodb+srv://user:user@cluster0-uyecl.mongodb.net/shop?retryWrites=true", { useNewUrlParser: true })
  .then(result => {
    User.findOne()
      .then(user => {
        if (!user) {
          const user = new User({
            name: "Vijay",
            email: "vijay@sample.com",
            cart: {
              items: []
            }
          });
          user.save();
        }
      });

    app.listen(PORT, () => {
      console.log(`Server Started at port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });