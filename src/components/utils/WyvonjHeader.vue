<template>
  <header class="nav-bar">
    <div class="logo">
      <img src="../../assets/img/gd_logo.png" alt="GDMS">
      <p class="jnudm">JNUDM</p>
    </div>
    <mu-icon-button icon="menu" @click="toggleNav"></mu-icon-button>
    <div class="search-bar-wrapper" v-if="showSearchInput" :class="{'focused':searchFocus}">
      <mu-icon class="search-icon" value="search"/>
      <input type="text" @focus="focus" @blur="blur"   placeholder="Search" class="search-input" name="search">
    </div>
    
    <div class="noti-info">
      <mu-icon-button tooltip="通知" class="notify-button" ref="notify" icon="notifications" @click="showNotification" />
      <mu-icon-button tooltip="注销" class="logout-button" ref="button" icon="exit_to_app" @click="logout" />
      </mu-badge>
      <mu-popover :trigger="trigger" :open="openNotification" @close="handleClose">
        <mu-card>
          <mu-card-header :title="userName">
            <mu-avatar icon="assignment_turned_in" />
          </mu-card-header>
          <mu-card-text>
            {{notifyContent}}
          </mu-card-text>
        </mu-card>
      </mu-popover>
    </div>
  </header>
</template>


<script>

import { mapState ,mapMutations} from 'vuex'
import {unsetCookie} from '../../utils/cookieUtil'
export default {
  props: {
    showSearchInput: {
      type: Boolean,
      default: false
    } ,
    userName:{
      type:String,
      default:''
    },
    notifyContent:{
      type:String,
      default:'没有什么新消息。'
    }

  },
  data() {
    return {
      notification: 1,
      openNotification: false,
      trigger: null,
      searchFocus:false
    }
  },
  methods: {
    showNotification() {
      this.openNotification = !this.openNotification
    },
    handleClose(e) {
      this.openNotification = false
    },
    focus(){
      this.searchFocus=true
    },
    blur(){
      this.searchFocus=false
    },
    toggleNav() {
      this.$parent.toggleNav()
    },
    //登出
    logout(){
      unsetCookie('user','/',window.location.hostname)
      this.SET_USER({account:'',password:''})
      this.$router.push('/')//返回登录界面
    },
    ...mapMutations(['SET_USER'])
  },
  computed:{
    ...mapState(['user','username'])
  },
  mounted() {
    this.trigger = this.$refs.notify.$el
  }
}

</script>

<style lang="sass" rel="stylesheet/scss">
@import "../../style/variables";
.nav-bar
{
    position: fixed;
    z-index: 201;
    top: 0;
    right: 0;
    left: 0;

    width: auto;
    height: 64px;

    transition: $material-enter;
    color: #fff;
    background-color: #3f51b5;
    > .mu-icon-button
    {
        position: absolute;
        top: 8px;
        left: 188px;
    }
    .notify-button
    {
        position: absolute;
        top: 8px;
        right: -32px;
    }
    .logout-button
    {
        position: absolute;
        top: 8px;
        right: -80px;
    }
    .search-bar-wrapper{
      position: absolute;
      border-radius: 3px;
      height: 48px;
      cursor: text;
      white-space: nowrap;
      padding-left: 48px;
      background-color: #5c6bc0;
      left: 256px;
      width: 40%;
      top: 8px;

      transition: $material-enter;
      &.focused{
        width: 60%;
      }
      .search-icon{

      position: absolute;
      top: 0;
      left: 0;
      margin: 12px;
    }
    .search-input
    {
      position: relative;
      top: 8px;
      border: 0;
      color: #fff;
      font-size: 20px;
      outline: none;
      background-color: transparent;
      width: 90%;
      height: 32px;

    }
    }
    
    .noti-info
    {
        position: absolute;
        top: 0;
        right: 80px;
    }
    .notification-paper
    {
        display: inline-block;

        width: 160px;
        height: 120px;
        margin: 20px;

        text-align: left;
    }
}
@media (max-width: 993px){
  
}

</style>