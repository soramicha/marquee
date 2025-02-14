import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const creds = [];

export function loginUser(req, res) {
  const { username, pwd } = req.body; // from form
  const retrievedUser = creds.find(
    (c) => c.username === username
  );

  if (!retrievedUser) {
    // invalid username
    res.status(401).send("Unauthorized");
  } else {
    bcrypt
      .compare(pwd, retrievedUser.hashedPassword)
      .then((matched) => {
        if (matched) {
          generateAccessToken(username).then((token) => {
            res.status(200).send({ token: token });
          });
        } else {
          // invalid password
          res.status(401).send("Unauthorized");
        }
      })
      .catch(() => {
        res.status(401).send("Unauthorized");
      });
  }
}

// verifies the user JWT tokens
export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  // Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (error, decoded) => {
        if (decoded) {
          next();
        } else {
          console.log("JWT error:", error);
          res.status(401).end();
        }
      }
    );
  }
}

export function registerUser(req, res) {
  console.log("registerUser on backend called", req.body)
  // TODO: make user input fields more secure?(character minimum, symbols, etc)
  const { username, pwd } = req.body; // from form
  console.log(username, pwd)
  // if either username or password doesn't exist
  if (!username || !pwd) {
    // then send status of 400 meaning bad request
    res.status(400).send("Bad request: Invalid input data.");
  }
  // if the username was already taken
  else if (creds.find((c) => c.username === username)) {
    // then send status of 409
    res.status(409).send("Username already taken");
  } else {
    // encrypt the password
    bcrypt
      .genSalt(10) // generate the salt
      .then((salt) => bcrypt.hash(pwd, salt)) // hash the password with the salt
      .then((hashedPassword) => {
        // create a token to send to frontend
        generateAccessToken(username).then((token) => {
          console.log("Token:", token);
          res.status(201).send({ token: token });
          // store it temporarily in the array of creds for now
          creds.push({ username, hashedPassword });
        });
      });
  }
}

function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET, // key used to encrypt and decrypt token
      { expiresIn: "1d" }, // token that will expire in a day
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}