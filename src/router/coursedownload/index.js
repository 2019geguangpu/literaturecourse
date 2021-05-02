const routes =  {
    path:'/coursedownload',
    name: 'coursedownload',
    component: resolve => require(['@/views/coursedownload'], resolve),
    meta: {
      title: '课程下载'
    }
}

export default routes; 