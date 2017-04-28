<template>
  <div class="group-container">
    <div class="tab-button">
      <button type="button" @click="isTab=true" :class="{'focused':isTab}" class="add-topic-button">
        <img src="../../assets/icon/library_add.svg" alt="add" />
        <span>中期分组</span>
      </button>
      <button type="button" @click="isTab=false" :class="{'focused':!isTab}" class="manage-topic-button">
        <img src="../../assets/icon/subject.svg" alt="mag" />
        <span>终期分组</span>
      </button>
    </div>
    <transition-group class="tab-box" name="tab-tran">
      <div id="tab-box1" v-show="isTab" key="tab1">
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
            <div class="group" v-for="(group,index) of groups" @drop="drop($event)" @dragover="allowDrop($event)" :id="index">
              <span class="group-id no-selection">{{++index}}</span>
            </div>
          </div>
          <div class="actions">
            <button @click="uploadGroups" class="orange">
              <img src="../../assets/icon/upload.svg" alt="upload" />
              <span>上传教师分组</span>
            </button>
            <a href="/admin/download?filename=middlegroup" class="shadow">
              <img src="../../assets/icon/export.svg" alt="export" />
              <span>导出中期分组表</span>
            </a>
          </div>
          <div class="to-be-grouped">
            <p>待分组导师，拖拽进行分组，请先上传教师分组，再导出分组表：</p>
            <span class="teacher-to no-selection" v-for="teacher of teachers" draggable="true" @dragstart="drag($event)" :id="teacher._id">
          {{teacher.name}}
        </span>
          </div>
        </div>
      </div>
      <div id="tab-box2" v-show="!isTab" key="tab2">
        <div class="final-group-teacher paper">
          <div class="group-settings">
            <span>{{groupLength}}</span>
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
            <div class="group" v-for="(group,index) of finalGroups" @drop="drop($event)" @dragover="allowDrop($event)" :id="index">
              <div class="teachers-grouped">
                <span class="teacher-to no-selection" v-for="teacher of group.teachers" draggable="true" @dragstart="drag($event)" :id="teacher._id">
                  {{teacher.name}}
                </span>
              </div>
              <div class="students-grouped">
                <span class="student-to no-selection" v-for="student of group.students" draggable="true" @dragstart="drag($event)" :id="student._id">
                    {{student._id}}{{student.name}}
                </span>
              </div>
              <span class="group-id no-selection">{{++index}}</span>
            </div>
          </div>
          <div class="actions">
            <button @click="uploadGroups" class="orange">
              <img src="../../assets/icon/upload.svg" alt="upload" />
              <span>上传教师分组</span>
            </button>
            <a href="/admin/download?filename=middlegroup" class="shadow">
              <img src="../../assets/icon/export.svg" alt="export" />
              <span>导出中期分组表</span>
            </a>
          </div>
          <div class="to-be-grouped">
            <p>待分组导师，拖拽进行分组，请先上传教师分组，再导出分组表：</p>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
