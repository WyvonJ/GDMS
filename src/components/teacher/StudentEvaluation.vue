<template>
	<mu-card class="created-topics">
                    <md-table-card>
                        <md-toolbar>
                            <h1 class="md-title">学生评价表</h1>
                        </md-toolbar>
                        <md-table>
                            <md-table-header>
                                <md-table-row>
                                    <md-table-head>学号</md-table-head>
                                    <md-table-head>姓名</md-table-head>
                                    <md-table-head>课题</md-table-head>
                                    <md-table-head>评分</md-table-head>
                                </md-table-row>
                            </md-table-header>
                            <md-table-body>
                            <!--    <md-table-row v-for="(student
                                , index) in studentData" :key="rowIndex">
                                    <md-table-cell>{{ student._id }}</md-table-cell>
                                    <md-table-cell>
                                        {{ student.name}}
                                    </md-table-cell>
                                    <md-table-cell>
                                        {{ student.topic.name }}
                                    </md-table-cell>
                                    <md-table-cell>
                                       
                                    </md-table-cell>
                                    </md-table-cell>
                                </md-table-row>-->
                            </md-table-body>
                        </md-table>
                    </md-table-card>
                </mu-card>
</template>

<script>
	export default{
		data(){
			return{
				studentData:[{
					_id:'10352',
					name:'dale',
					topic:{
						name:'lalaland'
					}
				}]
			}
		}
	}
</script>