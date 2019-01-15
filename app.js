// global imports
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// Local imports
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

// Global Variables
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "views");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Server listening
app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`);
});
