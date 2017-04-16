import Vue from 'vue'
import { mapState ,mapActions} from 'vuex'
import MuseUI from 'muse-ui'
import VueDND from 'awe-dnd'
import VueMaterial from 'vue-material'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import 'vue-material/dist/vue-material.css'

import StyleInjector from './components/utils/StyleInjector.vue'
import WyvonjSnackbar from './components/utils/WyvonjSnackbar.vue'

import store from './store'
import router from './router'
import cookie from './utils/cookieUtil'
let _ = require('lodash')
global._c = cookie


Vue.use(MuseUI)
Vue.use(VueDND)
Vue.use(VueMaterial)
Vue.material.registerTheme('default', {
  primary: 'red',
  accent: 'red',
  warn: 'white',
  background: 'white'
})
let vm = new Vue({
  router,
  store,
  components: {
    StyleInjector,
    WyvonjSnackbar
  },
  computed: mapState(['isProgressbar', 'snackbarText', 'isSnackbar'])
}).$mount('#GDMS')
