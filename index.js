import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./db.js";
import listingRoutes from "./routes/listings.js";
import listingAndReviewRoutes from "./routes/listingsAndReviews.js";
import rateLimit from 'express-rate-limit';
import { createClient } from "redis";

const limiter = rateLimit({
	windowMs: 10000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
})


dotenv.config();
connectDB();



const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

export { client };


const app = express();
const port = 3000;
app.use(bodyParser.json());

// Apply the rate limiting middleware to all requests
// app.use(limiter);
app.get("/test", (req, res) =>{
    res.send("hello");
})

app.use("/listings", limiter, listingRoutes);
app.use("/listingsAndReviews", listingAndReviewRoutes);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})