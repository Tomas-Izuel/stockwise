import mongoose from "mongoose";

const trackerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TrackerType",
    required: true,
  },
  assets: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Asset",
    required: true,
  },
});

export const Tracker = mongoose.model("Tracker", trackerSchema);
