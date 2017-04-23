<template>
  <div class="procedure">
    <section class="paper workflow">
      <div class="workflow-title">
        <span>选题控制</span>
      </div>
      <div class="workflow-panel">
        <button class="red">
          <span>一轮选题</span>
        </button>
        <button class="blue">
          <span>二轮选题</span>
        </button>
        <button class="green-vue">
          <span>三轮选题</span>
        </button>
      </div>
    </section>
    <section class="paper midgroup">
      <div class="midgroup-title">
        <span>分组控制</span>
      </div>
      <div class="midgroup-panel">
        <button class="red">
          <span>中期分组</span>
        </button>
        <button class="blue">
          <span>终期分组</span>
        </button>
      </div>
    </section>
  </div>
</template>


<script type="text/javascript">
	
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
.procedure{
	display: flex;
	section{
		display: inline-block;
		height: 128px;
		margin: 8px;
		div[class$="title"]{

		height: 40px;
		background-color: #f7f7f7;
		display: flex;
		padding: 8px;
		span{
			font-weight: 400;
			font-size: 20px;
		}
		}
		div[class$="panel"]{
		padding: 16px;
		display: flex;
		align-items:center;
		justify-content:center;
		button{
			margin: 8px;
		}
		}
	}
}
.workflow{
	display: inline-block;
	height: 128px;
	.workflow-title{
		
	}
	.workflow-panel{
		padding: 16px;
		display: flex;
		align-items:center;
		justify-content:center;
		
	}
}
</style>