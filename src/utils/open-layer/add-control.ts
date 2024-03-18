import MousePosition from "ol/control/MousePosition"
import { createStringXY } from "ol/coordinate"

export class MapControl {
  /**
   * 显示鼠标坐标位置
   * @param el 目标容器
   * @returns 鼠标位置坐标
   */
  static getMousePositionControl = (el: HTMLElement, precision = 4) => {
    return new MousePosition({
      coordinateFormat: createStringXY(precision),
      projection: "EPSG:4326",
      target: el,
    })
  }
}