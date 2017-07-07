<template>
  <div class="main-container">
    <wyvonj-header :class="{'nav-hide': !openDrawer}" :username="username" :notification="notification"></wyvonj-header>
    <mu-drawer @close="handleDrawerClose" :open="openDrawer" :docked="docked" class="sidebar-drawer" :zDepth="1">
      <div class="console-panel">
        <div class="logo">
          <img src="../../assets/img/gd_logo.png">
          <p class="jnudm">Jnudm</p>
        </div>
        <mu-list class="menu-border" @change="handleMenuChange" :value="menuValue">
          <mu-list-item title="毕业流程" value="procedure">
            <svg width="24" height="24" viewBox="0 0 24 24" slot="left">
             <path d="M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z" fill="#747474"/>
          </svg>
          </mu-list-item>
          <mu-list-item title="课题管理" value="tchtopics">
            <img src="../../assets/icon/view_comfy.svg" slot="left" alt="view_comfy" />
          </mu-list-item>
          <mu-list-item title="导师帐号" value="tchaccount">
            <img src="../../assets/icon/teacher.svg" slot="left" alt="teacher" />
          </mu-list-item>
          <mu-list-item title="学生帐号" value="stuaccount">
            <img src="../../assets/icon/student.svg" slot="left" alt="student" />
          </mu-list-item>
          <mu-list-item value="middle" title="中期分组">
            <img src="../../assets/icon/dashboard.svg" slot="left" alt="middle" />
          </mu-list-item>
          <mu-list-item value="final" title="最终分组">
            <img src="../../assets/icon/group.svg" slot="left" alt="final" />
          </mu-list-item>
          <mu-list-item title="成绩管理" value="studentgrade">
            <img src="../../assets/icon/star.svg" slot="left" alt="star" />
          </mu-list-item>
          <mu-list-item title="系统重置" value="resetsystem">
            <img src="../../assets/icon/reset.svg" slot="left" alt="star" />
          </mu-list-item>
        </mu-list>
      </div>
    </mu-drawer>
    <transition name="main-transition" appear>
      <router-view :class="{'nav-hide': !openDrawer}" class="main-content"></router-view>
    </transition>
    <wyvonj-footer></wyvonj-footer>
  </div>
</template>


<script>
import { mapState, mapMutations } from 'vuex'
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
        menuValue: 'procedure',
        username: '管理员',
        notification: 'zazaza'
      }
    },
    methods: {
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
      handleMenuChange(value) {
        this.menuValue = value
        this.$router.push('/admin/' + value)
        if (!isDesktop())
          this.handleDrawerClose()
      },
      handleDrawerClose() {
        this.openDrawer = !this.openDrawer
      },
      toggleNav() {
        this.openDrawer = !this.openDrawer
      }

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
      this.handleResize = () => {
        this.changeNav()
      }
      window.addEventListener('resize', this.handleResize)
    }
}

</script>

<style type="text/css" media="screen" scoped>
  svg{
    color: #f44336;
  }
</style>
