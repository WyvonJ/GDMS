<template>
  <div class="contact-container">
  <div class="paper">
    <div class="contact-input">
        <img src="../../assets/icon/call.svg" alt="WECHAT" />
        <input type="number" v-model.trim="card.tel"/>
      </div>
      <div class="contact-input">
        <img src="../../assets/icon/mail.svg" alt="WECHAT" />
        <input type="email" v-model.trim="card.email" />
      </div>
      <div class="contact-input">
        <img src="../../assets/icon/qq.svg" alt="QQ" />
        <input type="number" v-model.trim="card.qq" />
      </div>
      <div class="contact-input">
        <img src="../../assets/icon/wechat.svg" alt="WECHAT" />
        <input v-model.trim="card.wechat" />
      </div>
      <br/>
      <button class="blue" @click="commitContact" >
        <img src="../../assets/icon/check.svg" alt="QQ" />
        <span>确认更改</span>
      </button>
    </div>
  </div>
  </div>
</template>


<script>
  export default{
    data(){
      return {
        card:{
        tel:'18649150331',
        email:'sunisdown@hotmail.com',
        qq:'965884102',
        wechat:'welovevue'
      }
      }
    },
    methods:{
      commitContact(){
        console.log(0)
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';

.contact-container
{
    display: flex;

    align-items: flex-start;
    justify-content: center;
    .paper{
      padding: 24px 16px 16px;
      margin-top: 64px;
    }
    .contact-input
    {
        position: relative;

        width: 300px;
        height: 48px;
        margin: 16px;
        cursor: text;
        transition: $material-enter;
        white-space: nowrap;
        border: 1px #acacac solid;
        border-radius: 3px;
        background-color: transparent;
        img,i
        {
            position: relative;
            top: -2px;
            left: 0;
            box-sizing: border-box;
            border-right: 1px #acacac solid;
            padding: 12px;
        }
        input
        {
            font-size: 18px;
            transition: $material-enter;

            width: 250px;
            height: 46px;
            padding: 4px;
            border-radius: 3px;

            border: 0;
            outline: none;
            background-color: transparent;
        }
      }
      button{
        margin: 16px;
      }
      input:focus{
        -webkit-box-shadow: 0 0 3px 1px $blue;
        -moz-box-shadow: 0 0 3px 1px $blue;
        box-shadow:0 0 3px 1px $blue;
      }
}
</style>