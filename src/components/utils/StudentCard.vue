<template>
  <div class="student-card">
    <div class="student-wrapper" :class="{'gender-girl':student.gender==='女','not-selected':!isSelected}">
      <div class="student-name">
        {{student.name}}
      </div>
      <div class="student-info">
        <span class="student-id">
        	{{student._id}}
      	</span>
        <span class="student-gpa">
        	GPA:{{student.gpa}}
      	</span>
      	<br/>
        <span class="student-intro">
        	{{student.intro}}
      </span>
      </div>
    </div>
    <button class="check-button" @click="select">
        <i class="material-icons">check</i>
    </button>
  </div>
</template>


<script type="text/javascript">
	export default{
		name:'student-card',
		props:{
			student:Object,
			isSelected:Boolean
		},
		methods:{
			select(){
				this.$emit('select')
			}
		}
	}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss'; 
.student-card
{
    position: relative;

    height: 64px;

    transition: $material-enter;
    &:hover
    {
        .student-wrapper
        {
            &.not-selected{
                transform: translateX(-64px);
               
                background-color: #fff;
                color: #343434;

            }
            transition: $material-enter;
            
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;

        }
        .check-button{
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.4);
               -moz-box-shadow: inset 0 0 6px rgba(0,0,0,.4);
                    box-shadow: inset 0 0 6px rgba(0,0,0,.4);
        }
    }
    .student-wrapper
    {
        width: 100%;
        height: 100%;

        border-bottom: 1px #dfdfdf solid;
        position: relative;
        z-index: 6;
        border-left: 6px $indigo400 solid;
        .student-name
        {
            display: inline-block;
            width: 64px;
            height: 64px;
            text-align: center;
            line-height: 64px;
            float: left;
            font-size: 16px;

        }
        &.not-selected{
            background-color: white;
            color: rgba(0,0,0,.7);
            .student-gpa{
            color: $indigo;
            }
        }
        &.gender-girl{
           border-left: 6px $red400 solid;
        }
        
        .student-gpa{
        	position: absolute;
        	right: 72px;
        	top: 2px;
        }
        .student-info
        {
            display: inline-block;

            width: 420px;
        }
    }
    button
    {
        display: inline-block;

        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;

        cursor: pointer;
        transition: $material-enter;
        border: none;
        outline: none;
        color: white;
        background-color: $greenV;
        &:hover
        {
            color: $greenV;
            background-color: #dedede;;
        }
    }
    .check-button
    {
        position: absolute;
        top: 0;
        right: 0;

        width: 64px;
        height: 64px;
    }
}

</style>