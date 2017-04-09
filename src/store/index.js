import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //进度条显示
    loading: false,
    //展示snackbar
    snackbarText: '',
    showSnackbar: false,
    /***********Student************/
    //设置现在的用户是谁
    user: {
      account: '',
      password: ''
    },
    //用户名
    userInfo: {
      userName: '',
      userType: -1,
      isFirstLogin: true
    },
    //notification信息
    notification: '',
    //一次取过来所有选题数据
    topicsData: [{
      _id: 1,
      category: 1,
      title: '基于3ds max的城市小区动画漫游设计与实现',
      details: '3ds max 是三维建模、动画制作的渲染软件，被广泛应用于制作角色动画、室内外效果图、游戏开发、建筑动画、影视动画、虚拟现实等领域。为了更好的让大众了解城市小区的建设和发展情况，我们可以用三维动画的形式来展示其全貌，本课题要求结合专业知识利用3ds max等软件实现虚拟城市小区动画漫游。',
      restriction: 3,
      secondstudents: [],
      thirdstudents: [3]
    }, {
      _id: 2,
      category: 0,
      title: '基于Unity3D的VR项目设计与实现',
      details: 'VR即虚拟现实，指综合利用计算机图形系统和各种实现及控制等接口设备，在计算机上生成的、可交互的三维环境中提供沉浸感觉的技术。虚拟现实技术实现的载体是虚拟现实仿真平台。VR技术可广泛的应用于规划展示、工业仿真、旅游教学等众多领域。利用Unity3D实现一个VR虚拟现实体验项目，给用户带来身临其境的感受。',
      firststudents: [1, 3],
      secondstudents: [],
      thirdstudents: [3]
    }, {
      _id: 3,
      category: 0,
      title: '图像的层次剖分算法及应用',
      details: '对一张数字图像进行剖分，用一些基本的几何面片进行逼近。这样的做法其实建起了离散到连续、数字到矢量、图像到几何的桥梁。应用领域也很广泛，如图像去噪、图像缩放、图像编辑、图像信息安全等多方面。',
      restriction: 2,
      firststudents: [1, 3],
      secondstudents: [],
      thirdstudents: [3]
    }, {
      _id: 4,
      category: 1,
      title: '安卓平台人类特征识别软件开发',
      details: '基于安卓平台开发一个app可以实现人的年龄、情感、性别等特征的识别',
      restriction: 3,
      firststudents: [1, 3],
      secondstudents: [],
      thirdstudents: [3]
    }, {
      _id: 5,
      category: 1,
      title: '货运配送物流管理系统的设计与实现',
      details: '本本体主要研究如何开发一套货运配送物流管理系统，用来给供求方和需要方之外的货运配送物流管理企业来提供服务的一套管理系统，货运配送物流管理系统应用于物流相关的企业，提供物流和库存的服务。',
      restriction: 1,
      firststudents: [1, 3],
      secondstudents: [],
      thirdstudents: [3]
    }, {
      _id: 6,
      category: 1,
      title: '面向医学图像的图像融合技术研究',
      details: '为弥补解剖结构图像（CT, MRI, B超等）和功能图像（SPECT, PET等）的各自不足，图像融合技术能够有效地融合解剖结构图像和功能图像得到更全面的新图像，便于医师后期诊疗做参考。本研究主要致力于选择几种流行的图像融合方法，对医学图像进行融合已检验哪种方法更为有效并进行总结得出结论。',
      restriction: 3,
      firststudents: [1, 3],
      secondstudents: [],
      thirdstudents: [3]
    }, {
      _id: 7,
      category: 1,
      title: '面向甲状腺癌诊断的智能识别技术探索',
      details: '甲状腺癌作为早期发现最易根治的癌症，当前受到广泛的研究和关注。随着人工智能技术的发展，越来越多的学者发现，利用现有的算法对甲状腺癌进行建模分析，可以得到能够媲美专家医师的诊断结论。因此，本研究主要致力于选择几种流行的或传统的智能别方法为后人做进一步研究提供一些结论。',
      restriction: 3,
      firststudents: [1, 3],
      secondstudents: [],
      thirdstudents: [3]
    }],
    //存在cart中的课题 等待提交
    selectedInCart: [],
    //已确定的课题
    //放在老师选择的卡片中的数据
    cardData: [],
    affirmativeTopic: {
      name: '',
      tel: '',
      email: '',
      office: '',
      qq: '',
      wechat: '',
      _id: -1,
      title: '',
      details: '',
      category: -1
    },
    //获取答辩分组
    grouping: {},
    /************Teacher***************/
    //创建的课题
    createdTopic: {
      account: '',
      fields: '',
      category: '',
      title: '',
      detail: '',
      availableSum: ''
    },
    //创建的所有课题 从服务器拿取
    createdTopics: [],
    resultData: [],
    /************Admin***************/
    //学生帐号管理
    studentAccounts: [],
    //导师帐号管理
    teacherAccounts: []

  },
  getters,
  mutations,
  actions
})

export default store
