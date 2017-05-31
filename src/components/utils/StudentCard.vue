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
    <button class="check-button" @click="select" :class="{'is-selected':isSelected}">
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
            transition: $material-enter;

            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            &.not-selected
            {
                transform: translateX(-64px);

                color: #343434;
                background-color: #fff;
            }
        }
    }
    .student-wrapper
    {
        position: relative;
        z-index: 6;

        width: 100%;
        height: 100%;

        border-bottom: 1px #dfdfdf solid;
        border-left: 6px $teal solid;
        .student-name
        {
            font-size: 16px;
            line-height: 64px;

            display: inline-block;
            float: left;

            width: 64px;
            height: 64px;

            text-align: center;
        }
        &.not-selected
        {
            color: rgba(0,0,0,.7);
            background-color: white;
            .student-gpa
            {
                color: $indigo;
            }
        }
        &.gender-girl
        {
            border-left: 6px $red400 solid;
        }
        .student-gpa
        {
            position: absolute;
            top: 2px;
            right: 72px;
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

        color: white;
        border: none;
        border-radius: 0;
        outline: none;
        background-color: $greenVue;
        &:hover
        {
            color: $greenVue;
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
        &.is-selected
        {
            background-color: transparent;
            i{
                color: $red;
                font-size: 28px;
            }
        }
    }
}

</style>