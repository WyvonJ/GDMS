<template>
  <div class="group-container">
    
  </div>
</template>

<script>
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
        this.POST('/admin/admUpMTchGroups', groups)
          .then(res => {

          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    created() {
    }
}

</script>

<style lang="sass" rel="stylesheet/scss" scoped>
@import '../../style/variables.scss';

</style>