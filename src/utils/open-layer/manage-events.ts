import { Map, MapBrowserEvent, Overlay } from "ol"

export class ManageMapEvents {
  static mapPointClick = (
    mapInstance: Map,
    evt: MapBrowserEvent<MouseEvent>,
    otherParams?: { popup: HTMLElement },
  ) => {
    // 遍历当前像素位置的所有的features,并返回第一个feature作为结果
    const feature = mapInstance.forEachFeatureAtPixel(evt.pixel, feature => feature)
    if (!feature) return

    // 从feature中提取所有属性并赋值给pointData变量
    let pointData: Record<string, any> = { ...feature.getProperties() }

    // 从pointData中删除geometry属性。geometry属性通常包含有关feature位置和形状的信息。
    delete pointData.geometry

    // 准备弹窗
    let overlay: Overlay | null = null

    // aim: 目的是取消其他图层的点击事件干扰,只监站点的点击
    if (!pointData.Lat || !pointData.Lon) pointData = {}

    if (otherParams?.popup) {
      overlay = new Overlay({
        element: otherParams.popup,
        position: evt.coordinate,
      })

      const style = overlay.getElement()!.style
      style.display = "block"
      style.position = "relative"
      style.left = "-50%"
      style.top = "24px"
      style.pointerEvents = "auto"
    }

    const location = mapInstance.getPixelFromCoordinate(evt.pixel)

    return { pointData, location, overlay }
  }

  static mapPointHover = (mapInstance: Map, evt: MapBrowserEvent<MouseEvent>) => {
    const targetElement = mapInstance.getTargetElement()
    targetElement.style.cursor = mapInstance.hasFeatureAtPixel(evt.pixel) ? "pointer" : "grab"
  }
}
