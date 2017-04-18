<template>
  <div class="contact-container">
  <div>
    <div class="contact-input">
        <img src="../../assets/icon/call.svg" alt="WECHAT" />
        <mu-text-field type="number" v-model.trim="card.tel" />
      </div>
      <div class="contact-input">
        <img src="../../assets/icon/mail.svg" alt="WECHAT" />
        <mu-text-field type="email" v-model.trim="card.email" />
      </div>
      <div class="contact-input">
        <img src="../../assets/icon/qq.svg" alt="QQ" />
        <mu-text-field type="number" v-model.trim="card.qq" />
      </div>
      <div class="contact-input">
        <img src="../../assets/icon/wechat.svg" alt="WECHAT" />
        <mu-text-field v-model.trim="card.wechat" />
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

    align-items: center;
    justify-content: center;
    .contact-input
    {
        width: 332px;
        height: 64px;
        margin-bottom: 12px;
        padding: 8px 12px;

        cursor: text;
        white-space: nowrap;

        border: 1px #3f51b5 solid;
        border-radius: 5px;
        .mu-icon
        {
            position: relative;
            top: 6px;
            left: 2px;
        }
        .mu-text-field
        {
            margin-left: 12px;
        }
    }
}
</style>