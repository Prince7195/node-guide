const express = require("express");
const { check, body } = require("express-validator/check");
const User = require("../models/user");

const { getLogin, postLogin, postLogout, getSignup, postSignup, getReset, postReset, getNewPassword, postNewPassword } = require("../controllers/auth");

const router = express.Router();

router.get("/login", getLogin);

router.get("/signup", getSignup);

router.get("/reset", getReset);

router.get("/reset/:token", getNewPassword);

router.post(
    "/login",
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email address.')
            .normalizeEmail(),
        body('password', 'Password has to be valid.')
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim()
    ],
    postLogin
);

router.post(
    "/signup",
    [
        check("email")
            .isEmail()
            .withMessage("Please enter valid E-Mail")
            .custom((value, { req }) => {
                // if (value === "test@test.com") {
                //     throw new Error("This email address is Forbidden");
                // }
                // return true;
                return User.findOne({ email: value })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject("E-Mail exists already. Please pick a different one.");
                        }
                    });
            })
            .normalizeEmail(),
        body("password", "Please enter a password with only numbers and text and atleast 5 characters")
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim(),
        body("confirmPassword")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Password have to match!");
                }
                return true;
            })
            .trim()
    ],
    postSignup);

router.post("/logout", postLogout);

router.post("/reset", postReset);

router.post("/new-password", postNewPassword);

module.exports = router;