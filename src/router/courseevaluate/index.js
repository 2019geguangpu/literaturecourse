const routes =  {
    path:'/courseevaluate',
    name: 'courseevaluate',
    component: resolve => require(['@/views/courseevaluate'], resolve),
    meta: {
      title: '课程评价'
    }
}

export default routes; 