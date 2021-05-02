const routes =  {
    path:'/assignmentdistribute',
    name: 'assignmentdistribute',
    component: resolve => require(['@/views/assignmentdistribute'], resolve),
    meta: {
      title: '作业下发'
    }
}

export default routes;