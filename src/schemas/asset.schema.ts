import { z } from "zod";

export const CreateAssetDtoSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  cuantity: z.number(),
});
