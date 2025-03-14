import mongoose from "mongoose";

const trackerAssetSchema = new mongoose.Schema({
  tracker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tracker",
    required: true,
  },
  asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset", required: true },
});

export const TrackerAsset = mongoose.model("TrackerAsset", trackerAssetSchema);
