<template>
  <nav class="nav-bar" :style="bgColor">
    <div class="logo">
      <img src="../../assets/img/gd_logo.png" alt="GDMS">
      <p class="jnudm">Jnudm</p>
    </div>
    <mu-icon-button icon="menu" @click="toggleNav"></mu-icon-button>
    <transition name="search-transition">
      
    </transition>
    <div class="notification-info">
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
  </nav>
</template>


<script>

import { mapState ,mapMutations} from 'vuex'
export default {
  props: {
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
    }
  },
  methods: {
    showNotification() {
      this.openNotification = !this.openNotification
    },
    handleClose(e) {
      this.openNotification = false
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
    bgColor(){
      let type=window.location.pathname.match(/^\/[a-z]{1}/)[0]
      type=type.substring(1)
      switch(type){
        case 's':
          return {backgroundColor:'#3f51b5'}
          break
        case 't':
          return {backgroundColor:'#009688'}
          break
        case 'a':
          return {backgroundColor:'#4a4d4f'}
      }
    },
    ...mapState(['user'])
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

    color: white;
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
    .notification-info
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