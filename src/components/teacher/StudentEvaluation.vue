<template>
<div class="student-wrapper">
  <div class="table-container paper">
    <table>
      <caption>
        <button type="button" class="green-vue" @click="submitScore">
          提交学生评价
        </button>
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
      students: [{
        _id: '1035245231',
        name: '王菲'
      },{
        _id: '102312354',
        name: '陈奕迅'
      },{
        _id: '163021554',
        name: '张学友'
      },{
        _id: '1030254126',
        name: '周杰伦'
      }]
    }
  },
  methods:{
    submitScore:function(){
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
  .green-vue{
    font-size: 16px;
    display: inline-block;
  }
</style>