<template>
  <div id="dashboard">
      <div id="header">
          <course-header></course-header>
      </div>

      <div id="main">
          <router-view></router-view>
      </div>
      <div id="footer">
          <course-footer></course-footer>
      </div>
  </div>
</template>

<script>
import courseHeader from '../../components/dashboard/header'
import courseFooter from '../../components/dashboard/footer'

export default {
    components: {
        courseHeader,
        courseFooter
    }

}
</script>

<style scoped>

#dashboard{
    width: 100%;
    display: flex;
    align-content: space-between;
    flex-direction: column;
}

#header{
    /* position: fixed;
    top: 0;
    left: 0;
    height: 80px; */
    width: 100%;
}

#main{

    /* position: fixed;
    top: 80px;
    bottom: 30px;
    left: 0; */
    width: 100%;
    overflow: auto;
}

#footer{

    /* position: fixed;
    bottom: 0;
    left: 0;
    height: 30px; */
    width: 100%;
}
</style>