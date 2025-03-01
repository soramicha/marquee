import UserModel from "../models/user-model.js";

export async function getUsers(username) {
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

export async function findUserByName(name) {
  try {
    return await UserModel.find({ name: name });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function findUserByJob(job) {
  try {
    return await UserModel.find({ job: job });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(username) {
  try {
    const user = await findUserByName(username);

  } catch (error) {
    console.error(error);
    throw error;
  }
}