<template>
  <div class="group-container">
    <div class="tab-button">
      <button type="button" @click="isTab=true" class="add-topic-button">
        <img src="../../assets/icon/library_add.svg" alt="add" />
        <span>中期分组</span>
      </button>
      <button type="button" @click="isTab=false" class="manage-topic-button">
        <img src="../../assets/icon/subject.svg" alt="mag" />
        <span>终期分组</span>
      </button>
    </div>
    <transition-group class="tab-box" name="tab-tran">
      <div id="tab-box1" v-show="isTab" key="tab1">
        <div class="middle-group-teacher paper">
          <button @click="groups.push([])" class="blue">
            <img src="../../assets/icon/add_circle_outline.svg" alt="add" />
            <span> 添加</span>
          </button>
          <button @click="groups.splice(1,1)" class="red">
            <img src="../../assets/icon/delete_forever.svg" alt="delete" />
            <span> 删除</span>
          </button>
          <button @click="resetGroups" class="green-vue">
            <img src="../../assets/icon/reset_w.svg" alt="reset" />
            <span> 重置</span>
          </button>
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
        <a href="/admin/download?filename=finalgroup" class="shadow">
            <img src="../../assets/icon/export.svg" alt="export" />
            <span>导出终期分组表</span></a>
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
        groups:[[],[],[],[],[],[]],
        colors:[],
        isTab:true,
        teachers:[{
          _id:'2103154',
          name:'张军'
        },{
          _id:'5312561',
          name:'陈伟'
        },{
          _id:'2310231',
          name:'陈丽芳'
        }]
      }
    },
    computed: {
    },
    methods: {
      drop($event){
        //
        $event.preventDefault()
        let tchId = $event.dataTransfer.getData("tchId")
        let tchName = $event.dataTransfer.getData("tchName")
        let id = _.parseInt($event.target.id)
        let tch = {
          _id:tchId,
          name:tchName
        }
        if (tchId) {
          this.groups[id].push(tch)
          $event.target.appendChild(document.getElementById(tchId))
        }
        
      },
      drag($event){
        $event.dataTransfer.setData("tchId", $event.target.id)
        $event.dataTransfer.setData("tchName", $event.target.innerHTML.trim())

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
  }
  .add-topic-button{
    background-color: $greenVue;
  }
  .manage-topic-button{
    background-color: $blue;
  }
}
.group-current-status
{
    width: 196px;
    margin: 16px 0;
    padding: 12px;
}
.middle-group-teacher
{
    width: 100%;
    button{
      margin: 2px 12px;
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
        width: 320px;
        min-height: 64px;
        margin: 16px;
        padding: 8px;
        display: inline-block;
        border: 2px dashed #727877;
        position: relative;
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
</style>