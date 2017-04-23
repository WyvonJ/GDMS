<template>
	<div class="main-container">
    <wyvonj-header :class="{'nav-hide': !openDrawer}" :username="username" :notification="notification"></wyvonj-header>
    <mu-drawer @close="handleClose" :open="openDrawer" :docked="docked" class="sidebar-drawer" :zDepth="1">
        <div class="console-panel">
        <div class="logo">
          <img src="../../assets/img/gd_logo.png" alt="GDMS">
          <p class="jnudm">
            Jnudm
          </p>
        </div>
            <mu-list class="menu-border" @change="handleMenuChange" :value="menuValue">
              <mu-list-item value="creation" title="创建选题">
                <img src="../../assets/icon/playlist_add.svg" slot="left" alt="description"/>
              </mu-list-item>
              <mu-list-item value="confirmation" title="选择学生">
                <img src="../../assets/icon/check_circle_grey.svg" slot="left" alt="beenhere"/>
              </mu-list-item>
              <mu-list-item value="selectionresult" title="选题结果">
                <img src="../../assets/icon/local_library.svg" slot="left" alt="description"/>
              </mu-list-item>
              <mu-list-item value="grouping" title="答辩分组" >
                <img src="../../assets/icon/group.svg" slot="left" alt="description"/>
              </mu-list-item>
              <mu-list-item value="evaluation" title="学生评价">
                <img src="../../assets/icon/star_half.svg" slot="left" alt="description"/>
              </mu-list-item>
              <mu-list-item value="contact" title="联系信息">
                <img src="../../assets/icon/contact_phone.svg" slot="left" alt="description"/>
              </mu-list-item>
              <mu-list-item value="account" title="帐号管理">
                <img src="../../assets/icon/settings.svg" slot="left" alt="description"/>
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
var isDesktop = () => window.innerWidth > 993
const desktop=isDesktop()
	export default {
		data(){
			return{
				openDrawer:desktop,
				docked:desktop,
				desktop:desktop,
				menuValue:1,
				username:'UNKNOW',
				notification:''
			}
		},
    computed:{
      ...mapState(['user','notification'])
    },
		methods:{
			handleMenuChange(value){
				this.menuValue=value
        this.$router.push('/teacher/'+value)
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