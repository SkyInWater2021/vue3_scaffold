import { CME_RasterRender } from "CME-RasterRender"
import { App } from "vue"

export function globalRegister(app: App) {
  app.use(CME_RasterRender)
}
