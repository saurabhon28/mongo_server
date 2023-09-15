import Listing from "../models/listings.js";

const getListings = async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  // const allListings = await Listing.find();
  // if(minPrice && maxPrice){
  //   return res.send(allListings.filter((listing) =>listing.price > minPrice && listing.price <= maxPrice))
  // }
  // if(minPrice){
  //   return res.send(allListings.filter((listing) => listing.price > minPrice))
  // }
  // if(maxPrice){
  //   return res.send(allListings.filter((listing) => listing.price <= maxPrice))
  // }
  if ((minPrice, maxPrice)) {
    return res.send(
      await Listing.find({
        $and: [{ price: { $gt: minPrice } }, { price: { $lte: maxPrice } }],
      })
    );
  }
  if (minPrice) {
    return res.send(await Listing.find({ price: { $gt: minPrice } }));
  }
  if (maxPrice) {
    return res.send(await Listing.find({ price: { $lte: maxPrice } }));
  }
  return res.send(await Listing.find());
};

const getListingById = async (req, res) => {
  console.log(req.params);
  return res.send(await Listing.findById(req.params.id));
};

const createListings = async (req, res) => {
  const newListing = await Listing.create(req.body);
  return res.send({
    id: newListing._id,
    created: true,
  });
};

const replaceListing = async (req, res) => {
  try {
    const replacedListing = await Listing.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { returnDocument: "after" }
    );
    return res.send(replacedListing);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateListing = async (req, res) => {
  try {
    const updatedListing = await Listing.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { returnDocument: "after" }
    );
    return res.send(updatedListing);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteListing = async (req, res) => {
 await Listing.findOneAndDelete({_id: req.params.id});
 return res.status(204);
};


export { getListings, createListings, getListingById, replaceListing, updateListing, deleteListing };
