const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req, res) => {
    let {id} = req.params;
    let lisitng = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    lisitng.reviews.push(newReview);

    await newReview.save();
    await lisitng.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteReview = async (req, res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
}