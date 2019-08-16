import Vue from 'vue'
import App from './App'
import 'mpvue-weui/src/style/weui.css';
import store from './store/modules'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()
