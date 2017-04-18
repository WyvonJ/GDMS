<template>
  <div class="main-container">
    <wyvonj-header :class="{'nav-hide': !openDrawer}" :username="username" :notifyTitle="notifyTitle"></wyvonj-header>
    <mu-drawer @hide="handleHide" :open="openDrawer" :docked="docked" class="sidebar-drawer" :zDepth="1">
      <div class="console-panel">
        <div class="logo">
          <img src="../../assets/img/gd_logo.png">
          <p class="jnudm">Jnudm</p>
        </div>
        <mu-list class="menu-border" @change="handleMenuChange" :value="menuValue">
        <mu-list-item title="毕业流程" value="procedure">
            <img src="../../assets/icon/timeline.svg" slot="left" alt="student"/>
          </mu-list-item>
          <mu-list-item title="学生管理" toggleNested>
            <img src="../../assets/icon/student.svg" slot="left" alt="student"/>
            <mu-list-item value="stuaccount" slot="nested" title="帐号管理">
              <img src="../../assets/icon/account_box.svg" slot="left" alt="account"/>
            </mu-list-item>
            <mu-list-item value="stutopics" slot="nested" title="选题管理">
              <img src="../../assets/icon/view_comfy.svg" slot="left" alt="view_comfy"/>
            </mu-list-item>
          </mu-list-item>
          <mu-list-item title="导师管理" toggleNested>
            <img src="../../assets/icon/teacher.svg" slot="left" alt="teacher"/>
            <mu-list-item value="tchaccount" slot="nested" title="帐号管理">
              <img src="../../assets/icon/account_box.svg" slot="left" alt="account"/>
            </mu-list-item>
            <mu-list-item value="tchtopics" slot="nested" title="选题管理">
            <img src="../../assets/icon/view_comfy.svg" slot="left" alt="view_comfy"/>
            </mu-list-item>
          </mu-list-item>
          <mu-list-item title="分组管理" toggleNested :open="false">
            <img src="../../assets/icon/group.svg" slot="left" alt="group"/>
            <mu-list-item value="midgroup" slot="nested" title="中期分组">
            <img src="../../assets/icon/assessment.svg" slot="left" alt="assessment"/>
            </mu-list-item>
            <mu-list-item value="finalgroup" slot="nested" title="终期分组">
              <img src="../../assets/icon/assignment.svg" slot="left" alt="assignment"/>
            </mu-list-item>
          </mu-list-item>
          <mu-list-item title="成绩管理" toggleNested :open="false">
            <img src="../../assets/icon/star.svg" slot="left" alt="star"/>
            <mu-list-item value="midgrade" slot="nested" title="中期成绩">
              <img src="../../assets/icon/star_half.svg" slot="left" alt="star_half"/>
            </mu-list-item>
            <mu-list-item value="finalgrade" slot="nested" title="终期成绩">
              <img src="../../assets/icon/turned_in.svg" slot="left" alt="turned_in"/>
            </mu-list-item>
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
import {mapState,mapMutations} from 'vuex'
import WyvonjHeader from '../utils/WyvonjHeader.vue'
import WyvonjFooter from '../utils/WyvonjFooter.vue'

	export default {
		data(){
		const desktop=isDesktop()
			return{
				openDrawer:desktop,
				docked:desktop,
				desktop:desktop,
				menuValue:'',
				username:'管理员',
				notifyTitle:'zazaza'
			}
		},
		methods:{
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
    	handleHide () {
      	if (!this.changeHref) return
      		window.location.hash = this.menuValue
      		this.changeHref = false
    	},
    	toggleNav(){
    		this.openDrawer=!this.openDrawer
    	},
    	handleMenuChange(value){
    		this.menuValue=value
    		this.$router.push('/admin/'+value)
    	}
		},
		components:{
			WyvonjHeader,
			WyvonjFooter
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
.mu-item.show-right {
    padding-right: 48px !important;
}
.mu-item.show-left {
    padding-left: 48px !important;
}
</style>