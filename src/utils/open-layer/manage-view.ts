import { WORLD_EXTENT } from "@/global/constants"

import { CreateLayer } from "./create-layer"

import type { Map } from "ol"

export class ManageView {
  /**
   * 跳转到指定区域
   * @param mapInstance 地图实例
   * @param geoJson 地图json数据
   * @param layerName 图层名称
   */
  static changeMapPosition(
    mapInstance: Map,
    geoJson: string,
    layerName: string,
    extent = [...WORLD_EXTENT],
  ) {
    if (geoJson) {
      const layer = CreateLayer.createLayerOfGeoJson(geoJson, layerName)
      const layerExtent = layer.getSource()!.getExtent()
      mapInstance.getView().fit(layerExtent, {
        padding: [10, 10, 10, 10],
      })
    } else mapInstance.getView().fit(extent, { size: mapInstance.getSize() })
  }
}
