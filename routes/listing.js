//restructuring code and connected to app.js

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");// *enter proper address.
const {isLogged, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js"); //to make the code more modular and readable
const multer  = require('multer'); //used to access multipart forms, & parse them in to readble format 
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/") //combining routes receiving request in the same address for clarity 
    .get(wrapAsync(listingController.index)) //index route
    .post(isLogged ,//isOwner
    upload.single('listings[image]'),
    wrapAsync(listingController.postForm)); //Submitting new listing (POST).

    
 



router.get("/new", isLogged, listingController.newForm); //Create Route {must place above show route or shows error due to confusion in addreses}


router
    .route("/:id")
    .get( wrapAsync(listingController.showRoute))//Show Route
    .put(isLogged,
        isOwner,
        upload.single('listings[image]'),
        wrapAsync(listingController.updateRoute))//Update route
    .delete(isLogged, wrapAsync(listingController.destroyRoute));//Destroy Route



router.get("/:id/edit", isLogged, listingController.editRoute);//Edit Route

module.exports = router;

