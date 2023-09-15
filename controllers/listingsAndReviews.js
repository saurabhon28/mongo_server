import ListingsAndReview from "../models/listingsAndReviews.js";
import ListingAndReview from "../models/listingsAndReviews.js";
import { client } from "../index.js";

const getListingsAndReviews = async (req, res) => {
  console.log("request incoming");
  const { page } = req.query;
  let data;
  let hasNextPage = false;
  const totalCount = await ListingAndReview.count();

  if (page) {
    if (page * 10 < totalCount) hasNextPage = true;

    if (await client.get(`listingAndReviews?page=${page}`)) {
      console.log("cache hit");
      return res.send({ 
        data: JSON.parse(await client.get(`listingAndReviews?page=${page}`)), 
        totalCount, 
        count: JSON.parse(await client.get(`listingAndReviews?page=${page}`)).length, 
        hasNextPage });
    }
    console.log("cache miss");
    data = await ListingAndReview.find()
      .skip((page - 1) * 10)
      .limit(10);
    await client.setEx(`listingAndReviews?page=${page}`, 15, JSON.stringify(data));
    return res.send({ data, totalCount, count: data.length, hasNextPage });
  }
  data = await ListingAndReview.find().limit(10);
  await client.setEx(`listingAndReviews`, 15, JSON.stringify(data));
  return res.send({ data, totalCount, count: 10, hasNextPage });
};

const createListingsAndReviews = async (req, res) => {
  return res.send(await ListingAndReview.create(req.body));
};

export { getListingsAndReviews, createListingsAndReviews };
