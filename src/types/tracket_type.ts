import { z } from "zod";
import { TrackerTypeDtoSchema } from "../schemas/tracker_type.schema";

export type TrackerTypeDto = z.infer<typeof TrackerTypeDtoSchema>;
