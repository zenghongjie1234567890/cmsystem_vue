import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 element-ui
import ElementUI from 'element-ui'
// 引入 element-ui 的 css 文件
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
// 引入富文本组件
import QuillEditor from 'vue-quill-editor'
// 引入富文本组件样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(QuillEditor)


Vue.prototype.axios = axios
    // 设置一个全局的变量url
Vue.prototype.base_url = 'http://47.107.229.21:8055';
// 声明使用 element-ui
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')