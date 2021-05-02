<template>
  <div class="total">
    <div class="content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>课程视频上传</span>
        </div>

        <div>
          <input
            type="file"
            id="files"
            style="display: none"
            @change="fileImport"
            accept="video/avi,video/mp4"
          /><label style="cursor: pointer; color: #409eff" for="files"
            >点击上传</label
          >
        </div>
        <div style="text-align: center; margin-top: 100px">
          <div class="div-video-info">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入视频描述"
              maxlength="1000"
              show-word-limit
              v-model="videoInfo"
            >
            </el-input>
          </div>
          <div class="div-video-info">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                {{ content }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item, index) in courseList"
                  :key="index"
                  :command="item.Id"
                  >{{ item.courseName }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-card>
    </div>

    <div class="content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>添加课程</span>
        </div>

        <div>
          <el-form :model="course">
            <el-form-item label="课程名" label-width="100px">
              <el-input
                v-model="course.courseName"
                placeholder="课程名"
              ></el-input>
            </el-form-item>
            <el-form-item label="课程信息" label-width="100px">
              <el-input
                v-model="course.courseInfo"
                placeholder="课程信息"
              ></el-input>
            </el-form-item>
            <el-form-item style="margin: auto">
              <el-button type="primary" @click="addCourse()"
                >添加课程</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { postCoursesUrl, getCoursesUrl, postCourse } from "../../util/api.js";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      course: {
        courseName: "",
        courseInfo: "",
      },
      videoInfo: "",
      courseList: [],
      courseId: "",
      content: "请绑定课程",
    };
  },
  mounted() {
    this.getCourseList();
  },
  methods: {
    addCourse() {
      if (this.course.courseName.trim() === "") return;
      if (this.course.courseInfo.trim() === "") return;

      let loading = Loading.service({
        target: ".el-form",
      });

      let data = new URLSearchParams();
      data.set("courseName", this.course.courseName);
      data.set("courseInfo", this.course.courseInfo);
      let callback = (res) => {
        loading.close();

        this.$message({
          message: res.message,
          type: "success",
        });
      };

      let error = (res) => {
        loading.close();
        this.$message({
          message: res.message,
          type: "warning",
        });
      };

      let exception = (res) => {
        loading.close();
        this.$message({
          message: res.message,
          type: "error",
        });
      };

      this._ajax(
        "post",
        postCourse,
        data,
        {},
        callback,
        error,
        exception,
        "application/x-www-form-urlencoded"
      );
    },
    getCourseList() {
      let loading = Loading.service({
        target: ".el-dropdown",
      });

      let callback = (res) => {
        loading.close();
        this.courseList = res.data;

        this.$message({
          message: res.message,
          type: "success",
        });
      };

      let error = (res) => {
        loading.close();
        this.$message({
          message: res.message,
          type: "warning",
        });
      };

      let exception = (res) => {
        loading.close();
        this.$message({
          message: res.message,
          type: "error",
        });
      };

      this._ajax("get", getCoursesUrl, {}, {}, callback, error, exception);
    },
    handleCommand(command) {
      this.courseId = command;
      this.courseList.forEach((item) => {
        if (this.courseId === item.Id) this.content = item.courseName;
      });
    },
    fileImport(e) {
      var selectedFile = document.getElementById("files").files[0];

      if (!selectedFile) return;
      if (this.courseId == "") return;
      if (this.videoInfo.trim() === "") return;

      let loading = Loading.service({
        target: ".el-card",
      });

      let data = new FormData();
      data.set("file", selectedFile);
      data.set("videoInfo", this.videoInfo);
      data.set("courseId", this.courseId);

      let callback = (res) => {
        loading.close();
        this.$message({
          message: res.message,
          type: "success",
        });

        this.courseId = "请绑定课程";
        this.videoInfo = "";
      };

      let error = (res) => {
        loading.close();
        this.$message({
          message: res.message,
          type: "warning",
        });
      };

      let exception = (res) => {
        loading.close();
        this.$message({
          message: res.message,
          type: "error",
        });
      };

      this._ajax(
        "post",
        postCoursesUrl,
        data,
        {},
        callback,
        error,
        exception,
        "multipart/form-data"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin: 50px;
}

.box-card {
  min-width: 600px;
  min-height: 600px;
}

.el-card {
  /deep/ .el-card__body {
    min-height: 600px;
    margin: auto;
    text-align: center;
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }
}
.div-video-info {
  width: 40%;
  display: inline-block;
}
</style>