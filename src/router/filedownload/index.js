const routes =  {
    path:'/filedownload',
    name: 'filedownload',
    component: resolve => require(['@/views/filedownload'], resolve),
    meta: {
      title: '资料下载'
    }
}

export default routes; 