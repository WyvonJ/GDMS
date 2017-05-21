<template>
	 <div class="overlap" v-if="isOverlap">
        <div class="progress">
        <span>请稍等，正在后台处理中...</span>
          <mu-circular-progress :size="120" color="red"/>
        </div>
      </div>
</template>

<script type="text/javascript">
	export default{
		props:{
			isOverlap:Boolean
		}
	}
</script>

<style type="text/css" media="screen" scoped>
	.overlap
{
    position: fixed;
    z-index: 200;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;

    width: 100vw;
    height: 100vh;

    background-color: rgba(0,0,0,.5);

    align-items: center;
    justify-content: center;
    
}.progress
    {
        font-size: 20px;

        width: 320px;
        height: 320px;
        padding-top: 60px;

        text-align: center;

        border-radius: 4px;
        background-color: #fff;
        
    }.mu-circular-progress
        {
            margin-top: 24px;
        }
</style>