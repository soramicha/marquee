import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: function(value) {
            // ___@__.edu
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/.test(value);
        },
        message: "Username must end with '.edu'."
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 5)
          throw new Error("Invalid password, must be at least 5 characters.");
      },
    },
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

export default User;