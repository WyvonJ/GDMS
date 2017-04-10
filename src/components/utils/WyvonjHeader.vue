<template>
  <header class="nav-bar">
    <div class="logo">
      <img src="../../assets/img/gd_logo.png" alt="GDMS">
      <p class="jnudm">Jnudm</p>
    </div>
    <mu-icon-button icon="menu" @click="toggleNav"></mu-icon-button>
    <transition name="search-transition">
      <div class="search-bar-wrapper" v-show="showSearchInput" >
      <mu-icon class="search-icon" value="search"/>
      <input type="text" @focus="focus" :class="{'focused':searchFocus}" @blur="blur" @keyup.enter="search" v-model.trim="str" placeholder="Search" class="search-input" name="search">
    </div>
    </transition>
    <div class="noti-info">
      <mu-icon-button tooltip="通知" class="notify-button" ref="notify" icon="notifications" @click="showNotification" />
      <mu-icon-button tooltip="注销" class="logout-button" ref="button" icon="exit_to_app" @click="logout" />
      </mu-badge>
      <mu-popover :trigger="trigger" :open="openNotification" @close="handleClose">
        <mu-card>
          <mu-card-header :title="username">
            <mu-avatar icon="assignment_turned_in" />
          </mu-card-header>
          <mu-card-text>
            {{notification}}
          </mu-card-text>
        </mu-card>
      </mu-popover>
    </div>
  </header>
</template>


<script>

import { mapState ,mapMutations} from 'vuex'
//import {unsetCookie} from '../../utils/cookieUtil'
export default {
  props: {
    showSearchInput: {
      type: Boolean,
      default: false
    } ,
    username:{
      type:String,
      default:''
    },
    notification:{
      type:String,
      default:'没有什么新消息。'
    }

  },
  data() {
    return {
      openNotification: false,
      trigger: null,
      searchFocus:false,
      str:''
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
    search(){
      this.$emit('search',this.str)
    },
    toggleNav() {
      this.$parent.toggleNav()
    },
    //登出
    logout(){
      _c.unsetCookie('user','/',window.location.hostname)
      this.SET_USER({account:'',password:''})
      this.RESET_STATE()
      this.$router.push('/')//返回登录界面
    },
    ...mapMutations(['SET_USER','RESET_STATE'])
  },
  computed:{
    ...mapState(['user'])
  },
  watch:{
    str:'search'
  },
  mounted() {
    this.trigger = this.$refs.notify.$el
  }
}

</script>

<style lang="sass" rel="stylesheet/scss">
@import '../../style/variables';
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
        @media (max-width: 993px)
        {
            left: 8px;
        }
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
    .search-bar-wrapper
    {
        position: absolute;
        top: 8px;
        left: 256px;

        width: 40%;
        height: 48px;
        padding-left: 48px;

        cursor: text;
        transition: $material-enter;
        white-space: nowrap;
        border: 1px white solid;
        border-radius: 3px;
        background-color: $indigo;
        .search-icon
        {
            position: absolute;
            top: 0;
            left: 0;

            margin: 12px;
        }
        .search-input
        {
            font-size: 20px;

            position: relative;
            top: 8px;

            width: 100%;
            height: 32px;

            color: #fff;
            border: 0;
            outline: none;
            background-color: transparent;
            &.focused
            {
                width: 120%;
            }
        }
        @media (max-width:993px)
        {
            display: none;
        }
    }
    input::-webkit-input-placeholder
    {
        font-variant: small-caps;
    }
    input::-moz-input-placeholder
    {
        font-variant: small-caps;
    }
    input::-ms-input-placeholder
    {
        font-variant: small-caps;
    }
    input::-o-input-placeholder
    {
        font-variant: small-caps;
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
    @media (max-width: 993px)
    {
        .logo
        {
            display: none;
        }
    }
}

.search-transition-enter-active
{
    transition: $material-enter;
    transition-delay: .3s !important;
}

.search-transition-enter
{
    transform: translateX(-40px);

    opacity: 0;
}

.search-transition-leave-active
{
    transform: translateX(40px);

    opacity: 0;
}

</style>