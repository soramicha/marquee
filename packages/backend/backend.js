import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { registerUser, authenticateUser, loginUser, logout, refreshUserTokens } from "./auth.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { deleteUser, getUsers } from "./services/user-service.js";
// UPDATED: Import only the exported function that exists.
import { getListingsByUser } from "./services/listing-service.js";

dotenv.config();

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.post("/signup", registerUser);
app.post("/login", loginUser);
app.get("/logout", logout);
app.get("/refresh", refreshUserTokens);
app.get("/users", getUsers);
app.delete("/users", authenticateUser, deleteUser);
// TODO: make a function that verifies the appropriate user with the tokens 
// TODO: that is making these API calls
// TODO: since we don't want other people deleting others/posting for others
// TODO: i.e. decoding jwt token and extracting id and comparing both ids from the req and token

// UPDATED: Secure the route for fetching a user's listings using the existing getListingsByUser.
app.get("/api/listings/user", authenticateUser, getListingsByUser);

app.get("/protected", authenticateUser, (req, res) => {
      // this code will only run if authenticateUser calls next()
  res.status(201).send("Access token verified!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
