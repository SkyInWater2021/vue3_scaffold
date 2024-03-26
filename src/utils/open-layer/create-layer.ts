import Feature from "ol/Feature"
import GeoJSON from "ol/format/GeoJSON"
import Point from "ol/geom/Point"
import TileLayer from "ol/layer/Tile"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import XYZ from "ol/source/XYZ"
import { Circle, Fill, Icon, Stroke, Style } from "ol/style"

export class CreateLayer {
  static createFeatures(data: Record<string, any>[], lon: string, lat: string) {
    const features: Feature<Point>[] = [] // 特性集合
    if (data && Array.isArray(data)) {
      const coordinateArr = { lon: [] as string[], lat: [] as string[] }
      data.forEach(item => {
        const lonStr = String(item[lon])
        const latStr = String(item[lat])
        if (coordinateArr.lon.includes(lonStr) && coordinateArr.lat.includes(latStr)) return
        coordinateArr.lon.push(lonStr)
        coordinateArr.lat.push(latStr)
        const feature = new Feature({
          geometry: new Point([parseFloat(lonStr), parseFloat(latStr)]),
        })
        feature.setProperties({ ...item })
        features.push(feature)
      })
    }

    return features
  }

  static createLayerOfGeoJson(
    geoJson: any,
    layerId: string,
    config?: {
      zIndex?: number
      strokeColor?: string
      strokeWidth?: number
      fillColor?: string
    },
  ) {
    const {
      zIndex = 9,
      strokeColor = "#c63520",
      strokeWidth = 1,
      fillColor = "transparent",
    } = config ?? {}

    const layer = new VectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures(geoJson, {
          dataProjection: "EPSG:4326", // 数据源坐标系
          featureProjection: "EPSG:4326", // 目标坐标系
        }),
      }),
      style: () => {
        return new Style({
          fill: new Fill({ color: fillColor }),
          stroke: new Stroke({
            color: strokeColor,
            width: strokeWidth,
          }),
        })
      },
      zIndex: zIndex ?? 9,
    })

    layer.set("id", layerId)

    return layer
  }

  static createXYZLayer(
    payload: { layerName: string; layerUrl: string },
    config?: {
      zIndex?: number
    },
  ) {
    const { zIndex = 9 } = config ?? {}
    const layer = new TileLayer({
      source: new XYZ({
        tilePixelRatio: window.devicePixelRatio > 1 ? 2 : 1,
        url: payload.layerUrl,
      }),
      zIndex,
    })

    layer.set("id", payload.layerName)

    return layer
  }

  static createLayerOfIcon(
    data: Record<string, any>[] = [],
    layerId: string,
    config: {
      iconUrl: string
      lon?: string
      lat?: string
      zIndex: number
    },
  ) {
    const { iconUrl, lon = "Lon", lat = "Lat", zIndex = 9 } = config

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: this.createFeatures(data, lon, lat),
      }),
      zIndex: zIndex,
      style: () => {
        const styles: Style[] = []
        const style = new Style({
          image: new Icon({ src: iconUrl, anchor: [0.5, 1], scale: 0.15 }),
        })
        styles.push(style)
        return styles
      },
    })

    vectorLayer.set("id", layerId)

    return vectorLayer
  }

  // 创建脉冲点图层
  static createPulseIconLayer(
    data: Record<string, any>[] = [],
    layerId: string,
    config?: {
      lon?: string
      lat?: string
      zIndex?: number
    },
  ) {
    const { lon = "Lon", lat = "Lat", zIndex = 9 } = config ?? {}
    const features = this.createFeatures(data, lon, lat)
    const vectorLayer = new VectorLayer({
      source: new VectorSource({ features: features }),
      zIndex: zIndex,
    })
    vectorLayer.set("id", layerId)

    // 脉冲效果
    const radius = 8
    let scale = 2
    let increment = true
    const updateStyle = () => {
      if (increment) {
        scale += 0.02
        if (scale >= radius * 0.8) increment = false
      } else {
        scale -= 0.03
        if (scale <= 2) increment = true
      }
      features.forEach(feature => {
        feature.setStyle(
          new Style({
            image: new Circle({
              radius: radius,
              fill: new Fill({ color: "#4ca7f8" }),
              stroke: new Stroke({ color: "white", width: scale }),
            }),
          }),
        )
      })
      requestAnimationFrame(updateStyle)
    }
    updateStyle()

    return vectorLayer
  }
}
