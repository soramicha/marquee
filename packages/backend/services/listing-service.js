import mongoose from "mongoose";
import Listing from "../models/listing-model.js"

export async function postListing(listing) {
    try {
        const listingToAdd = new Listing(listing);
        const savedListing = await listingToAdd.save();
        return { success: true, data: savedListing };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export async function getListing(id) {
    try {
        const objectId = new mongoose.Types.ObjectId(id);
        const listings = await Listing.find({ _id: `${objectId}`});

        if (listings.length === 0) {
            return { success: false, error: "No listings found" };
        }

        return { success: true, data: listings };
    } catch (error) {
        // This catch block will only handle actual errors like:
        // - Invalid ObjectID format
        // - Database connection issues
        // - etc.
        return { success: false, error: error.message };
    }
}