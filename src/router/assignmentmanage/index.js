const routes =  {
    path:'/assignmentmanage',
    name: 'assignmentmanage',
    component: resolve => require(['@/views/assignmentmanage'], resolve),
    meta: {
      title: '作业管理'
    }
}

export default routes; 