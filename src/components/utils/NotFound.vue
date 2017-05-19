<template>
	<div class="not-found">
		<div class="background">
		</div>
	</div>
</template>

<script type="text/javascript">
	
	export default{
		mounted(){
			window.setTimeout(()=>{
				this.$router.push('/')
			},5000)
		}
	}
</script>

<style type="text/css" media="screen">
	.not-found{
		background-color: #868686;
	}
	.background{
		width: 100%;
		height: 100vh;
		background: url('../../assets/img/404.jpg') no-repeat;
		background-position: center;
	}
</style>