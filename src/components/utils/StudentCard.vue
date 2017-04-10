<template>
	<div class="student-card">
		<ul class="student-list">
			<li class="student-name">
				{{student.name}}
			</li>
			<li class="student-info">
				{{student.intro}}
			</li>
			<li class="student-confirm">
				<button class="check-button">
					<i class="material-icons">
						check
					</i>
				</button>
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'student-card',
		props:{
			student:Object,
			isSelected:Boolean
		},
		data(){
			return {

			}
		},
		methods:{

		}
	}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss'; 

.student-card{
	width: 100%;
	&:hover{
	}
	.student-list{
		height: 64px;
	}
	li{
		display: inline-block;
		flex: 1;
		margin: 0;
		padding: 0;
		height: 100%;

	}
	.student-name{
		width: 20%;
	}
	.student-info{
		width: 60%;
	}
	.student-confirm{
		width: 20%;
	}
	button{
		display: inline-block;
		outline: none;
		width: 100%;
		height: 100%;
		margin: 0;
    padding: 0;
		border: none;
		background-color: $green;
    transition: $material-enter;
		color: white;
	}
	.check-button{
		position: relative;
		right: 0;
	}
}

</style>