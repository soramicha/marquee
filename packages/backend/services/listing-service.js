import mongoose from "mongoose";
import Listing from "../models/listing-model.js";

export async function postListing(req, res) {
    try {
        // Required fields
        // TODO: add photos for required field after testing
        const requiredFields = [
            "name",
            "price",
            "category",
            "description",
            "location",
            "condition",
        ];
        const missingFields = requiredFields.filter(
            (field) => !req.body[field]
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `Missing required fields: ${missingFields.join(", ")}`,
            });
        }

        const result = await postListingToDB({
            ...req.body,
            status: true,
            user: req.user.userID,
        });

        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }

        res.status(201).json(result.data);
    } catch (error) {
        console.error("Error creating listing:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function postListingToDB(listing) {
    try {
        const listingToAdd = new Listing(listing);
        const savedListing = await listingToAdd.save();
        return { success: true, data: savedListing };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getListing(req, res) {
    try {
        const id = req.query.id.toString();
        const result = await getListingFromDB(id);

        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching listing", error });
    }
}

async function getListingFromDB(id) {
    try {
        const objectID = new mongoose.Types.ObjectId(id);
        const listing = await Listing.find({ _id: objectID });

        if (listing.length === 0) {
            return { success: false, error: "No listing found" };
        }

        return { success: true, data: listing };
    } catch (error) {
        // This catch block will only handle actual errors like:
        // - Invalid ObjectID format
        // - Database connection issues
        // - etc.
        return { success: false, error: error.message };
    }
}

export async function deleteListing(req, res) {
    try {
        const id = req.query.id.toString();
        const result = await deleteListingFromDB(id);

        if (!result.success) {
            return res.status(404).json({ error: result.error });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting listing: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function deleteListingFromDB(id) {
    try {
        const objectID = new mongoose.Types.ObjectId(id);
        const result = await Listing.deleteOne({ _id: objectID });

        if (result.deletedCount === 0) {
            return { success: false, error: "No listing found" };
        }

        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// NOTE: fields that are not included in the request will not be modified
// if you want to delete a photo/video, for example, you will have to pass in a new/empty array
export async function updateListing(req, res) {
    try {
        const id = req.query.id.toString();
        const fieldsToUpdate = req.body;
        const result = await updateListingFromDB(id, fieldsToUpdate);

        if (!result.success) {
            return res.status(404).json({ error: result.error });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateListingFromDB(id, fieldsToUpdate) {
    try {
        const objectID = new mongoose.Types.ObjectId(id);
        const result = await Listing.findByIdAndUpdate(
            objectID,
            fieldsToUpdate, // fieldsToUpdate must be an object
            { new: true } // returns the modified document rather than the original
        );

        if (!result) {
            return { success: false, error: "No listing found" };
        }

        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
