const path = require("path");
const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/is-auth");
const adminController = require("../controllers/admin");
const { getAddProducts, postAddProducts, getProducts, getEditProduct, postEditProduct, postDeleteProduct } = adminController;

// /admin/products - GET
router.get("/products", isAuth, getProducts);

// /admin/add-product - GET
router.get("/add-product", isAuth, getAddProducts);

// /admin/add-product - POST,
router.post("/add-product", isAuth, postAddProducts);

router.get("/edit-product/:productId", isAuth, getEditProduct);

router.post("/edit-product", isAuth, postEditProduct);

router.post("/delete-product", isAuth, postDeleteProduct);

module.exports = router;
