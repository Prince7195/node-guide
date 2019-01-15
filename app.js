// global imports
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// Local imports
const adminData = require("./routes/admin");
const shopRoute = require("./routes/shop");

// Global Variables
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "views");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/admin", adminData.routes);
app.use(shopRoute);

app.use((req, res, next) => {
  res.render("404", { pageTitle: "Page Not Found", path: "" });
});

// Server listening
app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`);
});
