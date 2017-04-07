# GDMS 毕业设计管理系统

> A Vue.js App For Graduation Project
> 前端基于Vue.js，后端基于Nodejs和MongoDB的毕业设计管理系统

## 项目构建设置

``` bash
# 安装项目依赖 install dependencies 
npm install

# 在8080打开调试热更新 serve with hot reload at localhost:8080
npm run dev

# 构建生产版 build for production with minification
npm run build

# 打开服务器 在3000端口进行监听 run server at localhost:3000
npm run server
```

## 功能描述
``` 
+ 学生
    选择题目，后台判定，自动分组，信息展示
+ 老师
    创建课题，选择学生，分组查看，评分系统
+管理员 
    后台管理，名单导出，流程控制
```

## 组件框架 
```
+ UI组件
    MuseU, VueMaterial 基于Material Design原则设计的Vue 组件框架，
    自定义需要各使用其部分组件，如按钮和表格
+ Ajax
    Axios 基于Promise的Ajax库，官方推荐
+ 后台框架
    Express,Mongoose
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
