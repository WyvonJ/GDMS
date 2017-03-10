<template>
	<mu-drawer @hide="handleDrawerHide"
						 @close="handleDrawerClose"
						 :open="open"
						 docked="docked"
						 class="app-drawer"
						 :zDepth="1">
		<div class="console-panel">
			<mu-icon value="school" 
							 color="#fff" 
							 :size="80"/>
			<h2 class="jnudm">JNUDM</h2>

			<slot></slot>
		
	</mu-drawer>
</template>

<script>
	import Vue from 'vue'
	export default{
		props:{
			open:{
				type:Boolean,
				default:true
			},
			docked:{
				type:Boolean,
				default:true
			},
			methods:{
				handleDrawerClose(){
					this.$emit('close')
				},
				handleDrawerHide(){
					
				}
			}
		}
	}
</script>