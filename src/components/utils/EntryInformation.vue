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
      <mu-step v-if="usertype">
        <mu-step-label>
          请填写您的职称
          <br>
        </mu-step-label>
        <mu-step-content>
          <mu-radio label="助教" name="proTitle" nativeValue="0" v-model="proTitle" class="pro-title-radio"/> 
          <mu-radio label="讲师" name="proTitle" nativeValue="1" v-model="proTitle"  class="pro-title-radio"/>
          <mu-radio label="副教授" name="proTitle" nativeValue="2" v-model="proTitle"  class="pro-title-radio"/>
          <mu-radio label="教授" name="proTitle" nativeValue="4" v-model="proTitle"  class="pro-title-radio"/>
          <mu-raised-button label="下一步" class="step-button" @click="handleTitle" secondary/>
          <mu-flat-button label="上一步" class="step-button" @click="handlePrev" />
        </mu-step-content>
      </mu-step>
      <mu-step v-if="usertype">
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
      
      <mu-step v-if="usertype">
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
            <mu-select-field v-model="fields" multiple :labelFocusClass="['label-focus']" :errorText="fieldsError" label="您的研究领域" @change="changeFields" labelFloat>
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
            <mu-text-field hintText="自我介绍" v-model.trim="intro" multiLine @textOverflow="handleOverflow" :errorText="introError" :rows="3" :rowsMax="6" :maxLength="60" />
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
            填好了联系信息就可以开始选题了，好好准备开始吧。
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
import { mapActions } from 'vuex'
export default {
  data() {
      return {
        activeStep: 2,
        telError: '',
        emailError: '',
        fieldsError: '',
        introError: '',
        usertype: 1,
        classratio: 50,
        proTitle:'',
        account: '',
        tel: '',
        email: '',
        qq: '',
        wechat: '',
        office: '',
        intro: '',
        office: '',
        fields: [],
        fieldsData: [
          "1.图形图像处理", "2.游戏开发设计", "3.信息可视化",
          "4.数字视音频处理", "5.移动互联网", "6.软件工程",
          "7.Web开发", "8.人机交互", "9.虚拟现实&增强现实",
          "10.文化传媒", "11.信息安全", "12.信号处理",
          "13.云计算", "14.大数据", "15.机器学习&深度学习",
          "16.算法研究", "17.其他"
        ]
      }
    },//'1 4 15 16 12 11, 2 5 6 7 ,13 14 16, 3 10 9 17'
    computed: {
      finished() {
        let steps = (this.usertype === 0 ? 3 : 5)
        return this.activeStep > steps
      }
    },
    methods: {
      isEmail(strEmail) {
        return strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1
      },
      handleTel() {
        this.show = true
        var tel = this.tel.toString()
        this.tel = tel
        if (tel.length !== 11)
          this.telError = '请输入正确的手机号码。'
        else
          this.activeStep++

      },
      changeFields(value) {
        this.fields = value
      },
      handleFields() {
        if (this.fields.length == 0)
          return this.fieldsError = "还没选择课题研究方向。"
        else
          this.activeStep++
      },
      handleEmail() {
        if (this.isEmail(this.email)) {
          this.activeStep++
        } else {
          this.emailError = '请输入正确格式的邮箱地址。'
        }
      },
      handleAdd() {
        this.activeStep++
      },
      handleOffice() {
        this.activeStep++
      },
      handleTitle(){
        this.proTitle===''?null:this.activeStep++
      },
      handleIntro() {
        if (this.intro.length <= 60)
          this.activeStep++
      },
      handleOverflow() {
        this.introError = "字数超过了，再精简点。"
      },
      handlePrev() {
        this.activeStep--
      },
      reset() {
        this.tel = ''
        this.email = ''
        this.qq = ''
        this.wechat = ''
        this.intro = ''
        this.office = ''
        this.classratio = 50
        this.fields = []
        this.activeStep = 0
      },
      handleFinish() {
        let fd=[]
        for(let i=0,len=this.fields.length;i<len;i++){
          fd.push(this.fields[i].split('.')[0])
        }
        this.account = cookie.get('user')
        if (this.usertype==0) {
          this.stuSetContactData({
              account: this.account,
              tel: this.tel,
              email: this.email,
              qq: this.qq,
              wechat: this.wechat,
              intro: this.intro
            })
            .then(() => {
              this.$router.push('/student/topics')
            })
        } else {
          this.tchSetContactData({
              account: this.account,
              tel: this.tel,
              email: this.email,
              qq: this.qq,
              wechat: this.wechat,
              office: this.office,
              classratio: this.classratio,
              protitle:this.proTitle,
              fields:fd
            })
            .then(() => {
              this.$router.push('/teacher/creation')
            })
        }
      },
      clearError() {
        this.emailError = ''
        this.telError = ''
        this.fieldsError = ''
        this.introError = ''
      },
      ...mapActions(['stuSetContactData', 'tchSetContactData'])
    },
    mounted() {
      try {
        //this.usertype = _.parseInt(cookie.get('usertype'))
      } catch (err) {
        return console.log(err)
      }
    },
    watch: {
      email: 'clearError',
      tel: 'clearError',
      fields: 'clearError',
      intro: 'clearError'
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
.fields .mu-text-field
{
        width: 320px !important;
}
</style>