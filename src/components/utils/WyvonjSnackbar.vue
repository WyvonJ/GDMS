<template>
	<div class="wyvonj-snackbar" :class="{'show':show}">
		<div class="snackbar-container">
			<div class="snackbar-content no-selection" >
			<div class="info-icon">
          <img src="../../assets/icon/error.svg">
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
.wyvonj-snackbar
{
    position: fixed;
    z-index: 300;
    top: -100px;
    right: 0;
    left: 0;

    display: flex;

    max-width: 568px;
    margin: 0 auto;

    cursor: default;
    transition: $material-enter;

    justify-content: center;
    &.show
    {
        transform: translateY(108px);
    }
    .snackbar-container
    {
        overflow: hidden;

        width: auto;
        min-width: 200px;
        max-width: 568px;
        max-height: 48px;

        pointer-events: auto;

        border-radius: 6px;
        background-color: #efefef;
        .snackbar-content
        {
            display: flex;

            align-items: center;
            justify-content: space-between;
            .info-icon
            {
                display: flex;

                width: 50px;
                height: 50px;

                background-color: #f44336;

                justify-content: center;
            }
            .info-text
            {
                font-size: 20px;

                padding: 10px;
            }
        }
    }
}


</style>