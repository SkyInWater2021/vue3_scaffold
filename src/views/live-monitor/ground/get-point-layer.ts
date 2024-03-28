import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import { Fill, Icon, Stroke, Style, Text } from "ol/style"

import { CreateLayer, ManageLegend } from "@/utils/open-layer"

export function createPointLayer(data: any, showTypes: Set<string> = new Set(), layerId: string) {
  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: CreateLayer.createFeatures(data, "Lon", "Lat"),
    }),
    zIndex: 9,
    style: feature => {
      const styles: Style[] = []
      const properties = feature.getProperties()

      // 显示的文字相关属性
      const textArr: {
        value: string
        color: string
        fontSize: string
        font: string
        rotation: number
        offsetX: number
        offsetY: number
      }[] = []

      // todo 判断normal | error | warning
      let status = ""
      if (properties["TEM"] <= 20) status = "normal"
      else if (properties["TEM"] <= 30) status = "dubious"
      else status = "error"

      // 创建一个站点图标
      const stationCircle = (url: string) => {
        return new Style({
          image: new Icon({
            src: url,
            anchor: [0.5, 1],
            scale: 0.18,
          }),
        })
      }

      if (showTypes.has("normal") && status === "normal") {
        const iconUrl = new URL("@/assets/map-icons/point-normal.svg", import.meta.url).href
        styles.push(stationCircle(iconUrl))
      }

      if (showTypes.has("error") && status === "error") {
        const iconUrl = new URL("@/assets/map-icons/point-error.svg", import.meta.url).href
        styles.push(stationCircle(iconUrl))
      }

      if (showTypes.has("dubious") && status === "dubious") {
        const iconUrl = new URL("@/assets/map-icons/point-dubious.svg", import.meta.url).href
        styles.push(stationCircle(iconUrl))
      }

      // 站名
      if (showTypes.has("stationName")) {
        textArr.push({
          value: properties["Station_Name"],
          color: "#78aff9",
          fontSize: "10px",
          font: "sans-serif",
          rotation: 0,
          offsetX: 0,
          offsetY: 2,
        })
      }

      // 站号
      if (showTypes.has("stationNumber")) {
        textArr.push({
          value: properties["Station_Id_C"],
          color: "#78aff9",
          fontSize: "10px",
          font: "sans-serif",
          rotation: 0,
          offsetX: 0,
          offsetY: -25,
        })
      }

      // 观测值
      if (showTypes.has("pointNumber")) {
        const manageLegend = new ManageLegend()
        const colorInfo = manageLegend.findInterval(properties["TEM"], "温度")
        textArr.push({
          value: properties["TEM"],
          color: colorInfo?.color ?? "#4187f2",
          fontSize: "10px",
          font: "sans-serif",
          rotation: 0,
          offsetX: 18,
          offsetY: -12,
        })
      }

      // 文字样式设置
      textArr.forEach(item => {
        const style = new Style({
          text: new Text({
            text: item.value ?? "",
            font: `bold ${item.fontSize} ${item.font} `,
            fill: new Fill({ color: item.color }),
            stroke: new Stroke({ color: "white", width: 1 }), // 添加白色描边，可以根据需要调整宽度
            padding: [0, 0, 0, 0],
            textAlign: "center",
            textBaseline: "bottom",
            offsetY: item.offsetY,
            offsetX: item.offsetX,
            rotation: item.rotation,
          }),
        })
        styles.push(style)
      })

      return styles
    },
  })

  vectorLayer.set("id", layerId)

  return vectorLayer
}
