import { createApp } from "vue";
import App from "./App.vue";
import "./style/index.less";
import router from "./router/router";
import pinia from "./store/index";
const app = createApp(App);

app.use(router).use(pinia);
app.mount("#app");
