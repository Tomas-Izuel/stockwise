import { z } from "zod";
import { CreateAssetDtoSchema } from "../schemas/asset.schema";

export type AssetDto = z.infer<typeof CreateAssetDtoSchema>;
