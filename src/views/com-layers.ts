import { CHENG_DU_LON_LAT, TDT_CIA } from "@/global"
import ChinaJson from "@/global/json/100000_full.json"
import { CreateLayer } from "@/utils"

export const chengDuLayer = CreateLayer.createIconLayer(
  [{ Lon: CHENG_DU_LON_LAT[0], Lat: CHENG_DU_LON_LAT[1], label: "成都" }],
  "chengduPositionLayer",
  new URL("@/assets/map-icons/station-red.png", import.meta.url).href,
)

export const ciaLayer = CreateLayer.createXYZLayer(TDT_CIA)

export const chinaBoundary = CreateLayer.createLayerOfGeoJson(ChinaJson, "chinaBoundaryLayer")
