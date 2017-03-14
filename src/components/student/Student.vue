<template>
  <div class="container">
   <wyvonj-header :class="{'nav-hide': !openDrawer}" :showSearchInput="menuVal==1" :userName="userName" :notifyContent="notifyContent"></wyvonj-header>
    <mu-drawer @hide="handleHide" @close="handleClose" :open="openDrawer" :docked="docked" class="sidebar-drawer" :zDepth="1">
      <div class="console-panel">
        <div class="logo">
          <img src="../../assets/img/gd_logo.png" alt="GDMS">
          <p class="jnudm">
            JNUDM
          </p>
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
          <span class="chosen-topics-title" v-if="selectedInCart[0]">
          &lt;已选课题&gt;
          <md-tooltip md-direction="top">
                选题数限制为三个<br/>
                按照顺序表示第一、二、三志愿<br/>
                每次对已选课题编辑后务必提交
            </md-tooltip>
          </span>
        </transition>
        <div class="topic-level">
          <transition-group tag="ul" name="slide-fade">
            <li class="selected-item" v-for="(topic,index) in selectedInCart" :class="{'selected-edit' : selectedEdit}" v-dragging="{ item: topic, list: selectedInCart, group: 'topic' }" :key="topic._id">
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
var isDesktop = () => window.innerWidth > 993
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
                userName:'lalaland',
                notifyContent:'可以查看选题情况了',
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
                this.stuCommitSelection(selectedInCartWrapper)
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
           if(!this.$root.getCookie('user')) 
                return this.$router.push('/')
            this.userName=this.userInfo.userName
            this.notifyContent=this.notification
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
@keyframes selected-list{
    0%{
        background-color: #f2f2f2;
    }
    50%{
        background-color: #fefefe;
    }

    100%{
        background-color: #f2f2f2;
    }
}
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
            transition: $material-enter;
            &:hover
            {
                background-color: rgba(0,0,0,.1);
            }

                    &.selected-edit
                    {
                        left: -48px;
                    }
             &.selected-edit
            {
                        animation: 1.4s selected-list infinite;
    -webkit-box-shadow: $material-shadow-1dp;
       -moz-box-shadow: $material-shadow-1dp;
            box-shadow: $material-shadow-1dp;
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
                top: 10px;
                left: 32px;

                width: 218px;
                height: 44px;

                p
                {
                    font-size: 12px;
                    font-weight: lighter;

                    position: absolute;
                    left: 0;

                    display: inline-block;

                    width: 218px;

                    transition: $swift-ease-out;
                    text-align: left;
                }
                .mu-icon-button
                {
                    //delete button
                    position: absolute;
                    bottom: 6px;
                    left: 224px;
                    border-radius: 0;
                    background-color: #ff2828;

    -webkit-box-shadow: $material-shadow-1dp;
       -moz-box-shadow: $material-shadow-1dp;
            box-shadow: $material-shadow-1dp;
                    color: #fff;
                    &:hover{
                    background-color: #f44336;

                    }
                }
            }
        }
        .edit-button
        {
            position: relative;
            transition: $swift-ease-out;
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