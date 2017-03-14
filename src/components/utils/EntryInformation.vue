<template>
<transition name="main-transition">
  <div>
  <span class="title">在开始今年的毕业设计前，还有一点小小的信息要填。</span>
  <mu-icon value="edit" :size="24" />
  <div class="info-container">
    <mu-stepper :activeStep="activeStep" orientation="vertical">
      <mu-step>
        <mu-step-label>
          手机号码
        </mu-step-label>
        <mu-step-content>
          <div>
            <mu-text-field hintText="手机号码" type="number" icon="phone" v-model.trim="tel" :errorText="telError" />
          </div>
          <mu-raised-button label="下一步" class="step-button" @click="handleTel" secondary/>
        </mu-step-content>
      </mu-step>
      <mu-step>
        <mu-step-label>
          邮箱地址
        </mu-step-label>
        <mu-step-content>
          <div>
            <mu-text-field hintText="邮箱地址" type="email" icon="email" v-model.trim="email" :errorText="emailError" />
          </div>
          <mu-raised-button label="下一步" class="step-button" @click="handleEmail" secondary/>
          <mu-flat-button label="上一步" class="step-button" @click="handlePrev" />
        </mu-step-content>
      </mu-step>
      <mu-step v-if="userType">
        <mu-step-label>
          请填写您的办公室位置
          <br>
        </mu-step-label>
        <mu-step-content>
          <mu-text-field icon="desktop_mac" hintText="OFFICE" v-model="office" />
          <mu-raised-button label="下一步" class="step-button" @click="handleOffice" secondary/>
          <mu-flat-button label="上一步" class="step-button" @click="handlePrev" />
        </mu-step-content>
      </mu-step>
      <mu-step>
        <mu-step-label>
          附加联系信息（可选）
        </mu-step-label>
        <mu-step-content>
          <div>
           <img src="../../assets/icon/qq.svg" />
            <mu-text-field hintText="QQ" v-model="qq" />
            <br/>
           <img src="../../assets/icon/wechat.svg" />
            <mu-text-field hintText="Wechat" v-model="wechat" />
          </div>
          <mu-raised-button label="下一步" class="step-button" @click="handleAdd" secondary/>
          <mu-flat-button label="上一步" class="step-button" @click="handlePrev" />
        </mu-step-content>
      </mu-step>
      
      <mu-step v-if="userType">
        <mu-step-label>
          请选择您的研究领域以及技艺占比（重要）
          <br>
        </mu-step-label>
        <mu-step-content>
          <div class="slider">
            <span class="class-left">技术{{classratio}}%</span>
            <mu-slider v-model="classratio" class="ratio-slider" :max="100" :min="0" :step="1" />
            <span class="class-right">艺术{{100-classratio}}%</span>
          </div>
          <div class="fields">
            <mu-select-field v-model="fields" multiple :labelFocusClass="['label-foucs']" :errorText="fieldsError" label="您的研究领域" @change="fieldsChange" labelFloat>
              <mu-sub-header>可多选</mu-sub-header>
              <mu-menu-item v-for="text,index in fieldsData" :value="text" :title="text" />
            </mu-select-field>
          </div>
          <mu-raised-button label="下一步" class="step-button" @click="handleFields" secondary/>
          <mu-flat-button label="上一步" class="step-button" @click="handlePrev" />
        </mu-step-content>
      </mu-step>
      <mu-step v-else>
        <mu-step-label>
          简单地介绍一下你的强项
        </mu-step-label>
        <mu-step-content>
          <div>
            <mu-text-field hintText="自我介绍" v-model.trim="intro" multiLine @textOverflow="handleOverflow" :errorText="introError" :rows="3" :rowsMax="6" :maxLength="80" />
          </div>
          <mu-raised-button label="下一步" class="step-button" @click="handleIntro" secondary/>
          <mu-flat-button label="上一步" class="step-button" @click="handlePrev" />
        </mu-step-content>
      </mu-step>
      <mu-step>
        <mu-step-label>
          一切就绪
        </mu-step-label>
        <mu-step-content>
          <p>
            填好了联系信息就可以开始选题了，好好选择毕业设计的题目吧。
          </p>
          <mu-raised-button label="完成" class="step-button" @click="handleFinish" secondary/>
          <mu-flat-button label="上一步" class="step-button" @click="handlePrev" />
        </mu-step-content>
      </mu-step>
    </mu-stepper>
    <p v-if="finished">
      都完成啦!<a href="javascript:;" @click="reset">点这里</a>可以重置
    </p>
  </div>
