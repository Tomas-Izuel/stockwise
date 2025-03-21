import { TrackerType } from "../models/tracker_type.model";
import { User } from "../models/user.model";
import { TrackerDto } from "../types/tracker";
import { Tracker } from "../models/tracker.model";
import { AssetService } from "./asset.service";

const assetService = new AssetService();

export class TrackerService {
  async createTracker(tracker: TrackerDto, userId: string) {
    const existingTrackerType = await TrackerType.findById(tracker.type);
    if (!existingTrackerType) {
      throw new Error("Tracker type not found");
    }

    const existingTrackerUser = await Tracker.findOne({
      type: tracker.type,
      user: userId,
    });

    if (existingTrackerUser) {
      throw new Error("Tracker already exists");
    }

    const createdTracker = await Tracker.create({
      type: existingTrackerType._id,
      user: userId,
    });

    return createdTracker;
  }

  async getTrackers(userId: string) {
    const trackers = await Tracker.find({
      user: userId,
    }).populate({
      path: "assets",
      populate: {
        path: "asset",
      },
    });
    return trackers;
  }

  async getTrackerById(trackerId: string, userId: string) {
    const tracker = await Tracker.findById(trackerId).populate("assets");
    if (!tracker) {
      throw new Error("Tracker not found");
    }
    if (tracker.user.toString() !== userId) {
      throw new Error("No autorizado para ver este tracker");
    }
    return tracker;
  }

  async deleteTracker(trackerId: string, userId: string) {
    const tracker = await Tracker.findById(trackerId);
    if (!tracker) {
      throw new Error("Tracker not found");
    }
    if (tracker.user.toString() !== userId) {
      throw new Error("No autorizado para eliminar este tracker");
    }
    const deletedTracker = await Tracker.findByIdAndDelete(trackerId);
    return deletedTracker;
  }

  async addAssetToTracker(trackerId: string, assetId: string, userId: string) {
    const tracker = await Tracker.findById(trackerId);
    if (!tracker) {
      throw new Error("Tracker not found");
    }
    const isTrackerFromUser = tracker.user.toString() === userId;
    if (!isTrackerFromUser) {
      throw new Error("No autorizado para agregar un asset a este tracker");
    }
    try {
      const asset = await assetService.getAssetById(assetId);
      const assetFromTracker = tracker.assets.find(
        (asset) => asset._id.toString() === assetId
      );
      if (assetFromTracker) {
        throw new Error("Asset already exists in tracker");
      }
      tracker.assets.push(asset._id);
      await tracker.save();
      return tracker;
    } catch (error) {
      throw new Error("Error al agregar el asset al tracker");
    }
  }
}

export const trackerService = new TrackerService();
