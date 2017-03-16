<template>
	<div class="main-content">
		<div class="contact-card">
			<div class="card-content">
				<div class="tel chip">
          <mu-icon value="call" :size="18" />
          <mu-text-field :underlineFocusClass="underline" type="number" v-model.trim="card.tel"/>
        </div>
        <div class="email chip">
        	<mu-icon value="mail" :size="18" />
          <mu-text-field type="email" v-model.trim="card.email"/>
        </div>
        <div class="qq chip">
          <img src="../../assets/icon/qq.svg" alt="QQ" /> 
          <mu-text-field type="number" v-model.trim="card.qq"/>
        </div>
        <div class="wechat chip">
          <img src="../../assets/icon/wechat.svg" alt="WECHAT" /> 
          <mu-text-field v-model.trim="card.wechat"/>
        </div>
        <br/>
        <mu-flat-button labelPosition="before" label="确认更改" icon="check" @click="commitContact" primary/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default{
		data(){
			return {
				underline:{
					"display":"none"
				},
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
.contact-card {
	font-size: 16px;
  position: relative;
  max-width: 480px;
  transition: $material-enter;
  border-radius: 6px;
  		padding: 8px;
  		background-color: #fff;
  -webkit-box-shadow: $material-shadow-1dp;
  -moz-box-shadow: $material-shadow-1dp;
  box-shadow: $material-shadow-1dp;
  &:hover {
    transform: translateY(-4px);
    -webkit-box-shadow: $material-shadow-6dp;
    -moz-box-shadow: $material-shadow-6dp;
    box-shadow: $material-shadow-6dp;
  }
  	.card-content{
  		.chip{
  			background-color: #efefef;
    cursor: pointer;
    height: 40px;
    border-radius: 20px;
    .mu-text-field{
    	width: 200px;
    }
    }
    .mu-flat-button
        {
            border-radius: 18px;
            margin: 6px;
            margin-top: 16px;
        }
  	}
}

</style>