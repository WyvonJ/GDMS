<template>
	<div class="container">
    <wyvonj-header :class="{'nav-hide': !openDrawer}" :username="username" :notification="notification"></wyvonj-header>
    <mu-drawer @close="handleClose" :open="openDrawer" :docked="docked" class="sidebar-drawer" :zDepth="1">
        <div class="console-panel">
        <div class="logo">
          <img src="../../assets/img/gd_logo.png" alt="GDMS">
          <p class="jnudm">
            Jnudm
          </p>
        </div>
            <ul class="sidebar-menu no-selection">
              <li @click="createTopics">
                <img src="../../assets/icon/playlist_add.svg" alt="create">
                <span>创建选题</span>
              </li>
              <li @click="confirmTopics">
                <img src="../../assets/icon/check_circle.svg" alt="create">
                <span>选择学生</span>
              </li>
              <li @click="confirmResult">
                <img src="../../assets/icon/local_library.svg" alt="create">
                <span>选题结果</span>
              </li>
              <li @click="grouping">
                <img src="../../assets/icon/group.svg" alt="create">
                <span>答辩分组</span>
              </li>
              <li @click="studentEvaluation">
                <img src="../../assets/icon/star_half.svg" alt="create">
                <span>学生评价</span>
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
import {mapState,mapMutations} from 'vuex'
import WyvonjHeader from '../utils/WyvonjHeader.vue'
import WyvonjFooter from '../utils/WyvonjFooter.vue'
var isDesktop = () => window.innerWidth > 993
const desktop=isDesktop()
	export default {
		data(){
			return{
				openDrawer:desktop,
				docked:desktop,
				desktop:desktop,
				currentMenu:1,
				username:'UNKNOW',
				notification:''
			}
		},
    computed:{
      ...mapState(['user','notification'])
    },
		methods:{
			createTopics(){
				this.$router.push('/teacher/creation')
			},
			confirmTopics(){
				this.$router.push('/teacher/confirmation')
			},
			confirmResult(){
				this.$router.push('/teacher/selectionresult')
			},
       grouping() {
           this.$router.push('/teacher/grouping')
       },
			studentEvaluation(){
				this.$router.push('/teacher/evaluation')
			},
			contact(){
				this.$router.push('/teacher/contact')
			},
			account(){
				this.$router.push('/teacher/account')
			},
			menuChange(val){
				this.currentMenu=val
				if(!isDesktop())
        	this.handleClose()
			},
			changeNav () {
     		const desktop = isDesktop()
     		this.docked = desktop
     		if (desktop === this.desktop) 
          return
     		if (!desktop && this.desktop && this.openDrawer) {
     		  this.openDrawer = false
     		}
     		if (desktop && !this.desktop && !this.openDrawer) {
     		  this.openDrawer = true
     		}
     		this.desktop = desktop
    	}, 
			handleClose () {
      	this.openDrawer=!this.openDrawer
    	},
    	toggleNav(){
          this.openDrawer=!this.openDrawer
    	}
		},
		components:{
			WyvonjHeader,
			WyvonjFooter
		},
		destroyed(){
    	window.removeEventListener('resize', this.handleResize)
  	},
		mounted(){
			if (_c.getCookie('usertype')!=1)
       // return this.$router.push('/')
     
        this.username = _c.getCookie('username')
        this.handleResize = () => {
          this.changeNav()
        }
        window.addEventListener('resize', this.handleResize)
    }
		}

</script>

<style lang="sass" rel="stylesheet/scss">
@import '../../style/variables.scss';
</style>