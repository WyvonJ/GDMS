<template>
			<div class="contact-content">
  <div class="sub-padding">

				<div class="contact-input">
          <mu-icon value="call" :size="18" />
          <mu-text-field type="number" v-model.trim="card.tel"/>
        </div>
        <div class="contact-input">
        	<mu-icon value="mail" :size="18" />
          <mu-text-field type="email" v-model.trim="card.email"/>
        </div>
        <div class="contact-input">
          <img src="../../assets/icon/qq.svg" alt="QQ" /> 
          <mu-text-field type="number" v-model.trim="card.qq"/>
        </div>
        <div class="contact-input">
          <img src="../../assets/icon/wechat.svg" alt="WECHAT" /> 
          <mu-text-field v-model.trim="card.wechat"/>
        </div>
        <br/>
        <mu-raised-button labelPosition="before" label="确认更改" icon="check" @click="commitContact"/>
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

			}
		}
	}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';

.contact-content
{
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
.mu-raised-button
{
    margin: 16px;

    color: #fff;
    background-color: #03a9f4;
}

</style>