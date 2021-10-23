import * as jwt from "jsonwebtoken";
import express from "express";
import { readData } from "../services/Firestore";
import FirestoreCollections from "../types/FirestoreCollections";
import {
  createUserWithEmailAndPassword,
  getAccessToken,
  getRefreshToken,
  loginWithEmailAndPassword,
  revokeRefreshToken,
} from "../utils/AuthUtils";
import User from "../types/User";

const router = express.Router();

router.get("/", (_, res) => {
  res.send("Hello world from auth");
});

router.post("/loginWithEmailAndPassword", async (req, res) => {
  const { email, password } = req.body;

  try {
    const tokens = await loginWithEmailAndPassword(email, password);
    res.json(tokens);
  } catch (error: any) {
    res.status(403);
    res.send({ message: error.message });
  }
});

// This will return the logged in user including the access token
router.post("/createUserWithEmailAndPassword", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const tokens = await createUserWithEmailAndPassword(name, email, password);
    res.json(tokens);
  } catch (error: any) {
    res.status(403);
    res.send({ message: error.message });
  }
});

router.post("/accessToken", async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken == null) return res.sendStatus(401);
  const tokenExists = await readData(FirestoreCollections.REFRESH_TOKENS, refreshToken);
  if (!tokenExists) return res.sendStatus(403);

  jwt.verify(refreshToken as string, process.env.REFRESH_TOKEN_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403);
    delete user?.iat;
    const accessToken = getAccessToken(user as User);
    const newRefreshToken = getRefreshToken(user as User);
    revokeRefreshToken(refreshToken);
    res.json({ ...accessToken, refreshToken: newRefreshToken });
  });
});

router.delete("/logout", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);
  revokeRefreshToken(refreshToken);
  res.sendStatus(204);
});

export default router;
