import "vant/lib/index.css"
import "./style.css"

import { CME_MeteoSinglePoint } from "CME-MeteoSinglePoint"
import { CME_RasterRender } from "CME-RasterRender"
import { CME_ArrowRender, CME_GridRender, CME_IsolineRender, CME_WindyBarb } from "CME_GridLayer" // 基础图层渲染
import { CME_MeteoMap } from "CME_MeteoMap"
import { Icon } from "vant"
import { createApp } from "vue"

import { SvgIcon } from "@/components"
import "virtual:svg-icons-register"

import App from "./App.vue"
import router from "./router"
import store from "./store"

const app = createApp(App)

app.component("svg-icon", SvgIcon)
app.use(CME_MeteoMap)
app.use(CME_WindyBarb)
app.use(CME_GridRender)
app.use(CME_IsolineRender)
app.use(CME_ArrowRender)
app.use(CME_RasterRender)
app.use(CME_MeteoSinglePoint)

// vant组件
app.use(Icon)

app.use(store)
app.use(router)

app.mount("#app")
