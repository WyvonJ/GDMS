import Vue from 'vue'
import VueResource from 'vue-resource'
import { mapState ,mapActions,mapMutations} from 'vuex'
import MuseUI from 'muse-ui'
import VueDND from 'awe-dnd'
import VueMaterial from 'vue-material'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import 'vue-material/dist/vue-material.css'

import StyleInjector from './components/utils/StyleInjector.vue'
import LoadingSpinner from './components/utils/LoadingSpinner.vue'
import WyvonjCanvas from './components/utils/WyvonjCanvas.vue'

import WyvonjSnackbar from './components/utils/WyvonjSnackbar.vue'

import store from './store'
import router from './router'
var _ = require('lodash')
var CookieUtil = require('./utils/cookieUtil')
//var TWEEN = require('tween.js')
Vue.use(MuseUI)
Vue.use(VueDND)
Vue.use(VueResource)
Vue.use(VueMaterial)
Vue.material.registerTheme('default', {
  primary: 'red',
  accent: 'red',
  warn: 'white',
  background: 'white'
})
var vm = new Vue({
  router,
  store,
  components: { 
  	StyleInjector,
  	LoadingSpinner,
    WyvonjCanvas,
    WyvonjSnackbar
   },
   methods:{
    ...CookieUtil
   },
   computed:mapState(['isLoading','snackbarText','showSnackbar'])
}).$mount('#GDMS')