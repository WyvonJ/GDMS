<template>
  <div class="main-content">
    <mu-card>
      <mu-card-title title="选题志愿编辑" 
                     subTitle="拖动改变顺序，更改后请在已选课题中提交选题结果"/>
        <mu-card-text v-if="topicsEdit[0]!==null">
          还没有选题
        </mu-card-text>

        <transition-group tag="ul" 
                          name="slide">
          <li class="topic-item" 
              v-for="(topic,index) in topicsEdit" 
              v-dragging="{ item: topic, list: topicsEdit, group: 'topic' }"
              :key="topic.id">
              {{topic.id}} {{topic.title}}
            <mu-icon-button icon="delete_forever" 
                            @click="deleteTopic(index)"/>
            <mu-icon value="drag_handle" 
                     :size="40"/>
          </li>
      </transition-group>
      
    </mu-card>   
  </div>
</template>

<script type="text/javascript">
  export default{
    data(){
      return {
        dialog:false,
        topicsEdit:this.$parent.selectedInCart,
        enableEdit:true
      }
    },
    methods:{
      deleteTopic(index){
        //删除本条选题
        this.topicsEdit.splice(index,1)
      }
        //确认选题编辑
        //先清空 使用push方法才能触发视图更新 需更改为更好的用法
        //
        // this.$parent.topicsChosen=[]
        // for (let i = 0; i < this.topicsEdit.length; i++) {
        //   this.$parent.topicsChosen.push(this.topicsEdit[i])
        // }
        // //打开确认对话框
        // this.dialog=true
    },
    mounted(){
      //this.topicsEdit=this.$parent.topicsChosen
      this.$dragging.$on('dragged',({value})=>{
        //发生拖拽事件后的回调
        //this.topicsChanged[0]=(value.list[0]["text"])
       // this.topicsChanged[1]=(value.list[1]["text"])
       // this.topicsChanged[2]=(value.list[2]["text"])
      })
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss">
@import "../../style/variables.scss";
  .topic-item{
    transition: all .5s cubic-bezier(0,0,0.58,1);
    height:48px;
    line-height: 56px;
    font-size: 18px;
    padding-left: 12px;
    .mu-icon{
    float: right;
    cursor: move;
  }
  .mu-icon-button{
    position: absolute;
    right: 80px;
  }
}
</style>