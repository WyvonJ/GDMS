<template>
  <div class="main-container">
    <wyvonj-header :class="{'nav-hide': !openDrawer}" :username="username" :notification="notification"></wyvonj-header>
    <mu-drawer @hide="handleDrawerClose" :open="openDrawer" :docked="docked" class="sidebar-drawer" :zDepth="1">
      <div class="console-panel">
        <div class="logo">
          <img src="../../assets/img/gd_logo.png">
          <p class="jnudm">Jnudm</p>
        </div>
        <mu-list class="menu-border" @change="handleMenuChange" :value="menuValue">
        <mu-list-item title="毕业流程" value="procedure">
            <img src="../../assets/icon/timeline.svg" slot="left" alt="student"/>
          </mu-list-item> 
          <mu-list-item  title="课题管理" value="tchtopics">
            <img src="../../assets/icon/view_comfy.svg" slot="left" alt="view_comfy"/>
            </mu-list-item>
          <mu-list-item title="导师帐号"  value="tchaccount">
            <img src="../../assets/icon/teacher.svg" slot="left" alt="teacher"/>
            
          </mu-list-item>
          <mu-list-item title="学生帐号" value="stuaccount">
            <img src="../../assets/icon/student.svg" slot="left" alt="student"/>
          </mu-list-item>
         
          <mu-list-item title="分组管理" toggleNested >
            <img src="../../assets/icon/group.svg" slot="left" alt="group"/>
            <mu-list-item value="middlegroup" slot="nested" title="中期分组">
              <img src="../../assets/icon/assessment.svg" slot="left" alt="middle"/>
            </mu-list-item>
            <mu-list-item value="finalgroup" slot="nested" title="终期分组">
              <img src="../../assets/icon/assignment.svg" slot="left" alt="final"/>
            </mu-list-item>
          </mu-list-item>
          <mu-list-item title="成绩管理" value="studentgrade">
            <img src="../../assets/icon/star.svg" slot="left" alt="star"/>
          </mu-list-item>
          <mu-list-item title="系统重置" value="resetsystem">
            <img src="../../assets/icon/reset.svg" slot="left" alt="star"/>
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
        if (desktop === this.desktop) return
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
    mounted() {
      this.handleResize = () => {
        this.changeNav()
      }
      window.addEventListener('resize', this.handleResize)
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    }
}

</script>
