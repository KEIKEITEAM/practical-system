import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import studentIndex from '@/views/student/studentIndex'
import teacherIndex from '@/views/teacher/teacherIndex'

Vue.use(Router)



export default new Router({

  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,


    },
    {
      path: '/studentIndex',
      name: 'studentIndex',
      component: studentIndex,

      children: [
        {
          path: '/friends',
          name: '我',
          component: () => import("@/views/student/friends.vue"),


        },
        {
          path: '/home',
          name: '首页',
          component: () => import("@/views/student/home.vue"),

        },
        {
          path: '/studentRecords',
          name: '任务',
          component: () => import("@/views/student/studentRecords.vue"),

        }
      ]
    },
    {
      path: '/teacherIndex',
      name: 'teacherIndex',
      component: teacherIndex,

      children: [
        {
          path: '/teacherFriends',
          name: '我',
          component: () => import("@/views/teacher/teacherFriends.vue"),

        },

        {
          path: '/teacherHome',
          name: '首页',
          component: () => import("@/views/teacher/teacherHome.vue"),

        },
        {
          path: '/records',
          name: '任务',
          component: () => import("@/views/teacher/records.vue"),

        },
        {
          path: '/professionalGrade',
          name: '专业群年级',
          component: () => import("@/views/teacher/professionalGrade.vue"),
        }
      ]
    },


  ],

})





