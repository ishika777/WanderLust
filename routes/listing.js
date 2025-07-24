const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const multer  = require('multer')
const {storage} = require("../cloudConfig.js");

const upload = multer({storage});


router.route("/") 
//index route
.get(wrapAsync(listingController.index))                                                 
//create route
.post(isLoggedIn,                                                                       
    upload.single("listing[image]"),  
    validateListing, 
    wrapAsync(listingController.createListing));

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);                


router.route("/:id") 
//show route
.get(wrapAsync(listingController.showLisitng))                                            
//update route
.put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
//delete route
.delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteLisitng));                 
 

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));   


module.exports = router;
