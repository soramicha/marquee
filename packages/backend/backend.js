import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { registerUser, authenticateUser, loginUser } from "./auth.js";

dotenv.config();

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.post('/register', registerUser);
app.post('/login', loginUser);

app.post("/users", authenticateUser, (req, res) => {
    const userToAdd = req.body;
    Users.addUser(userToAdd).then((result) =>
      res.status(201).send(result)
    );
});

app.listen(port, () => {
    console.log(
      `Example app listening at http://localhost:${port}`
    );
});