import mongoose from "mongoose";

const listingSchema = mongoose.Schema({
    price: {
        type : "string",
        required: [true , "Please provide the price per night "],
    },
    name: {
        type: "string",
        required: [true, "Plsese provide a name"] ,
    },
    description: {
        type: "string",
        required: false,
    },
    currency: {
        type: "string",
        anum: ["USD", "INR", "EUR", "GBP"],
        required: true,
    }
});

export default listingSchema;