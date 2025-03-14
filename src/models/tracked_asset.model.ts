import mongoose from "mongoose";

const trackedAssetSchema = new mongoose.Schema({
  asset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TrackerAsset",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
  date: { type: Date, required: true },
});

export const TrackedAsset = mongoose.model("TrackedAsset", trackedAssetSchema);
