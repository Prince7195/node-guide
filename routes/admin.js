const path = require("path");
const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");
const { getAddProducts, postAddProducts, getProducts } = adminController;

// /admin/add-product - GET
router.get("/add-product", getAddProducts);

// /admin/add-product - POST
router.post("/add-product", postAddProducts);

// /admin/products - GET
router.get("/products", getProducts);

module.exports = router;
