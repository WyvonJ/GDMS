import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import MuseUI from 'muse-ui'
import VueDND from 'awe-dnd'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'

import StyleInjector from './components/utils/StyleInjector.vue'
import WyvonjSnackbar from './components/utils/WyvonjSnackbar.vue'
import WyvonjTooltip from './components/utils/Tooltip'
import axios from 'axios'

import store from './store'
import router from './router'
import cookie from './utils/cookieUtil'
const _ = require('lodash')

global.cookie = cookie
global.lg = console.log
Vue.use(MuseUI)
Vue.use(VueDND)
Vue.use(WyvonjTooltip)
    //  添加请求拦截器

Vue.prototype.GET = axios.get
Vue.prototype.POST = axios.post

const vm = new Vue({
    router,
    store,
    components: {
        StyleInjector,
        WyvonjSnackbar
    },
    computed: mapState(['isProgressbar', 'snackbarText', 'isSnackbar'])
}).$mount('#GDMS')

axios.interceptors.request.use((config) => {
    let token = window.localStorage.getItem('token')
    if (token) {
        config.headers.common['Authorization'] = 'Bearer ' + token
    }
    return config
}, (err) => {
    return Promise.reject(err)
})

axios.interceptors.response.use((res) => {
    if (res.status === 401 || res.status === 404) {
        store.commit('UNSET_USER')
        router.go({ name: 'login' })
    }
    return Promise.resolve(res)
}, (error) => {
    console.warn('找不到服务器')
    return Promise.reject(error)
})
