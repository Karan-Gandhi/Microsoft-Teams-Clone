import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
	res.send("Hello world from auth");
});

// This will return the access token of the user
router.post("/loginWithEmailAndPassword", (req, res) => {});

// This will return the logged in user including the access token
router.post("/createUserWithEmailAndPassword", (req, res) => {});

export default router;
