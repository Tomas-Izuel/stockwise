import { z } from "zod";

export const TrackerTypeDtoSchema = z.object({
  name: z.string(),
  description: z.string(),
});
