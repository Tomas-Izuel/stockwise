import { z } from "zod";

export const TrackerDtoSchema = z.object({
  type: z.string(),
});
