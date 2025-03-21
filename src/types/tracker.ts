import { z } from "zod";
import { TrackerType } from "../models/tracker_type.model";
import { TrackerDtoSchema } from "../schemas/tracker.schema";
import { Asset } from "../models/asset.model";

export type Tracker = {
  type: typeof TrackerType;
  assets: (typeof Asset)[];
};

export type TrackerDto = z.infer<typeof TrackerDtoSchema>;
