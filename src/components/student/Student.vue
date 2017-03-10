<template>
  <div class="container">
   <wyvonj-header :class="{'nav-hide': !openDrawer}" showSearchInput :username="username" :notifyTitle="notifyTitle"></wyvonj-header>
    <mu-drawer @hide="handleHide" @close="handleClose" :open="openDrawer" :docked="docked" class="sidebar-drawer" :zDepth="1">
      <div class="console-panel">
        <div class="logo">
          <img src="../../assets/img/gd_logo.png" alt="GDMS">
          <p class="jnudm">JNUDM</p>
        </div>
        <mu-divider />
        <mu-menu :autoWidth="false" :maxHeight="320" :width=256 :desktop="true" :value="menuVal" @change="menuChange">
          <mu-menu-item title="学生选题" value="1" leftIcon="description" @click="topics" />
          <mu-menu-item title="选题结果" value="2" leftIcon="beenhere" @click="status" />
          <mu-menu-item title="答辩分组" value="3" leftIcon="group" @click="grouping" />
          <mu-menu-item title="教师评价" value="4" leftIcon="star_half" @click="evaluation" />
          <mu-menu-item title="联系信息" value="5" leftIcon="contact_phone" @click="contact" />
          <mu-menu-item title="帐号管理" value="6" leftIcon="settings" @click="account" />
        </mu-menu>
      </div>
      <mu-divider />
      <div class="choice-cart">
        <transition name="slide-fade">
          <span class="chosen-topics-title" v-if="selectedInCart[0]">已选课题</span>
        </transition>
        <div class="topic-level">
          <transition-group tag="ul" name="slide-fade">
            <li class="selected-item" v-for="(topic,index) in selectedInCart" v-dragging="{ item: topic, list: selectedInCart, group: 'topic' }" :key="topic._id">
              <mu-avatar :size="20" :backgroundColor="selectedBgc[index]">
                {{index+1}}
              </mu-avatar>
              <div class="selected-item-content">
                <p :class="{'selected-edit' : selectedEdit}">{{topic._id}}.{{topic.title}}</p>
                <transition name="slide-fade">
                  <mu-icon-button v-if="selectedEdit" :class="{'selected-edit' : selectedEdit}" icon="cancel" @click="deleteTopic(index)" />
                </transition>
              </div>
            </li>
          </transition-group>
          <transition name="edit-button-transition" mode="out-in">
            <div v-if="selectedInCart[0]" class="edit-button" :class="{'selected-t1' : selectedInCart[0],'selected-t2' : selectedInCart[1], 'selected-t3' : selectedInCart[2]}">
              <mu-flat-button :icon="selectedEdit?'border_color':'edit'" label="编辑" v-on:click="editTopics" secondary/>
              <mu-flat-button label="提交" icon="offline_pin" @click="commitSelectedTopics" color="#00bcd4
" />
            </div>
          </transition>
        </div>
      </div>
      <mu-dialog :open="dialog" title="选题编辑" @close="close">
        <p>拖动选题排列志愿顺序，点击删除按钮删除选题</p>
        <mu-flat-button slot="actions" secondary @click="close" label="好" />
      </mu-dialog>
    </mu-drawer>
    <transition name="main-transition" appear>
      <router-view :class="{'nav-hide': !openDrawer}"></router-view>
    </transition>
    <md-snackbar md-position="top center" ref="snackbar" md-duration="3000">
      <span>所选课题已提交</span>
      <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">
        Ok
      </md-button>
    </md-snackbar>
    <wyvonj-footer></wyvonj-footer>
  </div>
</template>


