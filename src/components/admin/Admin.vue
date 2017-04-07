<template>
	<div class="container">
		<wyvonj-header :class="{'nav-hide': !openDrawer}" :username="username" :notifyTitle="notifyTitle"></wyvonj-header>
			<mu-drawer @hide="handleHide"
							 @close="handleClose"
							 :open="openDrawer"
							 :docked="docked"
							 class="sidebar-drawer"
							 :zDepth="1">
					<div class="console-panel">
					 <div class="logo">
          <img src="../../assets/img/gd_logo.png">
          <p class="jnudm">Jnudm</p>
        </div>
						<mu-menu :autoWidth="false"
										 :maxHeight="320"
										 :width=256
										 :desktop="true"
										 :value="menuVal"
										  @change="menuChange">
								<mu-menu-item title="学生管理" 
															leftIcon="account_box"
															@click="studentUpload" value="1"/>
								<mu-menu-item title="教师管理" 
															leftIcon="person_add"
															@click="teacherUpload" value="2"/>
								<mu-menu-item title="答辩分组"
													  	leftIcon="group"
													  	@click="grouping" value="3"/>
								<mu-menu-item title="教师评价" 
															leftIcon="star"
															@click="teacherEvaluation" value="4"/>
						</mu-menu>	
					</div>
			</mu-drawer>
     <transition name="main-transition" appear>
      <router-view :class="{'nav-hide': !openDrawer}" class="main-content"></router-view>
    </transition>
</div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import WyvonjHeader from '../utils/WyvonjHeader.vue'
	export default {
		data(){
		const desktop=isDesktop()
			return{
				openDrawer:desktop,
				docked:desktop,
				desktop:desktop,
				menuVal:1,
				username:'管理员',
				notifyTitle:'zazaza'
			}
		},
		methods:{
			studentUpload(){
				this.$router.push('/admin/studentupload')
			},
			teacherUpload(){
				this.$router.push('/admin/teacherupload')
			},
			grouping(){
				this.$router.push('/admin/replygroup')
			},
			teacherEvaluation(){
				this.$router.push('/admin/contact')
			},
    	close () {
      	this.dialog = false
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
      	this.$emit('close')
    	},
    	handleHide () {
      	if (!this.changeHref) return
      		window.location.hash = this.menuVal
      		this.changeHref = false
    	},
    	toggleNav(){
    		this.openDrawer=!this.openDrawer
    	},
            menuChange(val) {
                this.menuVal = val
      			this.$emit('change', val)
            }
		},
		computed:{

		},
		components:{
			WyvonjHeader
		},
		watch:{
		},
		mounted(){
			this.changeNav()
			this.handleResize=()=>{
				this.changeNav()
			}
			window.addEventListener('resize',this.handleResize)
		},
		destroyed(){
    	window.removeEventListener('resize', this.handleResize)
  	}
	}
	function isDesktop () {
  return window.innerWidth > 993
}
</script>

<style lang="sass" rel="stylesheet/scss">
</style>