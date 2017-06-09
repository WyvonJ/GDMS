<template>
<div class="student-wrapper">
  <div class="table-container paper">
    <table>
      <caption>
        <mu-raised-button @click="commitGrade" :disabled="isOpenForEva" secondary label="提交学生评价" :title="buttonText"/>
        学生评分表
      </caption>
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>分数</th>
          <th>评分</th>
          <th>评价</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student of students">
          <td  width="10%">{{student._id}}</td>
          <td  width="8%">{{student.name}}</td>
          <td  width="6%"><span>{{student.score}}</span></td>
          <td width="30%">
          
            <mu-slider v-model="student.score" :min="0" :max="100" :step="1" class="restriction-slider" />
          </td>
          <td width="30%">
            <mu-text-field  class="wide-text-field" hintText="学生评价" v-model.trim="student.comment"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      students: [],
      isOpenForEva:true,
      buttonText:'现在还不能评分'
    }
  },
  methods:{
    commitGrade:function(){
      let tchId = cookie.get('user')
      this.POST('/teacher/tchEvaluationToStu',{
        teacherId:tchId,
        students:this.students
      })
    }
  },
  mounted(){
    let tchId = cookie.get('user')
    this.POST('/teacher/tchSelectionResult',{teacherId:tchId})
      .then(res=>{
        let stus=[]
        _.forEach(res.data,(top,i)=>{
          _.forEach(top.finalstudents,stu=>{
            stus.push(stu)
          })
        })
        _.forEach(stus,stu=>{
          stu.score=0
          stu.comment=''
        })
        this.students=stus
        if (stus.length>0) {
          this.isOpenForEva=false
          this.buttonText=''
        }
        _.forEach(this.students,student=>{
      student.score = 0
      student.comment = ''
    })
      })
    
  }
}

</script>

<style type="text/css" media="screen" scoped>
th{
  padding: 8px;
}
  .mu-raised-button{
    font-size: 16px;
    display: inline-block;
    float: left;
    margin: 8px;
  }
</style>