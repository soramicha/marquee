import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { registerUser, authenticateUser, loginUser, logout, refreshUserTokens } from "./auth.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose"
import { getUsers } from "./services/user-service.js";
import userModel from "./models/user-model.js";

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


app.get("/protected", authenticateUser, (req, res) => {
    // this code will only run if authenticateUser calls next()
    res.status(201).send("Access token verified!");
});

app.listen(port, () => {
    console.log(
      `Example app listening at http://localhost:${port}`
    );
});