const path = require("path");
const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");
const { getAddProducts, postAddProducts, getProducts, getEditProduct, postEditProduct, postDeleteProduct } = adminController;

// /admin/products - GET
router.get("/products", getProducts);

// /admin/add-product - GET
router.get("/add-product", getAddProducts);

// /admin/add-product - POST,
router.post("/add-product", postAddProducts);

router.get("/edit-product/:productId", getEditProduct);

router.post("/edit-product", postEditProduct);

router.post("/delete-product", postDeleteProduct);

module.exports = router;
