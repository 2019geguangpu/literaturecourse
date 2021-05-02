<template>
  <div class="content">

    <div>
      <div class="query-form">
        <el-input
          placeholder="请输入关键字"
          v-model="queryStr"
          v-myfocus
          @input="queryKey()"
          clearable
          @keyup.enter.native="queryKey()"
        ></el-input>
        <el-button size="medium" @click="queryKey()" type="primary"
          >搜索</el-button
        >
        <el-button size="medium" @click="refresh()" type="primary"
          >刷新</el-button
        >
      </div>
    </div>
    <el-table :data="scoreTable" border style="width: 100%">
      <el-table-column prop="course_name" label="课程名" align="center" > </el-table-column>
      <el-table-column prop="grade" label="成绩" align="center"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getStudentScoreUrl} from "../../util/api.js";
import {Loading} from 'element-ui';
export default {
  data() {
    return {
      scoreTable: [],

      queryStr: '',

    };
  },
  mounted(){
    this.refresh();
  },
  methods: {
    refresh() {
      let loading = Loading.service({
        target: ".el-table",
      });

      let callback = (res) => {
        loading.close();
        this.$message({
          message: res.message,
          type: "success",
        });
        const {data = []} = res;

        this.scoreTable = this.searchTable = data;

        this.scoreTable.forEach(item => {
          item.grade = Number.parseInt(Number.parseFloat((+item.grade).toFixed(2)) * 100, 10);
        })
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

      this._ajax("get", getStudentScoreUrl, {}, {}, callback, error, exception);
    },
    queryKey() {
      const queryResult = this.queryStr.trim();
      if (queryResult === "") {
        this.scoreTable = this.searchTable;
        return;
      }

      this.scoreTable = this.scoreTable.filter((item) => {
        if (
          item.course_name.includes(queryResult) ||
          item.grade.includes(queryResult)
        )
          return true;
        else return false;
      });
    },
  },
};
</script>

<style scoped>
.content{

  margin-top: 10px;
  padding: 10px
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
</style>