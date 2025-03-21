import { Hono } from "hono";
import { TrackerTypesService } from "../services/tracker_type.service";
import { TrackerTypeDtoSchema } from "../schemas/tracker_type.schema";
import { zValidator } from "@hono/zod-validator";
import { authMiddleware } from "../middlewares/auth.middlewares";

const router = new Hono();

const trackerTypesService = new TrackerTypesService();

router.post(
  "/",
  authMiddleware,
  zValidator("json", TrackerTypeDtoSchema),
  async (c) => {
    const data = c.req.valid("json");
    const trackerType = await trackerTypesService.createTrackerType(data);
    return c.json(trackerType);
  }
);

router.get("/", authMiddleware, async (c) => {
  const trackerTypes = await trackerTypesService.getTrackerTypes();
  return c.json(trackerTypes);
});

export { router as trackerTypeRoutes };
