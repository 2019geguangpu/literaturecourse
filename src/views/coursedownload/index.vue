<template>
  <div>
    <el-table
      :data="courseTable"
      style="width: 100%"
    >
      <el-table-column prop="Id" label="课程号" align="center"> </el-table-column>
      <el-table-column prop="courseName" label="课程名" align="center"> </el-table-column>
      <el-table-column prop="courseInfo" label="课程信息" align="center"> </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >选课</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCoursesUrl, postChooseCoursesUrl } from "../../util/api.js";
import {Loading}  from 'element-ui';
export default {
  data() {
    return {
      courseTable: [],
    };
  },
  methods: {
    handleClick(course) {
      let loading = Loading.service({
        target: ".el-table",
      });

      const courseId = course.Id;

      let data = new URLSearchParams();
      data.set('courseId', courseId);
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

      this._ajax("post", postChooseCoursesUrl, data, {}, callback, error, exception, 'application/x-www-form-urlencoded');
    },
  },
  mounted() {
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

    this._ajax("get", getCoursesUrl, {}, {}, callback, error, exception);
  },
};
</script>

<style>
</style>