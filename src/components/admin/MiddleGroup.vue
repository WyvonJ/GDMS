<template>
  <div class="group-container">
    <div class="middle-group-teacher paper">
      <div class="group-settings">
        <button @click="groups.push([])" class="add-button">
          <img src="../../assets/icon/add_circle_outline.svg" alt="add" />
          <span> 添加</span>
        </button>
        <button @click="groups.splice(1,1)" class="delete-button">
          <img src="../../assets/icon/delete_b.svg" alt="delete" />
          <span> 删除</span>
        </button>
        <button @click="resetGroups" class="reset-button">
          <img src="../../assets/icon/reset_w.svg" alt="reset" />
          <span> 重置</span>
        </button>
      </div>
      <div class="groups-wrapper">
        <div class="group" name="group" v-for="(group,index) of groups" @drop="drop($event)" @dragover="allowDrop($event)" :id="'g'+index">
          <span class="group-id no-selection">{{++index}}</span>
        </div>
      </div>
      <div class="actions">
        <button @click="uploadGroups" class="orange">
          <img src="../../assets/icon/upload.svg" alt="upload" />
          <span>上传教师分组</span>
        </button>
        <a href="/admin/download?filename=MidGroup" class="shadow">
          <img src="../../assets/icon/export.svg" alt="export" />
          <span>导出中期分组表</span>
        </a>
      </div>
      <div class="to-be-grouped">
        <p>
        <strong>
          待分组导师，拖拽进行分组，请先分组并上传教师分组，再导出分组表：
        </strong>
        </p>
        <span class="teacher-to chip no-selection" v-for="teacher of teachers" draggable="true" @dragstart="drag($event)" :id="'t'+teacher._id">
          {{teacher.name}}
          </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { post, get } from 'axios'
export default {
  data() {
      return {
        status: 0,
        groupLength: 6,
        groups: [
          [],
          [],
          [],
          [],
          [],
          []
        ],
        teachers: [{
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
      }
    },
    methods: {
      drop($event) {
        $event.preventDefault() //阻止默认事件，防止页面跳转
        if ($event.target.nodeName !== 'DIV') //如果拖拽到非div则不接受
          return
        let elId = $event.dataTransfer.getData("elId") //被拖拽元素id和name
        let id = $event.target.id.substring(1) //group id
        if (elId && id)
          $event.target.appendChild(document.getElementById(elId))
      },
      drag($event) {
        //获取被拖拽元素的id 也就是绑定的帐号id
        $event.dataTransfer.setData("elId", $event.target.id)
          //获取用户姓名 用于传递
        $event.dataTransfer.setData("elName", $event.target.innerHTML.trim())
      },
      allowDrop($event) {
        $event.preventDefault()
      },
      resetGroups() {
        window.location.reload()
      },
      uploadGroups() {
        
        let group = document.getElementsByName('group')
        let groups = []
        _.forEach(group, (g, index) => {
           groups[index] = []
          _.forEach(g.childNodes, (c) => {
            if (c.id) {
              groups[index].push(c.id.substring(1))
            }
          })
        })
        console.log(groups)
        this.POST('/admin/admUpMTchGroups', groups)
          .then(res => {

          })
          .catch(err => {
            console.log(err)
          })

      }
    },
    created() {
      this.GET('/admin/admTchMidList')
        .then(res => {
          this.teachers = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
}

</script>

<style lang="sass" rel="stylesheet/scss">
@import '../../style/variables.scss';
.middle-group-teacher
{
    width: 100%;
    padding: 16px 8px;
    .group-settings
    {
        padding-left: 16px;
        button
        {
            color: #333;
            border: 1px solid #aaa;
            border-radius: 0;
            background-color: #fff;
            &:hover
            {
                background-color: #e7e7e7;
            }
        }
        .add-button
        {
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
        }
        .reset-button
        {
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
        }
    }
}
.groups-wrapper
{
    display: flex;

    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.group
{
    position: relative;

    display: inline-flex;

    min-width: 320px;
    min-height: 64px;
    margin: 16px;
    padding-right: 96px;

    border: 1px dashed #727877;

    flex-wrap: wrap;
    align-items: flex-start;
    &::after
    {
        position: absolute;
        top: 0;
        right: 0;

        width: 92px;
        height: 100%;
        padding-top: 24px;
        padding-left: 8px;
        content: '\62D6\62FD\5230\8FD9\91CC';

        border-left: 1px dashed #888;
        background-color: rgba(227, 225, 225, .28);
    }
    &:hover
    {
        border-color: $red;
    }
    span.group-id
    {
        font-size: 18px;

        position: absolute;
        top: -12px;
        right: -12px;

        width: 24px;
        height: 24px;
        padding-top: 3px;
        padding-left: 7px;

        color: white;
        border-radius: 12px;
        background-color: $red;
        z-index: 3;
    }
}
.teacher-to, .student-to{
  cursor: move;
}
.to-be-grouped
{
    width: 100%;
    min-height: 64px;
    p
    {
        font-size: 18px;

        margin: 10px;
        padding: 8px;
    }
}
.actions
{
  button{
    margin: 3px 16px;
  }
  a{
    width: 160px;
    height: 40px;
    padding: 8px;
    display: inline-block;
    background-color: $blue;
    color: white!important;
  }
}
.teachers-grouped
{
    display: flex;
}


</style>