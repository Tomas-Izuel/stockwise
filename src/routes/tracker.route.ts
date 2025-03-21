import { Hono } from "hono";
import { TrackerService } from "../services/tracker.service";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { zValidator } from "@hono/zod-validator";
import { TrackerDtoSchema } from "../schemas/tracker.schema";

const router = new Hono();

const trackerService = new TrackerService();

router.post(
  "/",
  authMiddleware,
  zValidator("json", TrackerDtoSchema),
  async (c) => {
    const data = c.req.valid("json");
    const user = c.get("jwtPayload");
    const tracker = await trackerService.createTracker(data, user.sub);
    return c.json(tracker);
  }
);

router.get("/", authMiddleware, async (c) => {
  const user = c.get("jwtPayload");
  const trackers = await trackerService.getTrackers(user.sub);
  return c.json(trackers);
});

router.get("/:id", authMiddleware, async (c) => {
  const user = c.get("jwtPayload");
  const tracker = await trackerService.getTrackerById(
    c.req.param("id"),
    user.sub
  );
  return c.json(tracker);
});

router.delete("/:id", authMiddleware, async (c) => {
  const user = c.get("jwtPayload");
  const tracker = await trackerService.deleteTracker(
    c.req.param("id"),
    user.sub
  );
  return c.json(tracker);
});

export { router as trackerRoutes };
