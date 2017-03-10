<template>
	<thead class="w-thead">
		<slot></slot>
	</thead>
</template>

<script>
	export default{
		name:'w-thead',
		created(){
			this.isThead=true
		},
		computed:{
			showCheckbox(){
				//parent 指向table组件
				//返回的都是父组件的props
				return this.$parent.showCheckbox
			},
			enableSelectAll(){
				return this.$parent.enableSelectAll
			},
			multiSelectable(){
				return this.$parent.multiSelectable
			},
			isSelectAll(){
				return this.$parent.isSelectAll
			}
		},
		methods:{
			selectAll(){
				this.$parent.selectAll()
			},
			unSelectAll(){
				this.$parent.unSelectAll()
			}
		}
	}
</script>

<style lang="sass" rel="stylesheet/scss">
	.w-thead{
		border-bottom: 1px solid #101;
	}
</style>