<template>
  <div class="content">
    <el-table
      id="table-courselist"
      :data="courseTable"
      style="width: 100%; height: 50%; overflow: auto"
    >
      <el-table-column prop="Id" label="课程号" align="center">
      </el-table-column>
      <el-table-column prop="courseName" label="课程名称" align="center">
      </el-table-column>
      <el-table-column prop="courseInfo" label="课程信息" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            @click="getCourseVideoList(scope.row)"
            type="text"
            size="small"
            >学习</el-button
          >
          <el-button
            @click="getCourseEvaluate(scope.row)"
            type="text"
            size="small"
            >评论</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="div-course-video-list">
      <div class="div-video-item">
        <video
          :src="videoUrl"
          id="courseVideo"
          controls="controls"
          height="100%"
          width="100%"
          data-src=""
        ></video>
      </div>
      <div class="div-video-list">
        <ul class="ul-course-list">
          <li v-for="(item, index) in courseList" :key="index">
            <span>{{ item.videoInfo }}</span>
            <el-button
              @click="openPlayer(item.videoUrl)"
              type="primary"
              size="small"
              >播放视频</el-button
            >
          </li>
        </ul>
      </div>
    </div>

    <el-dialog
      title="评论"
      :visible.sync="commentDialogVisible"
      :modal="false"
      fullscreen
    >
      <div>
        <el-table :data="evaluateList" border style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <div
                v-for="(item, index) in [...props.row.ChildContent.split('*')]"
                :key="index"
              >
                <p>
                  <span>{{ index + 1 }}楼:</span
                  ><span>{{ item.trim() === "" ? "暂无评论内容" : item }}</span>
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="Content" label="评论内容" align="center">
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <template v-if="!scope.row.isReplyChildEvaluate">
                <el-button
                  size="mini"
                  type="primary"
                  plain
                  @click="scope.row.isReplyChildEvaluate = true"
                  >回复</el-button
                >
              </template>
              <template v-else>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入评论内容"
                  maxlength="100"
                  show-word-limit
                  v-model="childComment"
                  @blur="addChildEvaluate(scope.$index, scope.row)"
                >
                </el-input>
              </template>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入评论内容"
            maxlength="100"
            show-word-limit
            v-model="comment"
          >
          </el-input>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="commentDialogVisible = false">取 消</el-button>
        <el-button id="button-evaluate" type="primary" @click="postEvaluate()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import {
  getStudentCourseUrl,
  getVideoListUrl,
  getVideoItemUrl,
  getCourseEvaluateUrl,
  postCourseEvaluateUrl,
  postCourseChildEvaluateUrl,
} from "../../util/api.js";
export default {
  data() {
    return {
      courseTable: [],
      comment: "",
      commentDialogVisible: false,
      courseList: [],
      videoUrl: "",
      video: "",
      evaluateList: [],
      evaluateCourseId: "",
      childComment: "",
    };
  },
  beforeDestroy() {
    this.video = null;
  },

  methods: {
    addChildEvaluate(index, evaluate) {
      if (this.childComment.trim() === "") return;

      let loading = Loading.service({
        target: document.getElementById("button-evaluate"),
      });

      let params = {
        evaid: evaluate.Id,
        childcentent: this.childComment,
      };

      let callback = (res) => {
        loading.close();
        evaluate.isReplyEvaluate = false;
        this.getCourseEvaluate({ Id: evaluate.CourseId });

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
        postCourseChildEvaluateUrl,
        {},
        params,
        callback,
        error,
        exception
      );
    },
    postEvaluate() {
      if (this.comment.trim() === "") return;

      let loading = Loading.service({
        target: document.getElementById("button-evaluate"),
      });

      let data = {
        courseId: this.evaluateCourseId,
        content: this.comment,
      };

      let callback = (res) => {
        loading.close();
        this.getCourseEvaluate({ Id: this.evaluateCourseId });

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
        postCourseEvaluateUrl,
        data,
        {},
        callback,
        error,
        exception
      );
    },
    getCourseEvaluate(course) {
      this.evaluateCourseId = course.Id;
      this.commentDialogVisible = true;
      let loading = Loading.service({
        target: ".el-dialog",
      });

      let params = {
        courseid: course.Id,
      };

      let callback = (res) => {
        loading.close();
        this.evaluateList = res.data;

        this.evaluateList.forEach((evaluate) => {
          this.$set(evaluate, "isReplyChildEvaluate", false);
        });

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
        "get",
        getCourseEvaluateUrl,
        {},
        params,
        callback,
        error,
        exception
      );
    },
    openPlayer(url) {
      let loading = Loading.service({
        target: ".ul-course-list",
      });

      let params = {
        videoUrl: url,
      };

      let callback = (res) => {
        loading.close();

        this.video.src = window.URL.createObjectURL(res);

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
        "get",
        getVideoItemUrl,
        {},
        params,
        callback,
        error,
        exception,
        "application/json",
        "blob"
      );
    },
    getCourseVideoList(course) {
      let loading = Loading.service({
        target: ".ul-course-list",
      });

      const courseId = course.Id;

      let params = {
        courseId,
      };
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

      this._ajax(
        "get",
        getVideoListUrl,
        {},
        params,
        callback,
        error,
        exception
      );
    },
    handleClick(course) {
      let loading = Loading.service({
        target: document.getElementById("table-courselist"),
      });

      const courseId = course.Id;

      let data = new URLSearchParams();
      data.set("courseId", courseId);
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
        getStudentCourseUrl,
        data,
        {},
        callback,
        error,
        exception,
        "application/x-www-form-urlencoded"
      );
    },
    getCourseTable() {
      let loading = Loading.service({
        target: ".el-table",
      });

      let callback = (res) => {
        loading.close();
        this.courseTable = res.data;

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
        "get",
        getStudentCourseUrl,
        {},
        {},
        callback,
        error,
        exception
      );
    },
  },

  mounted() {
    this.getCourseTable();
    this.video = document.getElementById("courseVideo");
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
ul > li {
  height: 30px;
  width: 100%;
}
.content {
  height: 100%;
}
.span-course-video {
  color: #409eff;
  cursor: pointer;
  text-decoration: underline;
}
.div-course-video-list {
  width: 100%;
  height: 50%;
  overflow: auto;
  position: relative;
}
.div-video-item {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 40%;
}

.div-video-list {
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 20%;
}
.ul-course-list {
  text-align: center;
  line-height: 30px;
}
</style>