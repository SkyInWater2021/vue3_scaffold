import Feature from "ol/Feature"
import GeoJSON from "ol/format/GeoJSON"
import Point from "ol/geom/Point"
import TileLayer from "ol/layer/Tile"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import XYZ from "ol/source/XYZ"
import { Fill, Icon, Stroke, Style } from "ol/style"

export class CreateLayer {
  /**
   * 根据GeoJson创建矢量图层
   * @param geoJson 地理json
   * @param layerId 图层ID
   * @param zIndex 图层层级
   * @returns 矢量图层
   */
  static createLayerOfGeoJson(geoJson: any, layerId: string, zIndex = 9) {
    const layer = new VectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures(geoJson, {
          dataProjection: "EPSG:4326", // 数据源坐标系
          featureProjection: "EPSG:4326", // 目标坐标系
        }),
      }),
      style: () => {
        return new Style({
          fill: new Fill({ color: "transparent" }),
          stroke: new Stroke({ color: "#c63520", width: 1 }),
        })
      },
      zIndex,
    })

    layer.set("id", layerId)

    return layer
  }

  /**
   * 根据坐标创建Icon矢量图层
   * @param data 地图数据
   * @param layerId 图层ID
   * @param zIndex 图层层级
   * @returns
   */
  static createIconLayer(
    data: Record<string, any>[] = [],
    layerId: string,
    iconUrl: string,
    zIndex = 9,
  ) {
    const features: Feature<Point>[] = [] // 特性集合
    const coordinateArr = { lon: [] as string[], lat: [] as string[] }

    data.forEach(item => {
      const lonStr = String(item.Lon)
      const latStr = String(item.Lat)
      if (coordinateArr.lon.includes(lonStr) && coordinateArr.lat.includes(latStr)) return

      coordinateArr.lon.push(lonStr)
      coordinateArr.lat.push(latStr)

      const feature = new Feature({
        geometry: new Point([parseFloat(lonStr), parseFloat(latStr)]),
      })

      feature.setProperties({ ...item })
      features.push(feature)
    })

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: features,
      }),
      zIndex: zIndex,

      style: () => {
        const styles: Style[] = []
        const style = new Style({
          image: new Icon({
            src: iconUrl,
            anchor: [0.5, 1],
            scale: 0.15,
          }),
        })
        styles.push(style)

        return styles
      },
    })

    vectorLayer.set("id", layerId)

    return vectorLayer
  }

  static createXYZLayer(payload: { layerName: string; layerUrl: string }, zIndex = 9) {
    const layer = new TileLayer({
      source: new XYZ({
        url: payload.layerUrl,
        tilePixelRatio: window.devicePixelRatio > 1 ? 2 : 1,
      }),
      zIndex,
    })

    layer.set("id", payload.layerName)

    return layer
  }
}
