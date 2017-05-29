<template>
	<div class="fields">
		 <mu-checkbox v-for="field of fields"  :nativeValue="field" @change="getFields" v-model="results" :label="field" class="fields-checkbox"/>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:{
			fields:Array
		},
		data(){
			return {
				results:[]
			}
		},
		methods:{
			getFields(){
				this.$emit('getfileds',this.results)
			}
		}
	}
</script>

<style type="text/css" media="screen">
	.fields-checkbox{
		margin: 8px;
	}
</style>