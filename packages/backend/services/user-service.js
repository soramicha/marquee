import UserModel from "../models/user-model.js";
import Listing from "../models/listing-model.js";

export async function getUsers(req, res) {
    try {
        let users;
        if (req.query.username) {
            users = await getUsersFromDB(req.query.username);
        } else {
            console.log("username", req.body.username);
            users = await getUsersFromDB(req.body.username);
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
}

export async function deleteUser(req, res) {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }
        const result = await UserModel.deleteOne({ username });
        if (result.deletedCount === 0) {
            res.status(404).json({ error: "User not found" });
        }

        res.sendStatus(204); // successful delete
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function getUsersFromDB(username) {
    try {
        let promise;
        if (username == undefined) {
            // get all users
            promise = await UserModel.find();
        } else {
            // get requested user
            promise = await UserModel.find({ username: `${username}` });
        }
        return promise;
    } catch (error) {
        throw error;
    }
}

// used to just be "id" as parameter
export async function findUserById(req, res) {
    try {
        const user = await UserModel.findById(req.query.id.toString());
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// finds multiple users passed in as array
export async function findUsersById(req, res) {
    const { ids } = req.query;

    if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const users = await UserModel.find({ 
            _id: { $in: ids }
        });

        if (!users.length) {
            return res.status(404).json({ error: "No users found" });
        }

        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// user is a javascript object
export async function addUser(user) {
    try {
        const userToAdd = new UserModel(user);
        const savedUser = await userToAdd.save();
        return { success: true, data: savedUser };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function addFavorite(req, res) {
    try {
        const username = req.query.username;
        const listing_id = req.query.listing_id;

        if (!username) {
            return res.status(400).json({
                success: false,
                error: "Username is required",
            });
        }

        if (!listing_id) {
            return res.status(400).json({
                success: false,
                error: "Listing ID is required",
            });
        }

        const user = await UserModel.findOne({ username });
        if (!user) {
            return { success: false, error: "User not found" };
        }
        // add listing_id inside favorites array
        user.favorites.push(listing_id);
        await user.save();
        console.log("Successfully added listing id to favorites");

        return res.status(200).json({
            success: true,
            message: "Successfully added listing id to favorites",
        });
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function removeFavorite(req, res) {
    try {
        const { username, listing_id } = req.query;

        if (!username) {
            return res.status(400).json({
                success: false,
                error: "Username is required",
            });
        }

        if (!listing_id) {
            return res.status(400).json({
                success: false,
                error: "Listing ID is required",
            });
        }

        // retrieve user from database
        const user = await UserModel.findOne({ username });

        // if user not found
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found",
            });
        }

        // remove listing_id from favorites array
        user.favorites = user.favorites.filter(
            (id) => id.toString() !== listing_id
        );
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Successfully removed listing from favorites",
        });
    } catch (error) {
        console.error("Error removing favorite:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to remove favorite",
        });
    }
}

// ADDED: Function to fetch listings for a specific user with permission check.
export async function getUserListings(req, res) {
    try {
        // TODO: edit to req.params
        // TODO: params is used for identifiers, and query is used for optional, sorting, etc
        const id = req.user.userID;
        const listings = await Listing.find({
            user: id,
            status: true,
        }).sort({ createdAt: -1 });

        if (listings.length === 0) {
            return res.status(404).json({ error: "No listings found" });
        }

        return res.status(200).json({ success: true, data: listings });
    } catch (error) {
        console.error("Error fetching listings for user:", error);
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}
