import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { getUsers, addUser } from "./services/user-service.js";

//TODO: when not testing on localhost, set cookies' secure flags to true

async function setTokensAndRespond(res, username, id) {
  const access_token = await generateAccessToken(username, id);
  const refresh_token = await generateRefreshToken(username, id);

  if (access_token && refresh_token) {
    res.cookie('refreshToken', refresh_token, { httpOnly: true, secure: false, sameSite: 'lax', path: '/'});
    return res.status(201).send({ access_token });
  }
}

export async function loginUser(req, res) {
  const { username, password } = req.body; // from form
  const existingUser = await getUsers(username);
  if (!password) {
    return res.status(401).send("No password was given");
  }

  if (existingUser.length === 0) {
    // invalid username
    return res.status(401).send("Unauthorized");
  } else {
    bcrypt
      .compare(password, existingUser[0].password)
      .then(async (matched) => {
        if (matched) {
          const id = existingUser[0]._id.toString();
          return await setTokensAndRespond(res, username, id);
        } else {
          // invalid password
          return res.status(401).send("Unauthorized");
        }
      });
  }
}

export function logout(req, res) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false
  });
  return res.status(204).send("Logged out successfully");
};

// verifies the user JWT tokens
export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).send("Unauthorized: Invalid token format");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    
    if (decoded.type !== 'access') {
      return res.status(401).send("Unauthorized: Invalid token type");
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send("Unauthorized: Token expired");
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).send("Unauthorized: Invalid token");
    }
    return res.status(500).send("Internal Server Error");
  }
}

export async function registerUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Bad request: Invalid input data.");
  }

  if (password.length <= 5) {
    return res.status(400).send("Password must be longer than 5 characters");
  }

  try {
    // check if user already exists in db
    const existingUser = await getUsers(username);
    if (existingUser.length > 0) {
      return res.status(409).send("Username already taken");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (hashedPassword) {
      const result = await addUser({ username, password: hashedPassword });

      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }

      const id = result.data._id.toString();
      return await setTokensAndRespond(res, username, id);
    }
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).send("Internal server error");
  }
}

export function refreshUserTokens(req, res) {
  const refreshToken = req.cookies.refreshToken;
  
  if (!refreshToken) return res.status(401).send("No refresh token");
  
  const decodedPayload = jwt.decode(refreshToken);
  const id = decodedPayload.userID;
  const username = decodedPayload.username;
  if (!id || !username) {
    return res.status(401).send("Invalid refresh token payload");
  }

  jwt.verify(refreshToken, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(403).send("Error verifying refresh token");

    await setTokensAndRespond(res, username, id);
  });
}

function generateRefreshToken(username, id) {
  try {
    const token = jwt.sign(
      { 
        username: username,
        userID: id,
        type: "refresh",
      },
      process.env.TOKEN_SECRET, // key used to encrypt and decrypt token
      { expiresIn: "30d" } // token that will expire in 30 days
    );
    return token;
  } catch (error) {
    console.error(error);
  }
}

function generateAccessToken(username, id) {
  try {
    const token = jwt.sign(
      { 
        username: username,
        userID: id,
        type: "access",
      },
      process.env.TOKEN_SECRET, // key used to encrypt and decrypt token
      { expiresIn: "1d" } // token that will expire in a day
    );
    return token;
  } catch (error) {
    console.error(error);
  }
}