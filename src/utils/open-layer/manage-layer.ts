import type { Map } from "ol"

export class ManageLayer {
  /**
   * 通过图层ID删除图层
   * @param map 地图实例
   * @param id 图层ID
   * @returns 删除的图层 | undefined
   */
  static removeLayerById(map: Map, id: string) {
    const layer = this.getLayerById(map, id)
    if (layer) {
      return map.removeLayer(layer!)
    } else throw new Error(`不存在ID为${id}的图层`)
  }

  /**
   * 通过图层ID获取图层
   * @param map 地图实例
   * @param id
   * @returns 指定图层
   */
  static getLayerById(map: Map, id: string) {
    return map.getAllLayers().find(feature => feature.get("id") === id)
  }
}
