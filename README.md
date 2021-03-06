# GDMS 毕业设计管理系统

> A Vue.js App For Graduation Project
> 前端基于Vue.js，后端基于Nodejs和MongoDB的毕业设计管理系统

[![forthebadge](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://forthebadge.com)


## 功能描述
+ 学生
    + 选择题目
    + 后台判定
    + 自动分组
    + 信息展示
+ 老师
    + 创建课题
    + 选择学生
    + 分组查看
    + 评分系统
+ 管理员
    + 帐号管理
    + 课题管理
    + 名单导出
    + 流程控制
    + 分组调控
    + 系统重置
    + 状态监控

## UI界面 同届同学真实数据测试
![](/src/assets/img/main_ui.png)

***

## 组件框架
+ UI组件
    + MuseUI, 基于Material Design原则设计的Vue 组件框架，
    + 自定义需要各使用其部分组件，如按钮和表格
+ Ajax
   + Axios 基于Promise的Ajax库，官方推荐
+ 后台框架
   + Express
   + Mongoose

## 需要添加和修复的功能
+ [x] 重复选题 每次应该得到 之前已选的题目 重复选题
+ [x] 判断类型
+ [x] 搜索算法失灵
+ [x] 降低外部UI组件需求
+ [x] 整合CSS
+ [x] 重新设计老师选择学生页面
+ [x] 答辩成绩 排名
+ [x] 文件上传下载
+ [x] 分组排序，整合
+ [ ] 历史记录回退
+ [ ] 管理员界面查看可视化
***

## 项目构建设置

``` bash
# 安装项目依赖 install dependencies
npm install

# 在8080打开调试热更新 serve with hot reload at localhost:8080
npm run dev

# 构建生产版 build for production with minification
npm run build

# 构建开发版 build for decelopment
npm run build:dev

# 打开服务器 在3000端口进行监听 run server at localhost:3000
npm run server
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
