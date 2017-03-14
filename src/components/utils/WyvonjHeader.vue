<template>
  <header class="nav-bar" :class="{'focused':searchFocus}">
    <mu-icon-button icon="menu" @click="toggleNav"></mu-icon-button>
    <mu-text-field hintText="SEARCH" v-if="showSearchInput" type="text" icon="search" @focus="focus" @blur="blur"/>
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

<style lang="sass" rel="stylesheet/scss" scoped>
@import "../../style/variables";

.nav-bar
{
    position: fixed;
    z-index: 5;
    top: 0;
    right: 0;
    left: 188px;

    width: auto;
    height: 64px;

    -webkit-box-shadow: $material-shadow-1dp;
       -moz-box-shadow: $material-shadow-1dp;
            box-shadow: $material-shadow-1dp;
    &.focused{
      -webkit-box-shadow: $material-shadow-5dp;
       -moz-box-shadow: $material-shadow-5dp;
            box-shadow: $material-shadow-5dp;
    }
    transition: $material-enter;

    background-color: #fafafa;
    &.nav-hide
    {
        left: 0;
    }
    >.mu-icon-button{
      position: absolute;
      left: 8px;
      top: 8px;
    }
    .notify-button{
      position: absolute;
      right: -32px;
      top: 8px;
    }
    .logout-button{
      position: absolute;
      right: -80px;
      top: 8px;
    }
    .mu-text-field
    {
        position: absolute;
        top: 10px;
        left: 60px;

        width: 60%;
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
@media (max-width: 1280px){
  .nav-bar{
    height: 56px;

    >.mu-icon-button{
      top: 4px;
    }
    .notify-button{
      top: 4px;
    }
    .logout-button{
      top: 4px;
    }
    .mu-text-field
    {
        top: 6px;
    }
  }
}
</style>