const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router
    .route("/signup")
    .get( userController.renderSignUp) //SignUp
    .post( wrapAsync(userController.signUp));


router
    .route("/login")
    .get(userController.renderLogin)
    .post(
    saveRedirectUrl,
    passport.authenticate("local", //middleware by passport for authenticating local-strategy
    {
        failureRedirect:"/login", //what to do if authentication fails
        failureFlash:true //we want a flash message on failure 
    }), 
    userController.login);

router.get("/logout",userController.logout);



module.exports = router;