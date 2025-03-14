import mongoose from "mongoose";

const trackerTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  trackRef: { type: String, required: true },
  description: { type: String, required: true },
});

export const TrackerType = mongoose.model("TrackerType", trackerTypeSchema);
