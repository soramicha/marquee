import mongoose from "mongoose";

// FIELDS:
// STATUS(required)
// NAME(required)
// PRICE(required)
// CATEGORY(required)
// DESCRIPTION(required)
// PHOTOS(required)
// VIDEOS
// TAGS
// LOCATION(required)
// CONDITION(required)
// USER/SELLER(required)

// Define the Listing schema
const ListingSchema = new mongoose.Schema(
  {
    // for sale/sold
    status: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    // apparell, electronics, free stuff, etc..
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    photos: {
      // array of URLs
      type: [String],
    },
    videos: {
      type: [String],
    },
    tags: {
      type: Array,
    },
    location: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    // reference to user ObjectID
    user: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  {
    collection: "listings",
    timestamps: true,
  }
);

// Declare the Listing model only once.
const Listing = mongoose.model("Listings", ListingSchema);

export default Listing;
