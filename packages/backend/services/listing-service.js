// src/services/listing-service.js
import mongoose from "mongoose";
import Listing from "../models/listing-model.js";

// ADDED: Function to fetch listings for a specific user with permission check.
export async function getListingsByUser(req, res) {
  try {
    const { userId } = req.query;
    // ADDED: Check that the requesting user is the same as the one in the token.
    if (req.user.userID != userId) {
      return res.status(403).json({ success: false, error: "Access forbidden" });
    }

    const objectId = new mongoose.Types.ObjectId(userId);
    const listings = await Listing.find({
      user: objectId,
      status: true,
    })
      // ADDED: Include additional fields required by the front end (location, tags).
      .select("name description price photos status createdAt location tags")
      .sort({ createdAt: -1 });

    if (!listings || listings.length === 0) {
      return res.status(404).json({ success: false, error: "No listings found" });
    }

    return res.status(200).json({ success: true, data: listings });
  } catch (error) {
    console.error("Error fetching listings for user:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

// ADDED: Include other listing-related functions here if needed.
