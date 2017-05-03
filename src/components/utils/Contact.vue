<template>
  <div class="contact-container">
    <div class="wrapper">
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
      <button class="blue" @click="commitContact">
        <img src="../../assets/icon/check.svg" alt="submit" />
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
        usertype:true,
        contact:{
        tel:'18649150331',
        email:'sunisdown@hotmail.com',
        qq:'965884102',
        wechat:'welovevue',
        office:''
      }
      }
    },
    methods:{
      commitContact(){
        let routes = this.usertype?'/student/stuSetContact':'/teacher/tchSetContact'
        this.POST(routes,this.contact)
          .then(res => {
            console.log(res.data)
          })
      }
    },
    mounted(){
       this.usertype = _c.getCookie('usertype')
        let routes = this.usertype ? '/student/stuGetContact':'/teacher/tchGetContact'
        let user=_c.getCookie('user')
          this.POST(routes,{
            account:user
          })
          .then(res => {
            this.contact = res.data
          })
          .catch(err=>{
            console.log(err)
          })
       }
  }
</script>

<style lang="sass" rel="stylesheet/scss">
@import '../../style/variables.scss';
.addon-input
    {
        position: relative;

        width: 300px;
        height: 48px;
        margin: 40px 0;

        cursor: text;
        white-space: nowrap;

        background-color: transparent;
        display: flex;
        .input-addon{
              padding: 12px 12px;
              text-align: center;
              background-color: #eee;
              border: 1px solid #ccc;
              vertical-align: middle;
              display: table-cell;
             border-top-left-radius: 4px;
             border-bottom-left-radius: 4px;
             border-right-color: transparent;
        }
        input
        {
            flex:1;
            font-size: 18px;

            width: 256px;
            height: 48px;
            padding: 4px;

            transition: $material-enter;

                border: 1px solid #ccc;
             border-top-right-radius: 4px;
             border-bottom-right-radius: 4px;

            background-color: transparent;
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
    
    button.blue
    {
        margin-left: 90px;
    }
}

</style>