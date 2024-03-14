import "./style.css"

import { CME_Isoline } from "CME-Isoline"
import { CME_RasterRender } from "CME-RasterRender"
import { CME_MeteoMap } from "CME_MeteoMap"
import { CME_MeteoSinglePoint } from "CME_MeteoSinglePoint"
import { Icon } from "vant"
import { createApp } from "vue"

import { SvgIcon } from "@/components"
import "virtual:svg-icons-register"

import App from "./App.vue"
import router from "./router"
import store from "./store"

const app = createApp(App)

app.component("svg-icon", SvgIcon)
app.use(CME_RasterRender)
app.use(CME_MeteoSinglePoint)
app.use(CME_MeteoMap)
app.use(CME_Isoline)

app.use(Icon)
app.use(store)
app.use(router)

app.mount("#app")
