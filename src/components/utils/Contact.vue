<template>
  <div class="contact-container">
    <div class="wrapper">
    <div class="message-container" :class="{'warning':warningMsg.length>0,'success':success}">
        {{warningMsg}}
      </div>
      <mu-select-field v-model="fields" multiple :labelFocusClass="['label-foucs']" label="导师研究方向"  class="select-field" labelFloat v-if="usertype">
                <mu-sub-header>可多选</mu-sub-header>
                <mu-menu-item v-for="text,index in fieldsData" :value="text" :title="text" />
              </mu-select-field>
      <div class="addon-input">
        <span class="input-addon">
            <i class="material-icons">phone</i>
          </span>
        <input type="number" placeholder="电话" v-model.trim="contact.tel" />
      </div>
      <div class="addon-input">
        <span class="input-addon">
            <i class="material-icons">mail</i>
          </span>
        <input type="email" placeholder="邮箱" v-model.trim="contact.email" />
      </div>
      <div class="addon-input" v-if="usertype">
        <span class="input-addon">
             <img src="../../assets/icon/office.svg" alt="QQ" />
          </span>
        <input type="text" placeholder="办公室" v-model.trim="contact.office" />
      </div>
      <div class="addon-input">
        <span class="input-addon">
             <img src="../../assets/icon/qq.svg" alt="QQ" />
          </span>
        <input type="number" placeholder="QQ" v-model.trim="contact.qq" />
      </div>
      <div class="addon-input">
        <span class="input-addon">
             <img src="../../assets/icon/wechat.svg" alt="WECHAT" />
          </span>
        <input type="text" placeholder="微信" v-model.trim="contact.wechat" />
      </div>
      <br/>
      <mu-raised-button class="update" @click="commitContact" backgroundColor="blue" label="更新联系方式"/>
    </div>
  </div>
  </div>
</template>


<script>
import {mapActions} from 'vuex'
  export default{
    data(){
      return {
        usertype:0,
        warningMsg: '',
        success: false,
        fields: [],
        fieldsData: [
          "1.图形图像处理", "2.游戏开发设计", "3.信息可视化",
          "4.数字视音频处理", "5.移动互联网", "6.软件工程",
          "7.Web开发", "8.人机交互", "9.虚拟现实&增强现实",
          "10.文化传媒", "11.信息安全", "12.信号处理",
          "13.云计算", "14.大数据", "15.机器学习&深度学习",
          "16.算法研究", "17.其他"
        ],
        contact:{
          tel:'',
          email:'',
          qq:'',
          wechat:'',
          office:'',
        }
      }
    },
    methods:{
      commitContact(){
        let fd=[]
        for(let i=0,len=this.fields.length;i<len;i++){
          fd.push(this.fields[i].split('.')[0])
        }
        if (fd.length>0) {
          this.contact.fields = fd
        }
        let routes = this.usertype=='0'?'/student/stuSetContact':'/teacher/tchSetContact'
        let wrapper={
          account:cookie.get('user'),
          contact:this.contact
        }
        this.POST(routes,wrapper)
          .then(res => {
            if(res.data.state === 1){
              this.success = true
                this.warningMsg = '联系方式已更新'
            }else{
                this.warningMsg = '更新联系方式失败！'
              }
          })
          .catch((err)=>{
            this.warningMsg = '更新联系方式失败！'
          })
      },
      clearError() {
        this.warningMsg = ''
        this.success = false
      }
    },
    watch:{
      contact:'clearError'
    },
    mounted(){
       this.usertype = _.parseInt(cookie.get('usertype'))
        let routes = this.usertype=='0' ? '/student/stuGetContact':'/teacher/tchGetContact'
        let user=cookie.get('user')
          this.GET(routes+'?account='+user)
          .then(res => {
            this.contact = res.data
          })
          .catch(err=>{
            this.warningMsg = '请求数据失败！'
          })
       }
  }
</script>

<style lang="sass" rel="stylesheet/scss">
@import '../../style/variables.scss';
.addon-input
{
    position: relative;

    display: flex;

    width: 300px;
    height: 48px;
    margin: 30px 0;
margin-top:0;
    cursor: text;
    white-space: nowrap;

    background-color: transparent;
    .input-addon
    {
        display: table-cell;

        padding: 12px 12px;

        text-align: center;
        vertical-align: middle;

        border: 1px solid #ccc;
        border-right-color: transparent;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        background-color: #eee;
    }
    input
    {
        font-size: 18px;

        width: 256px;
        height: 48px;
        padding: 4px;

        transition: $material-enter;

        border: 1px solid #ccc;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        background-color: transparent;

        flex: 1;
        &:focus
        {
            z-index: 3;

            border-color: #66afe9;
            outline: 0;
            -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
                    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
        }
    }
}

    .message-container
    {
        font-size: 20px;
        font-weight: 400;

        height: 48px;

        transition: $material-enter;
        text-align: center;
        line-height: 48px;
        color: white;
        border: 1px transparent solid;
        border-radius: 4px;
        margin-bottom: 24px;
        &.warning
        {
            border-color: $red;
            background-color: #e57373;
        }
        &.success
        {
            border-color: $greenVue;
            background-color: #7bb99c;
        }
    }
.contact-container
{
    display: flex;

    align-items: flex-start;
    justify-content: center;
    .wrapper
    {
        margin-top: 64px;
        padding: 24px 16px 16px;
    }
    button.update
    {
           width: 300px;
           justify-content:center;

            height: 48px;
            font-size: 18px;
    }
}

</style>