export const TDT_TK = "fb258b4c0bbf60ff7a0205b519ad9a96"

export const TDT_GRAPH = {
  layerName: "TDT_GRAPH",
  isDefault: true,
  layerType: "TileXYZ",
  layerUrl: `http://t2.tianditu.com/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=${TDT_TK}`,
}

export const TDT_CIA = {
  layerName: "TDT_GRAPH",
  isDefault: true,
  layerType: "TileXYZ",
  zIndex: 9,
  layerUrl: `http://t2.tianditu.com/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=${TDT_TK}`,
}
