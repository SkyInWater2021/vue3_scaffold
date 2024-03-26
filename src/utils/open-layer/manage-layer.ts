import type { Map } from "ol"

export class ManageLayer {
  static removeLayerById(map: Map, id: string) {
    const layer = this.getLayerById(map, id)
    if (layer) {
      return map.removeLayer(layer!)
    } else throw new Error(`不存在ID为${id}的图层`)
  }

  static getLayerById(map: Map, id: string) {
    return map.getAllLayers().find(feature => feature.get("id") === id)
  }
}
