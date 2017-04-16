<template>
  <div class="container">
   <wyvonj-header :class="{'nav-hide': !openDrawer}" :showSearchInput="currentMenu===1" @search="search" :username="username" :notification="notification"></wyvonj-header>
    <mu-drawer @close="handleDrawerClose" :open="openDrawer" :docked="docked" class="sidebar-drawer" :zDepth="1">
      <div class="console-panel">
        <div class="logo">
          <img src="../../assets/img/gd_logo.png" alt="GDMS">
          <p class="jnudm">
            Jnudm
          </p>
        </div>
        <ul class="sidebar-menu no-selection">
              <li @click="topics">
                <img src="../../assets/icon/description.svg" alt="create">
                <span>学生选题</span>
              </li>
              <li @click="status">
                <img src="../../assets/icon/beenhere.svg" alt="create">
                <span>选题结果</span>
              </li>
              <li @click="grouping">
                <img src="../../assets/icon/group.svg" alt="create">
                <span>答辩分组</span>
              </li>
              <li @click="evaluation">
                <img src="../../assets/icon/star_half.svg" alt="create">
                <span>教师评价</span>
              </li>
              <li @click="contact">
                <img src="../../assets/icon/contact_phone.svg" alt="create">
                <span>联系信息</span>
              </li>
              <li @click="account">
                <img src="../../assets/icon/settings.svg" alt="create">
                <span>帐号管理</span>
              </li>
            </ul>
      </div>
    </mu-drawer>
    
    <transition name="main-transition" appear>
      <router-view :class="{'nav-hide': !openDrawer}" class="main-content"></router-view>
    </transition>

    <wyvonj-footer></wyvonj-footer>
  </div>
</template>


<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import WyvonjHeader from '../utils/WyvonjHeader.vue'
import WyvonjFooter from '../utils/WyvonjFooter.vue'
let isDesktop = () => window.innerWidth > 993
export default {
  data() {
      const desktop = isDesktop()
      return {
        openDrawer: desktop,
        docked: desktop,
        desktop: desktop,
        currentMenu: 1,
        username: 'UNKNOWN',
        notification: '',
      }
    },
    methods: {
      search(str) {
        this.$children[2].searchStr = str
      },
      topics() {
        this.$router.push('/student/topics')
      },
      status() {
        this.$router.push('/student/status')
      },
      grouping() {
        this.$router.push('/student/grouping')
      },
      evaluation() {
        this.$router.push('/student/evaluation')
      },
      contact() {
        this.$router.push('/student/contact')
      },
      account() {
        this.$router.push('/student/account')
      },
      handleMenuChange(value) {
        this.currentMenu = value
        if (!isDesktop())
          this.handleDrawerClose()
      },
      changeNav() {
        const desktop = isDesktop()
        this.docked = desktop
        if (desktop === this.desktop)
          return
        if (!desktop && this.desktop && this.openDrawer)
          this.openDrawer = false
        if (desktop && !this.desktop && !this.openDrawer)
          this.openDrawer = true
        this.desktop = desktop
      },
      handleDrawerClose() {
        this.openDrawer = !this.openDrawer
      },
      toggleNav() {
        this.openDrawer = !this.openDrawer
      }
    },
    computed: {
      ...mapState(['user', 'notification'])
    },
    components: {
      WyvonjHeader,
      WyvonjFooter
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },
    mounted() {
      //if (_c.getCookie('usertype') != 0)
      //return this.$router.push('/')
      this.username = _c.getCookie('username')
      this.handleResize = () => {
        this.changeNav()
      }
      window.addEventListener('resize', this.handleResize)
    }
}

</script>

<style lang="sass" rel="stylesheet/scss">

</style>