const path = require("path");
const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");
const { getProducts, getIndex, getCart, getCheckout, getOrders } = shopController;

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/cart", getCart);

router.get("/orders", getOrders);

router.get("/checkout", getCheckout);

module.exports = router;
