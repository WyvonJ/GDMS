<template>
  <div class="group-container">
  <div class="group-admin">
    <mu-raised-button :href="downloadURL" icon="file_download" secondary label="导出分组表"/>
    <h3>{{title}}</h3>
  </div>
    <div class="groups">
      <div class="group" v-for="(group,index) of groups">
        <span class="group-id">{{group._id}}</span>
        <div class="teachers-group">
          <span class="teacher chip" v-for="teacher of group.mentors">{{teacher.name}}</span>
        </div>
        <div class="students-group">
          <span class="student chip" v-for="student of group.students">{{student._id}}{{student.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        status: 0,
        groupLength: 6,
        title:'中期分组表',
        downloadURL:'/admin/download?filename=MidGroup',
        groups: [{
          _id:1,
          mentors:[{
          _id: '200001',
          name: '张军'
        }, {
          _id: '200002',
          name: '陈伟'
        }, {
          _id: '200003',
          name: '陈丽芳'
        },{
          _id: '200004',
          name: '王军'
        }, {
          _id: '200005',
          name: '李俊'
        }, {
          _id: '2000036',
          name: '刘军'
        }],
          students:[{
          _id: '200001',
          name: '张军'
        }, {
          _id: '200002',
          name: '陈伟'
        }, {
          _id: '200003',
          name: '陈丽芳'
        },{
          _id: '200004',
          name: '王军'
        }, {
          _id: '200005',
          name: '李俊'
        }, {
          _id: '2000036',
          name: '刘军'
        }]
        }
        ]
      }
    },
    methods: {
      
    },
    mounted() {
      let step
      this.GET('/getstep')
        .then(res=>{
          step = res.data.curstep
        })
        .catch(err=>{
          console.log(err)
        })
      if (step==='') {
        this.title='最终分组表'
        this.downloadURL='/admin/download?filename=FnlGroup'
      }
    }
}

</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';
.group-admin{
  padding: 16px;
  h3{
    font-size: 24px;
    font-weight: normal;
  }
}
.groups
{
    display: flex;

    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.group
{
    position: relative;

    display: block;
    min-width: 320px;
    min-height: 64px;
    margin: 16px;
    border: 1px solid rgba(0,0,0,.1);
    flex-wrap: wrap;
    align-items: flex-start;
    border-radius: 3px;
    transition: $material-enter;
    &:hover{
    box-shadow: 0px 0px 20px 0px #cacaca;

    }
    span.group-id
    {
        font-size: 18px;

        position: absolute;
        top: -12px;
        right: -12px;

        width: 24px;
        height: 24px;
        padding-left: 7px;

        color: white;
        border-radius: 12px;
        background-color: $red;
        z-index: 3;
    }
}
.chip{
  cursor: default;
}
.teachers-group
{
  padding: 8px;
    display: flex;
    border-bottom: 1px solid #d6d6d6;
}
.students-group
{
    padding: 8px;
}
</style>