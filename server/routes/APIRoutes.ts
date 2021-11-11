import * as jwt from "jsonwebtoken";
import express from "express";
import TeamsRouter from "./TeamsRoutes";
import UserRouter from "./UserRoutes";
import MeetingRouter from "./MeetingRoutes";

const router = express.Router();

router.use((req, res, next) => {
  if (!req.headers.authorization) return res.sendStatus(401);
  const [type, token] = req.headers.authorization.split(" ");
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error, user) => {
    if (error) return res.sendStatus(403);
    // req.user = user as User;
    delete user?.iat;
    delete user?.exp;
    req.user = JSON.stringify(user);
    next();
  });
});

router.use((error: Error, _: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(error);
  res.sendStatus(500);
});

router.get("/", (_, res) => {
  res.send("Hello world from api");
});

router.use("/teams", TeamsRouter);
router.use("/users", UserRouter);
router.use("/meetings", MeetingRouter);

export default router;
