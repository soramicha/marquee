import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/.test(value);
        },
        message: "Username must be a valid .edu email address."
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    listings: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Listings"
    },
    favorites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Listings"
    }
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

export default User;