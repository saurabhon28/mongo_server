import mongoose from "mongoose";
import listingAndReviewsSchema from "../schemas/listingsAndReviews.js";

const ListingsAndReview = mongoose.model("ListingAndReview", listingAndReviewsSchema);

export default ListingsAndReview;