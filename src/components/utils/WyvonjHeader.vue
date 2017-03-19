<template>
  <header class="nav-bar">
    <div class="logo">
      <img src="../../assets/img/gd_logo.png" alt="GDMS">
      <p class="jnudm">JNUDM</p>
    </div>
    <mu-icon-button icon="menu" @click="toggleNav"></mu-icon-button>
    <!--<mu-text-field hintText="SEARCH" v-if="showSearchInput" type="text" icon="search" @focus="focus" @blur="blur" />-->
    <mu-icon class="search-icon" value="search"/>
    <input type="text" v-if="showSearchInput" @focus="focus" @blur="blur" :class="{'focused':searchFocus}"  placeholder="Search" class="search-input" name="search">
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
.logo
{
    position: relative;
    img
    {
        position: absolute;
        left: 16px;

        display: inline;

        max-width: 64px;
    }
    p.jnudm
    {
        font-family: $fontCenturyGothic;
        font-size: 24px;
        font-weight: lighter;

        position: absolute;
        top: 22px;
        left: 84px;

        color: #fff;
    }
}
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
    .search-icon{

      position: absolute;
      left: 228px;
      top: 10px;
      margin: 12px;
    }
    .search-input{
      position: absolute;
      left: 256px;
      top: 10px;
      border: 0;
      color: #fff;
      padding: 8px;
      font-size: 20px;
      width: 40%;
      margin-left: 20px;
      background-color: #5c6bc0;
      outline: none;
      transition: $material-enter;
      border-radius: 3px;
      &.focused{
        width: 60%;
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

</style>