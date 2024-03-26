import { CreateLayer } from "./create-layer"

import type { Map } from "ol"

export class ManageView {
  /**
   * 跳转到指定区域
   * @param mapInstance 地图实例
   * @param geoJson 地图json数据
   * @param layerId 图层ID
   */
  static changeMapPosition(mapInstance: Map, geoJson: string, layerId: string) {
    if (geoJson) {
      const layer = CreateLayer.createLayerOfGeoJson(geoJson, layerId)
      const layerExtent = layer.getSource()!.getExtent()
      const view = mapInstance.getView()

      view.beginInteraction()
      mapInstance.getInteractions().forEach(i => i.setActive(false))
      view.fit(layerExtent, {
        padding: [10, 10, 10, 10],
        duration: 1000,
        callback: () => {
          mapInstance.getInteractions().forEach(i => i.setActive(true))
        },
      })
    }
  }
}
