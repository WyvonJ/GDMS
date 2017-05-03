<template>
  <div class="group-container">
    <div class="final-group-teacher paper">
      <div class="instructions">
        <p>
          <strong>
            请先设定分组数并上传，然后下载分组表，也可以调整后确认分组再下载分组表。
          </strong>
        </p>
      </div>
      <div class="group-settings">
        <span class="group-length">{{groupCount}}</span>
        <button @click="groupCount++" class="add-button">
          <span>+</span>
        </button>
        <button @click="groupCount--" class="minus-button">
          <span>-</span>
        </button>
        <button @click="uploadGroupCount" class="upload-group-count">
          <img src="../../assets/icon/file_upload.svg" alt="reset" />
          <span>提交分组数</span>
        </button>
      </div>
      <div class="groups-wrapper">
        <div class="group" name="group" v-for="(group,index) of finalGroups" @drop="drop($event)" @dragover="allowDrop($event)" :id="'g'+group._id">
          <div class="teachers-grouped" :id="'tg'+group._id">
            <span class="teacher-to chip no-selection" v-for="teacher of group.mentors" draggable="true" @dragstart="drag($event)" :id="'t'+teacher._id">
                  {{teacher.name}}
                </span>
          </div>
          <div class="students-grouped" :id="'sg'+group._id">
            <span class="student-to chip no-selection" v-for="student of group.students" draggable="true" @dragstart="drag($event)" :id="'s'+student._id">
                    {{student._id}}{{student.name}}
                </span>
          </div>
          <span class="group-id no-selection" :id="'p'+group._id">{{group._id}}</span>
        </div>
      </div>
      <div class="actions">
        <button @click="uploadGroups" class="orange">
          <img src="../../assets/icon/upload.svg" alt="upload" />
          <span>确认分组</span>
        </button>
        <a href="/admin/download?filename=FinalGroup" class="shadow">
          <img src="../../assets/icon/export.svg" alt="export" />
          <span>导出最终分组表</span>
        </a>
      </div>
      <div class="overlap" v-if="isOverlap">
        <div class="progress">
        <span>请稍等，正在后台处理中...</span>
          <mu-circular-progress :size="120" color="red"/>
        </div>
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
        groupCount: 6,
        isTab: false,
        isOverlap: false,
        finalGroups: [{
          _id:1,
          mentors: [{
            _id: '2103154',
            name: '张军'
          }, {
            _id: '5312561',
            name: '陈伟'
          }, {
            _id: '2310231',
            name: '陈丽芳'
          }],
          students: [{
            _id: '103051234 ',
            name: '李大康'
          }, {
            _id: '1012345',
            name: '李大伟'
          }, {
            _id: '4104567',
            name: '刘晓丽',
            tchId:'20305134301'
          }]
        }, {
          _id: 2,
          mentors: [{
            _id: '42145',
            name: '李军'
          }, {
            _id: '45612645',
            name: '刘伟'
          }, {
            _id: '645134',
            name: '张丽'
          }],
          students: [{
            _id: '123453 ',
            name: '王宝钏'
          }, {
            _id: '484123',
            name: '周大新'
          }, {
            _id: '45328543',
            name: '赵倩'
          }]
        }]
      }
    },
    methods: {
      drop($event) {
        $event.preventDefault() //阻止默认事件，防止页面跳转
        if ($event.target.id[0] !== 'g') //如果拖拽到非div则不接受
          return
        let elId = $event.dataTransfer.getData("elId") //被拖拽元素id和name
          ,
          elName = $event.dataTransfer.getData("elName") //
          ,
          id = $event.target.id.substring(1) //group id
          //拖到学生上
        console.log(id)
        if (elId[0] === 's')
          document.getElementById('sg' + id).appendChild(document.getElementById(elId))
        if (elId[0] === 't')
          document.getElementById('tg' + id).appendChild(document.getElementById(elId))
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
      uploadGroupCount(){
        this.POST('/admin/admFnlGroupCount',{count:this.groupCount})
          .then(res => {
                console.log(res.data)
                this.finalGroups = res.data
          })
      },
      uploadGroups() {
        new Promise((resolve,reject) => {
          this.isOverlap = true
          let group = document.getElementsByName('group'),
          groups = []
          if(!group)
            return 
        _.forEach(group, (g, index) => {
            groups[index] = {
              _id: 0,
              mentors: [],
              students: []
            }
            _.forEach(g.childNodes, (c) => {
              if (c.nodeName==='SPAN') {
                groups[index]._id=_.parseInt(c.id.substring(1))
              }
              if (c.nodeName === 'DIV') {

                if (c.id[0] === 't') {
                  _.forEach(c.childNodes, (teacher) => {
                    groups[index].mentors.push(teacher.id.substring(1))
                  })
                }
                if (c.id[0] === 's') {
                  _.forEach(c.childNodes, (student) => {
                    groups[index].students.push(student.id.substring(1))
                  })
                }
              }
            })
          })
          this.POST('/admin/admUpFTchGroups',groups)
            .then(res => {

            })
            .catch(err => {
            throw new Error(err)
          })
          resolve(groups)
        })
        .then((g)=>{
          this.isOverlap=false
          console.log(g)
        })
      },
      overflow(){
        this.groupCount < 1 ? this.groupCount = 1 : 1  
      }
    },
    watch:{
      groupCount:'overflow'
    }
}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';

.group-current-status
{
    width: 196px;
    margin: 16px 0;
    padding: 12px;
}
.instructions{
  font-size: 20px;
  padding-bottom: 14px;
}
.final-group-teacher
{
    width: 100%;
    padding: 16px 8px;
    .group-settings
    {
        padding-left: 16px;
        display: flex;
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
        .minus-button
        {
            border-left: none;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
        }
        .upload-group-count
        {
            margin-left: 16px;

            border-radius: 3px;
        }
    }
}

.teachers-grouped
{
    padding: 8px;

    border-bottom: 1px dashed #727877;
}
.students-grouped
{
    padding: 8px;
}

.group
{
    position: relative;
    display: block;
}
.group-length
{
    font-size: 20px;
    line-height: 34px;

    width: 40px;
    height: 38px;
    margin-right: 16px;

    text-align: center;

    border: 1px solid #aaa;
    border-radius: 3px;
}
.actions button
{
    margin: 3px 16px;
}
.overlap
{
    position: fixed;
    z-index: 200;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;

    width: 100vw;
    height: 100vh;

    background-color: rgba(0,0,0,.5);

    align-items: center;
    justify-content: center;
    .progress
    {
        font-size: 20px;

        width: 320px;
        height: 320px;
        padding-top: 60px;

        text-align: center;

        border-radius: 4px;
        background-color: #fff;
        .mu-circular-progress
        {
            margin-top: 24px;
        }
    }
}

</style>