</div>

</transition>
</template>


<script>
import {mapActions} from 'vuex'
export default {
  data() {
      return {
        activeStep: 0,
        telError: '',
        emailError:'',
        fieldsError:'',
        introError:'',
        userType:0,
        classratio:50,
          account:'',
          tel:'',
          email:'',
          qq:'',
          wechat:'',
          office:'',
          intro:'',
          office:'',
          fields:[],
           fieldsData: ["计算机视觉", "iOS开发", "Android开发", "前端开发", "计算机图形学", "信息可视化", "云计算", "计算机网络", "人工智能"]
      }
    },
    computed: {
      finished() {
        var steps=(this.userType ? 4 : 3)
        return this.activeStep > steps
      }
    },
    methods: {
      isEmail(strEmail) {
        return strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1
      },
      handleTel() {
        this.show=true
        var tel=this.tel.toString()
        this.tel=tel
        if(tel.length!=11){
          //好像能输入小数点 需改进
          this.telError='请输入正确的手机号码。'
        }else{
          this.activeStep++
        }
          this.activeStep++
        
      },
      fieldsChange(value){
        this.fields=value
      },
      handleFields(){

        if (this.fields.length == 0) {
          return this.fieldsError = "还没选择课题研究方向。"
        }else{
           this.activeStep++
        }
       
      },
      handleEmail() {
         if(this.isEmail(this.email)){
           this.activeStep++
        }else{
          this.emailError='请输入正确格式的邮箱地址。'
        }this.activeStep++
      },
      handleAdd() {
        this.activeStep++
      },
      handleOffice(){
        this.activeStep++
      },
      handleIntro(){
        if (this.intro.length<=80) {
          this.activeStep++
        }
      },
      handleOverflow(){
        this.introError="字数超过了，再精简点。"
      },
      handlePrev() {
        this.activeStep--
      },
      reset() {
        this.tel=''
        this.email=''
        this.qq=''
        this.wechat=''
        this.intro=''
        this.office=''
        this.classratio=50
        this.fields=[]
        this.activeStep = 0
      },
      handleFinish() {
        //if(!this.account) 
        this.account=this.$root.getCookie('user')
        if (!this.userType) {
          this.stuSetContactData({
            account:this.account,
            tel:this.tel,
            email:this.email,
            qq:this.qq,
            wechat:this.wechat,
            intro:this.intro
          })
          .then(()=>{
            this.$router.push({path:'/student/topics'})
          })
        }else{
          this.tchSetContactData({
            account:this.account,
            tel:this.tel,
            email:this.email,
            qq:this.qq,
            wechat:this.wechat,
            office:this.office,
            classratio:this.classratio,
            fields:this.fields
          })
          .then(()=>{
            this.$router.push({path:'/teacher/creation'})
          })
        }
        
      },
      clearError(){
        this.emailError=''
        this.telError=''
        this.fieldsError=''
        this.introError=''
      },
      ...mapActions(['stuSetContactData','tchSetContactData'])
    },
    mounted(){
      this.userType=this.$store.state.userInfo.userType
    },
    watch:{
      email:'clearError',
      tel:'clearError',
      fields:'clearError',
      intro:'clearError'
    }
}

</script>

<style lang="sass" rel="stylesheet.scss" scoped>
span.title
{
    font-size: 28px;
    font-weight: 100;
    line-height: 28px;

    display: inline-block;

    margin-top: 50px;
    padding: 24px;
}
.info-container
{
    max-width: 380px;
    max-height: 600px;
    margin: 4vw auto;
}
.mu-text-field-multiline
{
    width: 300px;
    height: 70px;
}

.step-button
{
    margin-top: 12px;
    margin-right: 12px;
}
.slider
{
    height: 24px;
    margin-top: 12px;
    span
    {
        font-size: 12px;

        position: absolute;
        top: 15px;

        display: inline-block;
    }
    .class-left
    {
        left: 0;
    }
    .class-right
    {
        right: 0;
    }
    .mu-slider
    {
        position: absolute;
        left: 60px;

        display: inline-block;

        width: 200px;
        margin-bottom: 0;
    }
}
.fields
{
    .mu-text-field
    {
        width: 320px !important;
    }
}

</style>