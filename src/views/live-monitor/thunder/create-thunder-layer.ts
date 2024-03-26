import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import { Icon, Style } from "ol/style"

import { CreateLayer } from "@/utils/open-layer"

export function createThunderLayer(data: any) {
  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: CreateLayer.createFeatures(data, "Lon", "Lat"),
    }),
    zIndex: 9,
    style: feature => {
      const styles: Style[] = []
      const value = feature.getProperties()
      const iconUrl =
        Number(value.PRS_Change_3h) > 0
          ? new URL("@/assets/map-icons/thunder+.svg", import.meta.url).href
          : new URL("@/assets/map-icons/thunder-.svg", import.meta.url).href

      const style = new Style({
        image: new Icon({ src: iconUrl, anchor: [0.5, 1], scale: 0.1 }),
      })

      styles.push(style)

      return styles
    },
  })

  vectorLayer.set("id", "liveMonitorThunderLayer")

  return vectorLayer
}
