<template>
<div class="welcome">
		<h2>
			<img src="../../assets/img/jnu.png" alt="江南大学">
			<br/>
			<span>
				欢迎使用毕业设计管理系统<br>
			</span>
		</h2>
    <wyvonj-canvas></wyvonj-canvas>
</div>
</template>

<script>
import WyvonjCanvas from '../utils/WyvonjCanvas.vue'
	export default{
		components:{
			WyvonjCanvas
		}
	}
</script>

<style type="text/css" media="screen" scoped>
.welcome{
	display: flex;
	justify-content: center;
}
	h2{
		text-align: center;
		font-size: 48px;
		font-weight: lighter;
		margin-top: 128px;
		color: rgba(0,0,0,.54);
	}
	span{
		display: inline-block;
		margin-top: 64px;
		text-shadow: -1px 4px 7px rgb(116, 116, 116);
	}
</style>