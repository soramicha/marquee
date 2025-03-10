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
      // TODO: AWS S3 to store photos/videos?
      type: [String],
      required: true,
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

// Service function to get listings by a specific user.
export async function getListingsByUser(req, res) {
  try {
    const { userId } = req.params;
    // Convert the string userId to a MongoDB ObjectId
    const objectId = new mongoose.Types.ObjectId(userId);

    // Find listings where 'user' equals objectId and status is true (active)
    const listings = await Listing.find({
      user: objectId,
      status: true,
    })
      // Select only the fields we need
      .select("name description price photos status createdAt")
      .sort({ createdAt: -1 }); // Sort by most recent first

    if (!listings || listings.length === 0) {
      return res.status(404).json({ success: false, error: "No listings found" });
    }

    return res.status(200).json({ success: true, data: listings });
  } catch (error) {
    console.error("Error fetching listings for user:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
