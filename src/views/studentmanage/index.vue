<template>
  <div class="content">
    <div>
      <div class="query-form">
        <el-input
          placeholder="请输入课程号"
          v-model="queryStr"
          v-myfocus
          @input="queryKey()"
          clearable
          @keyup.enter.native="queryKey()"
        ></el-input>
        <el-button size="medium" @click="queryKey()" type="primary"
          >搜索</el-button
        >
        <el-button size="medium" @click="getStudentTest()" type="primary"
          >刷新</el-button
        >
      </div>
    </div>
    <el-table :data="studentTestList" border style="width: 100%">
      <el-table-column prop="course_name" label="课程号" align="center">
      </el-table-column>

      <el-table-column prop="test_answers" label="答案" align="center">
      </el-table-column>

      <el-table-column prop="test_content" label="考试内容" align="center">
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            plain
            id="button-evaluate"
            @click="deleteTest(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import { getStudentTestUrl, deleteStudentTestUrl } from "../../util/api.js";
export default {
  mounted() {
    this.getStudentTest();
  },
  data() {
    return {
      studentTestList: [],
      queryStr: "",
      searchTest: [],
    };
  },
  methods: {
    deleteTest(test) {
      let loading = Loading.service({
        target: "button-evaluate",
      });

      let params = {
        testid: test.id,
      };
      let callback = (res) => {
        loading.close();

        this.$message({
          message: res.message,
          type: "success",
        });
        this.getStudentTest();
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
        "delete",
        deleteStudentTestUrl,
        {},
        params,
        callback,
        error,
        exception
      );
    },
    getStudentTest() {
      let loading = Loading.service({
        target: ".el-table",
      });

      let callback = (res) => {
        loading.close();

        this.studentTestList = this.searchTest = res.data;
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

      this._ajax("get", getStudentTestUrl, {}, {}, callback, error, exception);
    },
    queryKey() {
      const queryResult = this.queryStr.trim();
      if (queryResult === "") {
        this.studentTestList = this.searchTest;
        return;
      }

      this.studentTestList = this.studentTestList.filter((item) => {
        if (
          item.course_name.includes(queryResult) ||
          item.id.includes(queryResult)
        )
          return true;
        else return false;
      });
    },
  },
};
</script>

<style scoped>
.content {
  margin-top: 10px;
  padding: 10px;
}
.query-form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.el-input {
  width: 50%;
}
p {
  overflow: auto;
}
.button-child-evaluate {
  float: right;
}
</style>