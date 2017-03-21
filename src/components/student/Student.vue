<template>
  <div class="container">
   <wyvonj-header :class="{'nav-hide': !openDrawer}" :showSearchInput="menuVal==1" :userName="userName" :notifyContent="notifyContent"></wyvonj-header>
    <mu-drawer @close="handleClose" :open="openDrawer" :docked="docked" class="sidebar-drawer" :zDepth="1">
      <div class="console-panel">
        <div class="logo">
          <img src="../../assets/img/gd_logo.png" alt="GDMS">
          <p class="jnudm">
            JNUDM
          </p>
        </div>
        <mu-menu :autoWidth="false" :desktop="true" :value="menuVal" @change="handleMenuChange">
          <mu-menu-item title="学生选题" value="1" leftIcon="description" @click="topics" />
          <mu-menu-item title="选题结果" value="2" leftIcon="beenhere" @click="status" />
          <mu-menu-item title="答辩分组" value="3" leftIcon="group" @click="grouping" />
          <mu-menu-item title="教师评价" value="4" leftIcon="star_half" @click="evaluation" />
          <mu-menu-item title="联系信息" value="5" leftIcon="contact_phone" @click="contact" />
          <mu-menu-item title="帐号管理" value="6" leftIcon="settings" @click="account" />
        </mu-menu>
      </div>
      <mu-divider/>
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
var isDesktop = () => window.innerWidth > 993
export default {
    data() {
            const desktop = isDesktop()
            return {
                openDrawer: desktop,
                docked: desktop,
                desktop: desktop,
                dialog: false,
                menuVal: 1,
                userName:'lalaland',
                notifyContent:'可以查看选题情况了',
                
            }
        },
        methods: {
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
            handleMenuChange(val) {
             this.menuVal = val
             if(!isDesktop())
              this.handleClose()
            },
            changeNav() {
                const desktop = isDesktop()
                this.docked = desktop
                if (desktop === this.desktop) return
                if (!desktop && this.desktop && this.openDrawer) {
                    this.openDrawer = false
                }
                if (desktop && !this.desktop && !this.openDrawer) {
                    this.openDrawer = true
                }
                this.desktop = desktop
            },
            handleClose() {
                this.openDrawer=!this.openDrawer
            },
            close() {
                this.dialog = false
            },
     		//切换侧边栏
            toggleNav() {
            	this.openDrawer=!this.openDrawer
            }
        },
        computed: {
          ...mapState(['user','userInfo','notification'])
        },
        components: {
            WyvonjHeader,
            WyvonjFooter
        },
        watch: {},
        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        },
        mounted() {
           //if(!this.$root.getCookie('user')) 
             //   return this.$router.push('/')
            this.userName=this.userInfo.userName
            this.notifyContent=this.notification
            this.changeNav()
            this.handleResize = () => {
                this.changeNav()
            }
            window.addEventListener('resize', this.handleResize)
            this.$emit('resize')

        }
}

</script>

<style lang="sass" rel="stylesheet/scss">
@import '../../style/variables.scss';

</style>