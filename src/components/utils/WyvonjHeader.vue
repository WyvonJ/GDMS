<template>
  <nav class="nav-bar shadow" :style="bgColor">
    <div class="logo" @click="$router.push('/')">
      <img src="../../assets/img/gd_logo.png" alt="GDMS">
      <p class="jnudm">Jnudm</p>
    </div>
    <span class="menu" @click="toggleNav">
      <img src="../../assets/icon/menu.svg" alt="menu" />
    </span>
    <span class="account">
      <img src="../../assets/icon/account_c.svg" alt="account" />
      <span>{{username}}</span>
    </span>
    <div class="notification-info">
      <mu-icon-button tooltip="通知" class="notify-button" ref="notify"  @click="isOpen = !isOpen" >
      <img src="../../assets/icon/notifications.svg" alt="notification" />
      </mu-icon-button>
      <mu-icon-button tooltip="注销" class="logout-button" ref="button" @click="logout">
      <img src="../../assets/icon/exit.svg" alt="exit" />

      </mu-icon-button>
      <mu-popover :trigger="trigger" :open="isOpen" @close="isOpen = false">
        <mu-card>
          <mu-card-text>
            {{notification}}
          </mu-card-text>
        </mu-card>
      </mu-popover>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    username: {
      type: String,
      default: ''
    },
    notification: {
      type: String,
      default: '没有什么新消息。'
    }

  },
  data() {
    return {
      isOpen: false,
      trigger: null,
    }
  },
  methods: {
    toggleNav() {
      this.$parent.toggleNav()
    },
    //登出
    logout() {
      _c.unsetCookie('user', '/', window.location.hostname)
      this.SET_USER({ account: '' })
      this.RESET_STATE()
      this.$router.push('/') //返回登录界面
    },
    ...mapMutations(['SET_USER', 'RESET_STATE'])
  },
  computed: {
    bgColor() {
      let type = window.location.pathname.match(/^\/[a-z]{1}/)[0]
      type = type.substring(1)
      switch (type) {
        case 's':
          return { backgroundColor: '#3f51b5' }
          break
        case 't':
          return { backgroundColor: '#009688' }
          break
        case 'a':
          return { backgroundColor: '#03a9f4' }
      }
    },
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
    .menu
    {
        position: absolute;
        top: 22px;
        left: 196px;

        cursor: pointer;
        transition: $material-enter;

        @media (max-width: 993px)
        {
            left: 16px;
        }
    }
    .account{
        position: absolute;
        top: 22px;
        right: 106px;
        height: 24px;
        display: flex;
        span{
          padding-left: 6px;
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
            display: inline-block;
        }
    }
}

</style>