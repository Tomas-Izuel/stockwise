import { Asset } from "../models/asset.model";
import { AssetDto } from "../types/asset";

export class AssetService {
  async addAsset(asset: AssetDto) {
    const createdAsset = await Asset.create(asset);
    return createdAsset;
  }

  async getAssetById(assetId: string) {
    const asset = await Asset.findById(assetId);
    if (!asset) {
      throw new Error("Asset not found");
    }
    return asset;
  }
}
