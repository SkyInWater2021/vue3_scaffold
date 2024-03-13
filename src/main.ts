import "./style.css"

import { CME_RasterRender } from "CME-RasterRender"
import { CME_MeteoSinglePoint } from "CME_MeteoSinglePoint"
import { Icon } from "vant"
import { createApp } from "vue"

import App from "./App.vue"
import router from "./router"
import store from "./store"

const app = createApp(App)

app.use(CME_RasterRender)
app.use(CME_MeteoSinglePoint)

app.use(Icon)
app.use(store)
app.use(router)

app.mount("#app")
