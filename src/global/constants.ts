export const TDT_TK = "fb258b4c0bbf60ff7a0205b519ad9a96"

export const CHENG_DU_LON_LAT = readonly([104.06543521970411, 30.577049300041224])

export const TDT_GRAPH = {
  layerName: "TDT_GRAPH",
  isDefault: true,
  layerType: "TileXYZ",
  layerUrl: `http://t7.tianditu.com/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=${TDT_TK}`,
}

export const TDT_CIA = {
  layerName: "TDT_CIA",
  isDefault: true,
  layerType: "TileXYZ",
  layerUrl: `http://t7.tianditu.com/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=${TDT_TK}`,
}

export const TDT_ST = {
  layerName: "TDT_ST",
  isDefault: true,
  layerType: "TileXYZ",
  layerUrl: `http://t7.tianditu.com/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=${TDT_TK}`,
}
