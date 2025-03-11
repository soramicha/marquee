import UserModel from "../models/user-model.js";

export async function getUsers(req, res) {
  try {
    const users = await getUsersFromDB(req.body.username);
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
        promise = await UserModel.find({ username: `${username}`});
    }
    return promise;
  } catch (error) {
    throw error;
  }
}

export async function findUserById(id) {
  try {
    return await UserModel.findById(id);
  } catch (error) {
    console.error(error);
    throw error;
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

// jessica code here
export async function addFavorite(username, listing_id) {
  try {
    // retrieve user from database if length of array is
    const user = await UserModel.findOne({ username });
    // if user not found
    if (!user) {
      return { success: false, error: "User not found" };
    }
    // add listing_id inside favorites array
    user.favorites.push(listing_id);
    // push to database
    await user.save();

  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function removeFavorite(username, listing) {
  try {
    // retrieve user from database if length of array is
    const user = await UserModel.findOne({ username });
    // if user not found
    if (!user) {
      return { success: false, error: "User not found" };
    }
    // remove listing_id from favorites array
    user.favorites = user.favorites.filter(id => id.toString() !== listing_id);
    // push to database
    await user.save();

  } catch (error) {
    return { success: false, error: error.message };
  }
}