<template>
<div class="student-wrapper">
  <div class="table-container paper">
    <table>
      <caption>
        <mu-raised-button @click="commitGrade" :disabled="isOpenForEva" secondary label="提交学生评价"/>
        学生评分表
      </caption>
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>评分</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student of students">
          <td>{{student._id}}</td>
          <td>{{student.name}}</td>
          <td>
            <input type="number" name="grade" v-model="student.score" placeholder="0-100" >
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
      students: []
    }
  },
  methods:{
    commitGrade:function(){
      console.log(this.students)
    }
  },
  mounted(){
    _.forEach(this.students,student=>{
      student.score = 0
    })
  }
}

</script>

<style type="text/css" media="screen" scoped>
  .mu-raised-button{
    font-size: 16px;
    display: inline-block;
    float: left;
    margin: 8px;
  }
</style>