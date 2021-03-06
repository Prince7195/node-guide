const express = require("express");
const { body } = require("express-validator/check");

const router = express.Router();

const isAuth = require("../middleware/is-auth");
const adminController = require("../controllers/admin");
const { getAddProducts, postAddProducts, getProducts, getEditProduct, postEditProduct, postDeleteProduct } = adminController;

// /admin/products - GET
router.get("/products", isAuth, getProducts);

// /admin/add-product - GET
router.get("/add-product", isAuth, getAddProducts);

// /admin/add-product - POST,
router.post(
    "/add-product",
    [
        body("title")
            .isAlphanumeric()
            .isLength({ min: 3 })
            .trim(),
        body("imageUrl")
            .isURL(),
        body("price")
            .isFloat(),
        body("description")
            .isLength({ min: 5 })
            .trim()
    ],
    isAuth,
    postAddProducts
);

router.get("/edit-product/:productId", isAuth, getEditProduct);

router.post(
    "/edit-product",
    [
        body("title")
            .isString()
            .isLength({ min: 3 })
            .trim(),
        body("imageUrl")
            .isURL(),
        body("price")
            .isFloat(),
        body("description")
            .isLength({ min: 5 })
            .trim()
    ],
    isAuth,
    postEditProduct
);

router.post("/delete-product", isAuth, postDeleteProduct);

module.exports = router;
