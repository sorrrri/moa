import "./assets/scss/common.scss";
import "./assets/scss/style.scss";
import "./assets/scss/banners.scss";
import "./assets/scss/global.scss";
import "./assets/scss/customized.scss";
import "./assets/scss/responsive.scss";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
