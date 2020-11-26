import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// IView-ui
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import './my-theme/index.less'
// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// markdown插件
import mavonEdit from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(ViewUI);
Vue.use(ElementUI);
Vue.use(mavonEdit);

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]

// Vue.http.options.emulateJSON = true;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
