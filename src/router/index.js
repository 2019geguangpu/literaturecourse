import Vue from 'vue'
import Router from 'vue-router'
import CourseDownload from '../router/coursedownload'
import ChatRoom from '../router/chatroom'
import TalkAnswer from '../router/talkanswer'
import StudentTest from '../router/studenttest'
import FileDownload from '../router/filedownload'
import CourseEvaluate from '../router/courseevaluate'
import AssignmentDistribute from '../router/assignmentdistribute'
import ScoreQuery from '../router/scorequery'
import StudentManage from '../router/studentmanage'
import TeacherManage from '../router/teachermanage'
import AssignmentManage from '../router/assignmentmanage'
import EvaluateManage from '../router/evaluatemanage'
import MessageManage from '../router/messagemanage'
import ScoreManage from '../router/scoremanage'


import userDB from '../util/userDB'
import Login from './login/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      redirect: '/coursedownload',
      component: resolve => require(['@/views/dashboard'], resolve),
      children: [
        CourseDownload,ChatRoom,TalkAnswer, StudentTest, FileDownload, CourseEvaluate, AssignmentDistribute, ScoreQuery
      ]
    },
    Login,
    {
      path: '/admin',
      name: 'admin',
      redirect: '/studentmanage',
      component: resolve => require(['@/views/dashboard'], resolve),
      children: [
        StudentManage, TeacherManage, AssignmentManage, EvaluateManage, MessageManage, ScoreManage
      ]
    }
  ]
})


router.beforeEach((to, from, next) => {
  console.log(localStorage.getItem('sessionName'))
  if (!localStorage.getItem('sessionName') && to.path !== '/login') {
      next({
          path: '/login'
      })
  } else {
      next()
  }
})


export default router
