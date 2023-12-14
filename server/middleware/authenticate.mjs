import admin from "../config/firebase-config.js";
import ApiError from "../model/ApiError.mjs";

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      return next();
    } else {
      return res.sendStatus(403).json(new ApiError("au-403"));
    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
}

export { authenticateToken };