export default {
  data() {
      return {
        status: 0,
        groupLength:6,
        groups:[[],[],[],[],[],[]],
        colors:[],
        isTab:false,
        teachers:[{
          _id:'2103154',
          name:'张军'
        },{
          _id:'5312561',
          name:'陈伟'
        },{
          _id:'2310231',
          name:'陈丽芳'
        }],
        finalGroups:[{
          teachers:[{
          _id:'2103154',
          name:'张军'
        },{
          _id:'5312561',
          name:'陈伟'
        },{
          _id:'2310231',
          name:'陈丽芳'
        }],
          students:[
          {
          _id:'103051234 ',
          name:'李大康'
        },{
          _id:'1012345',
          name:'李大伟'
        },{
          _id:'4104567',
          name:'刘晓丽'
        }]
        },{
          teachers:[{
          _id:'42145',
          name:'李军'
        },{
          _id:'45612645',
          name:'刘伟'
        },{
          _id:'645134',
          name:'张丽'
        }],
          students:[
          {
          _id:'123453 ',
          name:'王宝钏'
        },{
          _id:'484123',
          name:'周大新'
        },{
          _id:'45328543',
          name:'赵倩'
        }]
        }]
      }
    },
    computed: {
    },
    methods: {
      drop($event){
        //
        $event.preventDefault()//阻止默认事件，防止页面跳转
        if($event.target.nodeName!=='DIV')//如果拖拽到非div则不接受
          return 
        let elId = $event.dataTransfer.getData("elId")//被拖拽元素id和name
        let elName = $event.dataTransfer.getData("elName")//
        let id = $event.target.id //group id
        console.log(id)
        //拖到学生上
        if (id.indexOf(0)==='g') {
          if (elId) {
          this.groups[id].push(el)
          
          $event.target..appendChild(document.getElementById(elId))
          id = _.parseInt(id)
          this.finalGroups[id].students.push(el)
        }
        }
        
        
        let el = {
          _id:elId,
          name:elName
        }
        
        
      },
      drag($event){
        //获取被拖拽元素的id 也就是绑定的帐号id
        $event.dataTransfer.setData("elId", $event.target.id)
        //获取用户姓名 用于传递
        $event.dataTransfer.setData("elName", $event.target.innerHTML.trim())
      },
      allowDrop($event){
        $event.preventDefault()
      },
      resetGroups(){
        this.groups=[[],[],[],[],[],[]]
        axios.get('/admin/admTchMidList')
        .then(res => {
          this.teachers = res.data
        })
        .catch(err => {
          throw new Error(err)
        })
      },
      uploadGroups(){
        axios.post('/admin/admUpTchGroups')
          .then(res => {

          })
        console.log(this.groups)
      },
      exportMiddleGroup(){
        axios.get('/admin/download')
          .then(res=>{
            console.log(res)
          })
      },
      exportFinalGroup(){
        
      }
    },
    created() {
      axios.get('/admin/admTchMidList')
        .then(res => {
          this.teachers = res.data
        })
        .catch(err=>{
          throw new Error(err)
        })
    }
}

</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';

.tab-button{
  padding: 16px;
  text-align: center;
  button{
    border-radius: 0;
    &.focused{
      box-shadow: 0 0 3px 1px #898989;
    }
  }
  .add-topic-button{
    background-color: $greenVue;
    &:hover{
      background-color: #53dd9f;
    }
  }
  .manage-topic-button{
    background-color: $blue;
    &:hover{
      background-color: #3cbef8;
    }
  }
}
.group-current-status
{
    width: 196px;
    margin: 16px 0;
    padding: 12px;
}
.middle-group-teacher,
.final-group-teacher
{
    width: 100%;
    .group-settings{
      padding-left: 16px;
      button{
        border-radius: 0;
        border: 1px solid #aaa;
        background-color: #FFF;
        color: #333;
        &:hover{
          background-color: #e7e7e7;
        }
      }
      .add-button{
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      }
      .reset-button{
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
        min-width: 320px;
        min-height: 64px;
        margin: 16px;
        padding: 8px 96px 8px 8px;
        display: inline-block;
        border: 1px dashed #727877;
        position: relative;
        display: inline-flex;
        flex-wrap: wrap;
        align-items: flex-start;
        &::after{
              content: '拖拽到这里';
              height: 100%;
              width: 92px;
              background-color: rgba(227, 225, 225, 0.28);
              position: absolute;
              right: 0;
              top: 0;
              border-left: 1px dashed #888;
        }
        &:hover{
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
    }
    }
.teacher-to
{
    font-size: 18px;
    line-height: 20px;

    margin: 4px;
    padding: 3px 12px;

    cursor: move;

    color: white;
    border-radius: 20px;
    background-color: #afafaf;
    transition: $material-enter;
    &:hover{
      background-color: #8f8f8f;
    }
}
.student-to{
  font-size: 18px;
    line-height: 20px;

    margin: 4px;
    padding: 3px 12px;

    cursor: move;

    color: white;
    border-radius: 20px;
    background-color: #f44336;
    transition: $material-enter;
    &:hover{
      background-color: #8f8f8f;
    }
}
.to-be-grouped{
  width: 100%;
  min-height: 64px;
  p{
    padding: 8px;
    font-size: 18px;
    margin: 10px;
  }
}
.tab-box .paper{
  padding: 12px 8px;
}
#tab-box1,#tab-box2{
  width: 100%;
  a{
    width: 100px;
    height: 48px;
    padding: 12px;
    background-color: $lightBlue;
    color: white !important;
    border-radius: 3px;
    &:hover{
      color: white !important;
      background-color: $lightBlue600;
    }
  }
}
.actions button{
  margin: 3px 16px;
}
.teachers-grouped{
  display: flex;
}
.students-grouped{
  display: flex;

}
</style>