export const CHINA_ONLINE_COMMUNITY = {
  layerName: "CHINA_ONLINE_COMMUNITY",
  isDefault: true,
  layerType: "TileXYZ",
  layerUrl:
    "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
}

export const CHINA_ONLINE_STREET = {
  layerName: "CHINA_ONLINE_STREET",
  isDefault: true,
  layerType: "TileXYZ",
  layerUrl:
    "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
}

export const BASE_LAYERS = [CHINA_ONLINE_COMMUNITY, CHINA_ONLINE_STREET]
