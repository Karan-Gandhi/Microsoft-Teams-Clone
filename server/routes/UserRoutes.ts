import * as express from "express";
import { getUserByID } from "../utils/UserUtils";

const router = express.Router();

router.get("/:id", async (req, res) => {
	try {
		const user = await getUserByID(req.params.id);
		res.json({ id: user.id, name: user.name, email: user.email });
	} catch {
		res.sendStatus(404);
	}
});

export default router;
