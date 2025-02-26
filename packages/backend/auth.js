import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// TODO: move this logic to DB
//TODO: when not testing on localhost, set cookies' secure flags to true

const creds = [];
const refreshTokens = new Map();

async function setTokensAndRespond(res, username, hashedPassword = null) {
  const access_token = await generateAccessToken(username);
  const refresh_token = await generateRefreshToken(username);

  if (access_token && refresh_token) {
    console.log("Access Token:", access_token);
    console.log("Refresh Token:", refresh_token);
    res.cookie('refreshToken', refresh_token, { httpOnly: true, secure: false, sameSite: 'lax', path: '/'});
    res.status(201).send({ access_token });

    if (hashedPassword) {
      creds.push({ username, hashedPassword });
    }
    refreshTokens.set(username, refresh_token);
  }
}

export function loginUser(req, res) {
  const { username, password } = req.body; // from form
  const retrievedUser = creds.find(
    (c) => c.username === username
  );

  if (!retrievedUser) {
    // invalid username
    res.status(401).send("Unauthorized");
  } else {
    bcrypt
      .compare(password, retrievedUser.hashedPassword)
      .then(async (matched) => {
        if (matched) {
          await setTokensAndRespond(res, username);
        } else {
          // invalid password
          res.status(401).send("Unauthorized");
        }
      });
  }
}

export function logout(req, res) {
  const username = req.body.username;
  refreshTokens.delete(username);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false
  });
  res.status(204).send("Logged out successfully");
};

// verifies the user JWT tokens
export function authenticateUser(req, res, next) {
  const authHeader = req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("authenticateUser authHeader:", authHeader);
  console.log("authenticateUser Token:", token);

  if (!token) {
    console.log("No token received");
    return res.status(401).send("Unauthorized: No token received");
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
    if (error) {
      console.log("JWT error:", error);
      return res.status(401).send("Unauthorized: Invalid token");
    }

    req.user = decoded; // Optionally, attach the decoded user info to the request object
    next();
  });
}

export function registerUser(req, res) {
  // TODO: make user input fields more secure?(character minimum, symbols, etc)
  const { username, password } = req.body; // from form
  console.log("username:", username, "password:", password)
  if (!username || !password) {
    res.status(400).send("Bad request: Invalid input data.");
  }
  else if (creds.find((c) => c.username === username)) {
    res.status(409).send("Username already taken");
  } else {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt)) 
      .then(async (hashedPassword) => {
        await setTokensAndRespond(res, username, hashedPassword);
      });
  }
}

export function refreshUserTokens(req, res) {
  const refreshToken = req.cookies.refreshToken;
  
  if (!refreshToken) return res.status(401).send("No refresh token");

  // Find the username associated with the refresh token
  const username = Array.from(refreshTokens.keys()).find(key => refreshTokens.get(key) === refreshToken);

  if (!username) return res.status(403).send("Refresh token doesn't exist in backend");

  jwt.verify(refreshToken, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(403).send("Error verifying refresh token");

    await setTokensAndRespond(res, username);
  });
}

async function generateRefreshToken(username) {
  try {
    const token = await jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET, // key used to encrypt and decrypt token
      { expiresIn: "30d" } // token that will expire in 30 days
    );
    return token;
  } catch (error) {
    console.error(error);
  }
}

async function generateAccessToken(username) {
  try {
    const token = await jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET, // key used to encrypt and decrypt token
      { expiresIn: "1d" } // token that will expire in a day
    );
    return token;
  } catch (error) {
    console.error(error);
  }
}