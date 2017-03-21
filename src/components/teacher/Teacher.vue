<template>
	<div class="container">
    <wyvonj-header :class="{'nav-hide': !openDrawer}" :userName="userName" :notifyContent="notifyContent"></wyvonj-header>
    <mu-drawer @close="handleClose" :open="openDrawer" :docked="docked" class="sidebar-drawer" :zDepth="1">
        <div class="console-panel">
        <div class="logo">
          <img src="../../assets/img/gd_logo.png" alt="GDMS">
          <p class="jnudm">
            JNUDM
          </p>
        </div>
            <mu-menu :desktop="true" :value="menuValue" @change="menuChange">
                <mu-menu-item title="创建选题" value="1" leftIcon="playlist_add" @click="createTopics" />
                <mu-menu-item title="选择学生" value="2" leftIcon="check_circle" @click="confirmTopics" />
                <mu-menu-item title="选题结果" value="3" leftIcon="local_library" @click="confirmResult" />
          			<mu-menu-item title="答辩分组" value="4" leftIcon="group" @click="grouping" />
                <mu-menu-item title="学生评价" value="5" leftIcon="star_half" @click="studentEvaluation" />
                <mu-menu-item title="联系信息" value="6" leftIcon="contact_phone" @click="contact" />
                <mu-menu-item title="帐号管理" value="7" leftIcon="settings" @click="account" />
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
import {mapState,mapMutations} from 'vuex'
import WyvonjHeader from '../utils/WyvonjHeader.vue'
import WyvonjFooter from '../utils/WyvonjFooter.vue'
var isDesktop = () => window.innerWidth > 993
const desktop=isDesktop()
	export default {
		data(){
			return{
				openDrawer:true,
				docked:desktop,
				desktop:desktop,
				firstEdit:true,
				menuValue:1,
				userName:'派大星',
				notifyContent:'可以开始选择二批志愿了。'
			}
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
				this.menuValue=val
				if(!isDesktop())
        	this.handleClose()

			},
			changeNav () {
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
		watch:{
		},
		destroyed(){
    	window.removeEventListener('resize', this.handleResize)
  	},
		mounted(){
			this.changeNav()
			this.handleResize=()=>{
				this.changeNav()
			}
			window.addEventListener('resize',this.handleResize)
		}
		}

</script>