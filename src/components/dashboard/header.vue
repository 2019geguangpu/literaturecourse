<template>
  <div id="content">
    <template v-if="!isAdmin">
      <el-menu
        :default-active="activeRoute"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item
          v-for="(item, index) in menus"
          :key="index"
          :index="item.path"
        >
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </template>
    <template v-else>
      <el-menu
        :default-active="activeRoute"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item
          v-for="(item, index) in menuAdmin"
          :key="index"
          :index="item.path"
        >
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </template>
    <div id="loginout">
        <el-button type="danger" @click="loginOut()">退出</el-button>
    </div>
  </div>
</template>

<script>
import {Loading} from 'element-ui';
import {loginOutUrl} from '../../util/api.js';
import Cookie from 'js-cookie';
export default {
 
  data() {
    return {
      isAdmin: sessionStorage.getItem('isAdmin') === 'true',
      menus: [
        {
          name: "课程在线",
          path: "/coursedownload",
        },
        {
          name: "资料下载",
          path: "/filedownload",
        },
        {
          name: "学生测试",
          path: "/studenttest",
        },
        {
          name: "作业下发",
          path: "/assignmentdistribute",
        },
        {
          name: "历史评价",
          path: "/talkanswer",
        },
        {
          name: "我的课程",
          path: "/courseevaluate",
        },
        {
          name: "成绩查询",
          path: "/scorequery",
        },
      ],
      menuAdmin: [
        {
          name: "考试管理",
          path: "/studentmanage",
        },
        {
          name: "课程管理",
          path: "/teachermanage",
        },
        {
          name: "试卷管理",
          path: "/assignmentmanage",
        },
        {
          name: "课程评价管理",
          path: "/evaluatemanage",
        },
        {
          name: '资料管理',
          path: '/messagemanage'
        },
        {
          name: '作业管理',
          path: '/scoremanage'
        }
      ],
    };
  },
  computed: {
    activeRoute() {
      return this.$route.path;
    },
  },
  methods: {
    loginOut() {
      
      let loading = Loading.service({
        target: '#content',
      });
      let callback = (res) => {
        loading.close();
        this.$message({
          message: res.message,
          type: 'success'
        })
        this.$router.push({
          path: "/login",
        });

        Cookie.remove(localStorage.getItem("sessionName"));
        localStorage.setItem("sessionName", "");
        localStorage.setItem("sid", "");
      };

      let error = (res) => {
        this.$message({
          message: res.message,
          type: 'warning'
        })
        loading.close();
      };

      let exception = (res) => {
        this.$message({
          message: res.message,
          type: 'error'
        })
        loading.close();
      };

      this._ajax('get', loginOutUrl, {}, {}, callback, error, exception);
    },
  },
};
</script>

<style lang="scss" scoped>
#content {
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: #545C64;
}

ul {
  display: flex;
  width: 100%;
  justify-content: center;
}
.el-menu-demo {
  height: 80px;
  /deep/ .el-menu-item {
    height: 80px;
    line-height: 80px;
    font-size: 20px;
  }
}
#loginout {
  display: flex;
  align-items: center;
  justify-self: flex-end;
  margin-right: 10px;
  
}

.el-menu.el-menu--horizontal{
  border-bottom: 0
}
</style>