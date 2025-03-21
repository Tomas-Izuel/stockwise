import { TrackerType } from "../models/tracker_type.model";
import { TrackerTypeDto } from "../types/tracket_type";

export class TrackerTypesService {
  async createTrackerType(trackerType: TrackerTypeDto) {
    const existingTrackerType = await TrackerType.findOne({
      name: trackerType.name,
    });
    if (existingTrackerType) {
      throw new Error("Tracker type already exists");
    }

    const createdTrackerType = await TrackerType.create(trackerType);
    return createdTrackerType;
  }

  async getTrackerTypes() {
    const trackerTypes = await TrackerType.find();
    return trackerTypes;
  }
}
