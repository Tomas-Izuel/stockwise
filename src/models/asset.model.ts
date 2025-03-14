import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
});

export const Asset = mongoose.model("Asset", assetSchema);
