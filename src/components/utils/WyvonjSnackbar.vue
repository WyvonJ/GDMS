<template>
	<div class="wyvonj-snackbar" :class="{'show':show}">
		<div class="snackbar-container">
			<div class="snackbar-content" >
			<div class="info-icon">
				<md-icon>error_outline</md-icon>
			</div>
			<div class="info-text">
				<span>{{text}}</span>
			</div>
  		</div>
			</div>
	</div>
</template>

<script>
	export default{
		props:{
			show:{
				type:Boolean, 
				default:false
			},
			text:{
				type:String,
				default:'Oops!'
			}
		}
}
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';

.wyvonj-snackbar{
	position: fixed;
	top: -100px;
	justify-content: center;
	display: flex;
	right: 0;
	left: 0;
	cursor: default;
	max-width: 568px;
	transition: all .4s cubic-bezier(.25,.8,.25,1);
	z-index: 300;
	margin: 0 auto;

	&.show{
		transform: translateY(112px);
	}
	.snackbar-container{
		width: auto;
		min-width: 200px;
		max-width: 568px;
		max-height: 48px;
		overflow: hidden;
		pointer-events: auto;
		border-radius: 6px;
		background-color: #efefef;
		font-size: 16px;
		 -webkit-box-shadow: $material-shadow-4dp;
       -moz-box-shadow: $material-shadow-4dp;
            box-shadow: $material-shadow-4dp;
		.snackbar-content{
			display: flex;
			align-items: center;
			justify-content: space-between;
			 -webkit-user-select:      none;
           -moz-user-select: -moz-none;
            -ms-user-select:      none;
                user-select:      none;

        -khtml-user-select: none;
      .info-icon{
      	display: inline-block;
				background-color: #f44336;
				color: #fff;
				width: 40px;
				height: 40px;
				line-height: 40px;
      }
      .info-text{
      	display: inline-block;
      	padding: 10px;
      	color: #000;
      }

		}
	}

}

</style>