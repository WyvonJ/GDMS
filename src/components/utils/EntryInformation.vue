<template>
<transition name="main-transition">
  <div>
  <span class="title">在开始今年的毕业设计前，还有一点小小的信息要填</span>
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
      <mu-step>
        <mu-step-label>
          附加联系信息（可选）
        </mu-step-label>
        <mu-step-content>
          <div>
            <svg t="1488947105769" class="qq" style="" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="885" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32">
              <path d="M274.432 479.232l-1.024-3.072v-4.096l-1.024-2.048v-10.24l1.024-4.096 1.024-4.096 1.024-4.096 2.048-4.096 3.072-5.12 3.072-5.12v-6.144l1.024-5.12 1.024-4.096 2.048-6.144 1.024-2.048 1.024-2.048 1.024-3.072 2.048-2.048v-11.264l1.024-6.144 1.024-8.192 2.048-8.192 2.048-9.216 2.048-5.12 2.048-5.12 2.048-5.12 2.048-5.12 3.072-6.144 3.072-5.12 3.072-6.144 4.096-6.144 1.024-3.072 2.048-3.072 5.12-6.144 4.096-6.144 5.12-6.144 5.12-6.144 6.144-6.144 6.144-7.168 7.168-6.144 5.12-4.096 5.12-5.12 6.144-4.096 6.144-3.072 6.144-4.096 7.168-2.048 7.168-4.096 7.168-2.048 7.168-2.048 8.192-3.072 7.168-2.048 8.192-1.024 8.192-1.024 8.192-1.024 8.192-2.048h34.816l8.192 1.024 9.216 1.024 8.192 1.024 8.192 2.048 9.216 2.048 7.168 2.048 9.216 2.048 8.192 3.072 8.192 3.072 8.192 3.072 7.168 4.096 7.168 4.096 7.168 5.12 6.144 4.096 3.072 2.048 3.072 2.048 6.144 5.12 4.096 4.096 5.12 5.12 5.12 6.144 4.096 5.12 4.096 5.12 3.072 6.144 3.072 5.12 4.096 5.12 3.072 6.144 4.096 10.24 3.072 6.144 2.048 5.12 1.024 6.144 2.048 5.12 1.024 5.12 2.048 5.12 2.048 9.216 2.048 9.216 1.024 8.192 1.024 6.144 1.024 10.24 1.024 2.048 1.024 2.048 3.072 5.12 2.048 3.072 2.048 4.096 2.048 4.096 2.048 4.096 1.024 5.12 2.048 5.12 1.024 6.144v2.048l1.024 3.072v3.072l-1.024 3.072v3.072l-1.024 4.096-1.024 6.144-2.048 4.096-1.024 3.072v1.024l1.024 1.024 1.024 3.072 8.192 11.264 6.144 8.192 2.048 6.144 4.096 6.144 3.072 6.144 4.096 8.192 4.096 7.168 4.096 9.216 3.072 6.144 2.048 5.12 2.048 6.144 2.048 5.12 1.024 5.12 2.048 5.12 1.024 10.24 2.048 10.24 1.024 9.216v13.312l-1.024 4.096-1.024 8.192-1.024 7.168-2.048 6.144-1.024 3.072-1.024 3.072-2.048 2.048-1.024 2.048-2.048 2.048-1.024 2.048-2.048 2.048-2.048 1.024-2.048 1.024-2.048 1.024-1.024 1.024H727.04l-2.048-1.024-3.072-1.024-1.024-1.024-1.024-1.024-2.048-1.024-1.024-2.048-3.072-3.072-3.072-4.096-2.048-3.072-2.048-4.096-2.048-3.072-3.072-7.168-4.096-7.168H696.32l-1.024 1.024-1.024 2.048-2.048 2.048-2.048 7.168-4.096 9.216-4.096 12.288-4.096 5.12-4.096 6.144-4.096 7.168-5.12 6.144-2.048 3.072-3.072 3.072-6.144 7.168v1.024h1.024l3.072 2.048 14.336 7.168 6.144 3.072 6.144 4.096 5.12 4.096 6.144 4.096 2.048 2.048 2.048 2.048 2.048 3.072 1.024 3.072 1.024 2.048 1.024 3.072 1.024 2.048v7.168l-1.024 2.048-1.024 1.024v2.048l-1.024 2.048-3.072 3.072-2.048 3.072-2.048 2.048-1.024 1.024-4.096 3.072-4.096 2.048-5.12 3.072-5.12 2.048-5.12 2.048-3.072 1.024-3.072 1.024-6.144 1.024-7.168 2.048-6.144 1.024-8.192 1.024h-7.168l-8.192 1.024H588.8l-8.192-1.024-8.192-1.024-8.192-1.024-9.216-1.024-9.216-2.048-8.192-2.048-9.216-2.048-8.192-3.072-9.216-3.072-4.096-1.024-4.096-2.048-3.072-1.024h-9.216l-8.192-1.024h-4.096l-6.144-1.024-3.072 3.072-5.12 3.072-6.144 3.072-7.168 4.096-4.096 2.048-4.096 2.048-10.24 4.096-5.12 1.024-6.144 1.024-7.168 2.048h-5.12l-5.12 1.024h-6.144l-6.144 1.024h-25.6l-14.336-1.024-14.336-1.024-7.168-1.024-7.168-1.024-6.144-1.024-7.168-1.024-6.144-2.048-6.144-2.048-6.144-2.048-5.12-2.048-5.12-2.048-4.096-3.072-4.096-3.072-1.024-1.024-2.048-2.048-2.048-2.048-1.024-2.048-1.024-1.024-1.024-2.048-1.024-4.096-1.024-2.048-1.024-2.048v-2.048l1.024-3.072v-2.048l1.024-2.048v-7.168l1.024-3.072 1.024-3.072 1.024-3.072 2.048-2.048 1.024-1.024 2.048-3.072 2.048-2.048 2.048-1.024 2.048-2.048 3.072-1.024 2.048-1.024 3.072-1.024 3.072-1.024 4.096-1.024 4.096-1.024 3.072-1.024h4.096l5.12-1.024h2.048v-1.024l-1.024-1.024-2.048-1.024-6.144-6.144-4.096-3.072-5.12-4.096-5.12-5.12-5.12-6.144-6.144-7.168-2.048-3.072-3.072-4.096-2.048-5.12-3.072-4.096-3.072-5.12-2.048-5.12-2.048-5.12-2.048-6.144-2.048-5.12-1.024-7.168-1.024-1.024h-2.048l-1.024 1.024v1.024l-1.024 1.024v1.024l-1.024 3.072-3.072 5.12-1.024 3.072-3.072 2.048-2.048 3.072-3.072 4.096-3.072 3.072-3.072 3.072-3.072 3.072-4.096 2.048-3.072 3.072-4.096 1.024-4.096 1.024-5.12 1.024H204.8v-1.024l-1.024-2.048h-1.024l-2.048-4.096-1.024-2.048-1.024-3.072-1.024-4.096-1.024-3.072-1.024-7.168v-28.672l1.024-6.144 1.024-5.12 1.024-6.144 1.024-5.12 2.048-7.168 2.048-6.144 2.048-6.144 3.072-6.144 3.072-6.144 3.072-7.168 4.096-6.144 4.096-6.144 4.096-6.144 5.12-7.168 4.096-5.12 4.096-5.12 5.12-5.12 3.072-3.072 3.072-3.072 4.096-4.096 4.096-3.072 7.168-6.144 6.144-4.096z" p-id="886" fill="#2196f3">
              </path>
            </svg>
            <mu-text-field hintText="QQ" v-model="qq" />
            <br/>
            <svg width="32" height="32" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g class="transform-group">
                <g transform="scale(0.03125, 0.03125)">
                  <path d="M622.592 406.528c8.192 0 15.36 1.024 23.552 1.024C624.64 309.248 519.168 236.544 399.36 236.544c-134.144 0-244.736 91.136-244.736 207.872 0 67.584 36.864 121.856 98.304 164.864l-24.576 73.728 84.992-43.008c30.72 6.144 55.296 12.288 86.016 12.288 7.168 0 15.36 0 22.528-1.024-5.12-16.384-7.168-33.792-7.168-51.2 0-106.496 92.16-193.536 207.872-193.536zM491.52 339.968c18.432 0 30.72 12.288 30.72 30.72s-12.288 30.72-30.72 30.72-36.864-12.288-36.864-30.72 18.432-30.72 36.864-30.72z m-172.032 61.44c-18.432 0-36.864-12.288-36.864-30.72s18.432-30.72 36.864-30.72 30.72 12.288 30.72 30.72-12.288 30.72-30.72 30.72zM845.824 596.992C845.824 499.712 747.52 419.84 637.952 419.84 521.216 419.84 430.08 499.712 430.08 596.992c0 98.304 91.136 177.152 207.872 177.152 24.576 0 49.152-6.144 73.728-12.288L778.24 798.72l-18.432-61.44c49.152-35.84 86.016-84.992 86.016-140.288z m-275.456-30.72c-12.288 0-24.576-12.288-24.576-24.576s12.288-24.576 24.576-24.576c18.432 0 30.72 12.288 30.72 24.576s-12.288 24.576-30.72 24.576z m134.144 0c-12.288 0-24.576-12.288-24.576-24.576s12.288-24.576 24.576-24.576c18.432 0 30.72 12.288 30.72 24.576s-12.288 24.576-30.72 24.576z" fill="#11cd6e"></path>
                </g>
              </g>
            </svg>
            <mu-text-field hintText="Wechat" v-model="wechat" />
          </div>
          <mu-raised-button label="下一步" class="step-button" @click="handleAdd" secondary/>
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
            <mu-text-field hintText="自我介绍" v-model.trim="intro" multiLine :rows="3" :rowsMax="6" :maxLength="50" />
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
        return this.activeStep > 3
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
          this.telError='请输入正确的手机号码'
        }else{
          this.activeStep++
        }this.activeStep++
        
      },
      fieldsChange(value){
        this.fields=value
      },
      handleFields(){

        if (this.fields.length == 0) {
          return this.fieldsError = "还没选择课题研究方向！"
        }else{
           this.activeStep++
        }
       
      },
      handleEmail() {
         if(this.isEmail(this.email)){
           this.activeStep++
        }else{
          this.emailError='请输入正确格式的邮箱地址'
        }this.activeStep++
      },
      handleAdd() {
        this.activeStep++
      },
      handleOffice(){
        this.activeStep++
      },
      handleIntro(){
        this.activeStep++
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
      },
      ...mapActions(['stuSetContactData','tchSetContactData'])
    },
    mounted(){
      this.userType=this.$store.state.userInfo.userType
    },
    watch:{
      email:'clearError',
      tel:'clearError',
      fields:'clearError'
    }
}

</script>

<style lang="sass" rel="stylesheet.scss" scoped>
span.title{
  margin-top: 50px;
  padding: 24px;
  font-weight: 100;
  display: inline-block;
  font-size: 28px;
  line-height: 28px;
}
.info-container{
  margin: 4vw auto;
  max-width: 380px;
  max-height: 600px;
}
.mu-text-field-multiline{
  width: 300px;
  height: 70px;
}

.step-button {
  margin-top: 12px;
  margin-right: 12px;
}
.slider{
  margin-top: 12px;
  height: 24px;
  span{
    font-size: 12px;
    display: inline-block;
    position: absolute;
    top: 15px;
  }
  .class-left{
    left: 0;
  }
  .class-right{
    right: 0
  }
  .mu-slider{
    width: 200px;
    position: absolute;
    left: 60px;
    display: inline-block;
    margin-bottom: 0;
  }

}
.fields{
  
  .mu-text-field{
    width: 320px !important;
}
}
</style>