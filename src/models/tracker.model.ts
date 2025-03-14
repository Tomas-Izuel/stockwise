import mongoose from "mongoose";

const trackerSchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TrackerType",
    required: true,
  },
  assets: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "TrackerAsset",
    required: true,
  },
});

export const Tracker = mongoose.model("Tracker", trackerSchema);
