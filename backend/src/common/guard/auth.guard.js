import jwt from "jsonwebtoken";
import getConfig from "../config/config.service.js";
import { findUserByEmail } from "../../core/user/user.service.js";

export async function authGuard(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Kalit berilmagan");
  }

  try {
    const result = jwt.verify(token, getConfig("JWT_ACCCES_SECRET"));
    req.user = await findUserByEmail(result.email);
    next();
  } catch (err) {
    res.status(403).send("Berilgan kalit hato:" + err.message);
  }
}