<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import WyvonjHeader from '../utils/WyvonjHeader.vue'
import WyvonjFooter from '../utils/WyvonjFooter.vue'
var isDesktop = () => window.innerWidth > 900
export default {
    data() {
            const desktop = isDesktop()
            return {
                openDrawer: desktop,
                docked: desktop,
                desktop: desktop,
                dialog: false,
                firstEdit: true,
                selectedEdit:false,
                menuVal: 1,
                selectedInCart: [],
                username:'lalaland',
                notifyTitle:'可以查看选题情况了',
                selectedBgc:["red500","lightBlueA700","teal500"]
            }
        },
        methods: {
            topics() {
                this.$router.push('/student/topics')
            },
            status() {
                this.$router.push('/student/status')
            },
            grouping() {
                this.$router.push('/student/grouping')
            },
            evaluation() {
                this.$router.push('/student/evaluation')
            },
            contact() {
                this.$router.push('/student/contact')
            },
            account() {
                this.$router.push('/student/account')
            },
            menuChange(val) {
                this.menuVal = val
      			this.$emit('change', val)
            },
            changeNav() {
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
            editTopics() {
                //打开编辑选题对话框
                //弹出编辑对话框 第一次进去才打开
                if (this.firstEdit) {
                    this.dialog = true
                    this.firstEdit = false
                }
                this.selectedEdit=!this.selectedEdit
                this.$children[2].selectable=!this.$children[2].selectable
            },
            handleClose() {
                this.openDrawer=!this.openDrawer
            },
            close() {
                this.dialog = false
            },
            handleHide() {
                
            },
            deleteTopic(index){
        	//删除本条选题
        	this.selectedInCart.splice(index,1)
        	this.selectedEdit=!this.selectedEdit
        	this.$children[2].selectable=!this.$children[2].selectable
     		},
     		//切换侧边栏
            toggleNav() {
            	this.openDrawer=!this.openDrawer
            },
            //提交选题按钮
            commitSelectedTopics() {
            	if (this.selectedInCart.length===0) return
              if (!this.$root.getCookie('user')){
                alert('超时未操作，请重新登录')
                this.$router.push('/')
              }
               var selectedInCartWrapper = {
                    _id: this.$root.getCookie('user'),
                    first: this.selectedInCart[0]._id,
                    second: this.selectedInCart[1]._id,
                    third: this.selectedInCart[2]._id
                }
                this.stuCommitSelection(selectedInCartWrapper).then(() => {
                    this.$refs.snackbar.open()
                }).catch((error) => {
                    console.log(error)
                })
            },
            ...mapActions(['stuCommitSelection'])
        },
        computed: {
          ...mapState(['user','userInfo','notification'])
        },
        components: {
            WyvonjHeader,
            WyvonjFooter
        },
        watch: {},
        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        },
        mounted() {
           //if(!this.$root.getCookie('user')) return this.$router.push('/')
            this.username=this.userInfo.userName
            this.notifyTitle=this.notification
            this.changeNav()
            this.handleResize = () => {
                this.changeNav()
            }
            window.addEventListener('resize', this.handleResize)
            this.$emit('resize')

        }
}

</script>

<style lang="sass" rel="stylesheet/scss">
@import '../../style/variables.scss';
.choice-cart
{
    margin-top: 20px;
    padding: 8px 0;

    transition: $swift-ease-out;

    color: #000;
    .chosen-topics-title
    {
        font-size: 18px;
        font-weight: lighter;

        display: inline-block;

        margin-bottom: 16px;

        text-align: left;
    }
    .mu-flat-button
    {
        display: inline-block;
    }
    .topic-level
    {
        .selected-item
        {
            position: relative;

            width: 256px;
            height: 48px;
            margin-top: 0;

            cursor: move;
            transition: all .25s cubic-bezier(.03,.46,.43,.95);
            &:hover
            {
                background-color: rgba(0,0,0,.1);
            }
            .mu-avatar
                {
                  position: absolute;
                    font-family: $fontCenturyGothic;
                    left: 8px;
                    top: 14px;
                    z-index: 1024;
                }
            .selected-item-content
            {
                position: absolute;
                top: 14px;
                left: 32px;

                width: 218px;
                height: 40px;

                
                p
                {
                    font-size: 12px;
                    font-weight: lighter;

                    position: absolute;
                    left: 0;

                    display: inline-block;

                    width: 240px;

                    transition: $swift-ease-out;
                    text-align: left;
                    &.selected-edit
                    {
                        left: -36px;
                    }
                }
                .mu-icon-button
                {
                    //delete button
                    position: absolute;
                    bottom: 6px;
                    left: 186px;

                    color: #f44336;
                    &.selected-edit
                    {
                        left: 176px;
                    }
                }
            }
        }
        .edit-button
        {
            position: absolute;
            left: 40px;
        }
        .edit-button-transition-enter-active,
        .edit-button-transition-leave-active,
        {
            transition: $swift-ease-out;
        }
        .edit-button-transition-enter,
        .edit-button-transition-leave,
        {
            &.selected-t1
            {
                top: 440px;
            }
            &.selected-t2
            {
                top: 490px;
            }
            &.selected-t3
            {
                top: 540px;
            }
        }
    }
}

@media (max-width: 1280px)
{
    .choice-cart
    {
        margin-top: 4px;
        @media (max-width: 1360px)
        {
            .mu-menu-list
            {
                margin-top: 4px;
            }
            .chosen-topics-title
            {
                margin-bottom: 8px;
            }
        }
        .chosen-topics-title
        {
            font-size: 16px;
        }
        .mu-flat-button
        {
            display: inline-block;
        }
    }
}

.dragging
{
    -webkit-box-shadow: $material-shadow-3dp;
       -moz-box-shadow: $material-shadow-3dp;
            box-shadow: $material-shadow-3dp;
}

.slide-fade-enter-active,
.slide-fade-leave-active
{
    transition: $swift-ease-out;
    transition-duration: .6s;
}

.slide-fade-enter,
.slide-fade-leave-active
{
    transform: translateX(40px);

    opacity: 0;
}
.slide-fade-move
{
    transition: $swift-ease-out;
}

</style>