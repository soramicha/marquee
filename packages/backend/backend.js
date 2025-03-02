import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { registerUser, authenticateUser, loginUser, logout, refreshUserTokens } from "./auth.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose"
import { getUsers } from "./services/user-service.js";
import userModel from "./models/user-model.js";
import { getListing, postListing } from "./services/listing-service.js";

dotenv.config();

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

//TODO: edit origin link 
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.post('/signup', registerUser);
app.post('/login', loginUser);
app.get('/logout', logout);
app.get('/refresh', refreshUserTokens);
app.get('/users', async (req, res) => {
  try {
    const users = await getUsers(req.body.username);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});
app.delete('/users', async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
    const result = await userModel.deleteOne({ username });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: "User not found" });
    }

    res.sendStatus(204); // successful delete
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/post", authenticateUser, async (req, res) => {
  try {
    // Required fields
    // TODO: add photos for required field after testing
    const requiredFields = ['name', 'price', 'category', 'description', 'location', 'condition'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }

    const result = await postListing({
      ...req.body,
      status: true,
      user: req.user.userID
    });

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    res.status(201).json(result.data);
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/post", async (req, res) => {
  try {
    const id = req.query.id.toString();
    const listing = await getListing(id);
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listing", error });
  }
});

app.get("/protected", authenticateUser, (req, res) => {
    // this code will only run if authenticateUser calls next()
    res.status(201).send("Access token verified!");
});

app.listen(port, () => {
    console.log(
      `Example app listening at http://localhost:${port}`
    );
});