import "./style.css"

import { Icon } from "vant"
import { createApp } from "vue"

import App from "./App.vue"
import { globalRegister } from "./global/register"
import router from "./router"
import store from "./store"

const app = createApp(App)

app.use(globalRegister)
app.use(Icon)
app.use(router)
app.use(store)
app.mount("#app")
