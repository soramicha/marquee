import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
    registerUser,
    authenticateUser,
    loginUser,
    logout,
    refreshUserTokens,
} from "./auth.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose"
import { addFavorite, deleteUser, getUsers, removeFavorite, findUserById } from "./services/user-service.js";

import userModel from "./models/user-model.js";
import {
    deleteListing,
    getListing,
    postListing,
    updateListing,
} from "./services/listing-service.js";
import {
    getEmail,
    postEmail,
    updateReadStatus,
    addReplytoEmail,
} from "./services/email-service.js";

dotenv.config();

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

mongoose.set("debug", true);
mongoose
    .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
    .catch((error) => console.log(error));

const app = express();
const port = 8000;

//TODO: edit origin link
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
app.get("/findUser", findUserById);
app.delete("/users", authenticateUser, deleteUser);
// TODO: make a function that verifies the appropriate user with the tokens
// TODO: that is making these API calls
// TODO: since we don't want other people deleting others/posting for others
// TODO: i.e. decoding jwt token and extracting id and comparing both ids from the req and token
app.post("/listing", authenticateUser, postListing);
app.get("/listing", getListing);
app.delete("/listing", authenticateUser, deleteListing);
app.patch("/listing", authenticateUser, updateListing);

// email service
app.post("/email", authenticateUser, postEmail);
app.get("/email", authenticateUser, getEmail);
app.patch("/email", authenticateUser, updateReadStatus);
app.post("/email/reply", authenticateUser, addReplytoEmail);

app.patch('/addfav', authenticateUser, addFavorite)
app.patch('/remfav', authenticateUser, removeFavorite)

app.get("/protected", authenticateUser, (req, res) => {
    // this code will only run if authenticateUser calls next()
    res.status(201).send("Access token verified!");
});

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
