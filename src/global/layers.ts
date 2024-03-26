import { CHENGDU_LL, TDT_TK } from "@/global/constants"
import ChinaJson from "@/global/geo-json/100000.json"
import SiChuanJson from "@/global/geo-json/510000.json"
import SiChuanCountryJson from "@/global/geo-json/510000_country.json"
import { useHomeStore } from "@/store/home"
import { CreateLayer } from "@/utils/open-layer"

// 地图
export const TDT_GRAPH = {
  layerName: "TDT_GRAPH",
  isDefault: true,
  layerType: "TileXYZ",
  layerUrl: `http://t7.tianditu.com/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=${TDT_TK}`,
}

// 地名标注
export const TDT_CIA = {
  layerName: "TDT_CIA",
  isDefault: true,
  layerType: "TileXYZ",
  layerUrl: `http://t7.tianditu.com/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=${TDT_TK}`,
}

// 地形渲染
export const TDT_TERRAIN = {
  layerName: "TDT_CIA",
  isDefault: true,
  layerType: "TileXYZ",
  layerUrl: `http://t7.tianditu.com/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk=${TDT_TK}`,
}

export class ComLayers {
  static getGraphLayer = () => {
    return CreateLayer.createXYZLayer(TDT_GRAPH)
  }

  static getTerrainLayer = () => {
    return CreateLayer.createXYZLayer(TDT_TERRAIN)
  }

  static getCiaLayer = () => {
    return CreateLayer.createXYZLayer(TDT_CIA)
  }

  static getChinaBoundaryLayer = () => {
    return CreateLayer.createLayerOfGeoJson(ChinaJson, "chinaBoundaryLayer")
  }

  static getSichuanBoundaryLayer = () => {
    return CreateLayer.createLayerOfGeoJson(SiChuanJson, "sichuanBoundaryLayer")
  }

  static getSichuanCountryBoundaryLayer = () => {
    return CreateLayer.createLayerOfGeoJson(SiChuanCountryJson, "sichuanCountryBoundaryLayer")
  }

  static getLivePositionLayer = () => {
    const store = useHomeStore()
    return CreateLayer.createPulseIconLayer(
      [{ Lon: store.currentLivePosition[0], Lat: store.currentLivePosition[1], label: "当前位置" }],
      "currentLivePosition",
    )
  }

  static getChengDuLayer = () => {
    return CreateLayer.createLayerOfIcon(
      [{ Lon: CHENGDU_LL[0], Lat: CHENGDU_LL[1], label: "成都" }],
      "chengduPositionLayer",
      new URL("@/assets/map-icons/pt-red.svg", import.meta.url).href,
    )
  }
}
