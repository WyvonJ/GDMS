<template>
  <div class="group-container">
    <div class="middle-group-teacher">
      <div class="group-settings">
        <div class="actions">
          <mu-flat-button @click="groups.push([])" color="green" icon="add_circle_outline" label="添加" />
          <mu-flat-button @click="deleteGroup" icon="delete" color="red" label="删除" />
          <mu-flat-button @click="resetGroups" color="lightBlue" icon="sync" label="重置" />
        </div>
        <div class="actions">
          <mu-raised-button @click="beginGroup" secondary icon="group" class="upload-group-count" label="开始分组" />
          <mu-flat-button href="/admin/download?filename=MidGroup" icon="file_download" :disabled="disableDownload" title="分好组后才能下载分组表" secondary label="导出分组表"/>

        </div>
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
      <transition-group name="tab-tran" tag="div" class="groups-wrapper">
        <div class="group" name="group" v-for="(group,index) of groups" @drop="drop($event)" @dragover="allowDrop($event)" :id="'g'+index" :key="'g'+index">
          <span class="group-id no-selection">{{++index}}</span>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        status: 0,
        groupLength: 6,
        disableDownload:true,
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
        }, {
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
        if ($event.target.nodeName === 'DIV') //如果拖拽到非div则不接受
        {
          let elId = $event.dataTransfer.getData("elId") //被拖拽元素id和name
          let id = $event.target.id.substring(1) //group id
          if (elId && id)
            $event.target.appendChild(document.getElementById(elId))
        }
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
      deleteGroup() {
        let group = document.getElementsByName('group')
        if (group[group.length - 1].childNodes.length > 1) {
          alert('最后一组还有导师！')
        } else {
          this.groups.splice(1, 1)
        }
      },
      resetGroups() {
        window.location.reload()
      },
      beginGroup() {
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
        this.POST('/admin/uploadMidGroups', groups)
          .then(res => {
            if (res.data.state===1) {
              this.disableDownload=false
              alert('可以导出分组表了')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    mounted() {
      this.GET('/admin/getTchGroupList')
        .then(res => {
           if (res.data.state===1) {
            this.teachers=res.data.teachers
          }else{
           alert('获取导师列表失败') 
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';
.middle-group-teacher
{
    width: 100%;
    padding: 16px 8px;
    .group-settings
    {
        display: flex;

        padding-bottom: 16px;

        align-items: center;
        justify-content: space-between;
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

    transition: $material-enter;

    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 4px;

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

        border-left: 1px dashed #d6d6d6;
        background-color: rgba(227, 225, 225, .28);
    }
    &:hover
    {
        box-shadow: 0 0 20px 0 #cacaca;
    }
    span.group-id
    {
        font-size: 18px;

        position: absolute;
        z-index: 3;
        top: -12px;
        right: -12px;

        width: 24px;
        height: 24px;
        padding-left: 7px;

        color: white;
        border-radius: 12px;
        background-color: $red;
    }
}

.teacher-to,
.student-to
{
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

.teachers-grouped
{
    display: flex;
}
.actions{
  display: flex;

}
</style>
