import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { registerUser, authenticateUser, loginUser, logout, refreshUserTokens } from "./auth.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose"
import { deleteUser, getUsers } from "./services/user-service.js";
import { deleteListing, getListing, postListing, updateListing } from "./services/listing-service.js";
import { initializeApp } from 'firebase-admin/app';
import admin from 'firebase-admin';
import serviceAccount from './marquee-7b1a9-firebase-adminsdk-fbsvc-e1820b4288.json' assert { type: 'json' };

dotenv.config();

// Firebase initialization
initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

// TODO: impleent IP whitelisting(?)
//TODO: edit origin link 
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.post('/api/signup', registerUser);
app.post('/api/login', loginUser);
app.get('/api/logout', logout);
app.get('/api/refresh', refreshUserTokens);
app.get('/api/users', getUsers);
app.delete('/api/users', authenticateUser, deleteUser);
// TODO: make a function that verifies the appropriate user with the tokens 
// TODO: that is making these API calls
// TODO: since we don't want other people deleting others/posting for others
// TODO: i.e. decoding jwt token and extracting id and comparing both ids from the req and token
app.post("/api/listing", authenticateUser, postListing);
app.get("/api/listing", getListing);
app.delete('/api/listing', authenticateUser, deleteListing);
app.patch('/api/listing', authenticateUser, updateListing);

app.get('/api/get-firebase-token', authenticateUser, async (req, res) => {
  try {
    const firebaseToken = await admin.auth().createCustomToken(req.user.userID.toString());
    res.json({ firebaseToken });
  } catch (error) {
    console.error('Error creating custom token:', error);
    res.status(500).send('Server error');
  }
});


app.get("/api/protected", authenticateUser, (req, res) => {
    // this code will only run if authenticateUser calls next()
    res.status(201).send("Access token verified!");
});

app.listen(port, () => {
    console.log(
      `Example app listening at http://localhost:${port}`
    )
});