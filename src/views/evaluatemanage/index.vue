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
        <el-button size="medium" @click="queryKey()" type="primary"
          >刷新</el-button
        >
      </div>
    </div>
    <el-table :data="evaluateList" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div
            v-for="(item, index) in [...props.row.ChildContent.split('*')]"
            :key="index"
          >
            <p>
              <span>{{ index + 1 }}楼:</span><span>{{ item.trim() === ''? '暂无评论内容': item }}</span>

              <el-button
                size="mini"
                type="danger"
                class="button-child-evaluate"
                plain
                @click="deleteChildEvaluate(props.row, item)"
                >删除</el-button
              >
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="Content" label="评论内容" align="center">
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            plain
            id="button-evaluate"
            @click="deleteEvaluate(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Loading } from "element-ui";

import {
  getCourseEvaluateUrl,
  deleteCourseEvaluateUrl,
  deleteCourseChildEvaluateUrl
} from "../../util/api.js";
export default {
  data() {
    return {
      evaluateList: [],
      queryStr: "",
    };
  },
  methods: {
    deleteChildEvaluate(evaluate, childEvaluate) {
      let loading = Loading.service({
        target: "button-evaluate",
      });

      let params = {
        evaid: evaluate.Id,
        childcentent: childEvaluate
      };

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
        "delete",
        deleteCourseChildEvaluateUrl,
        {},
        params,
        callback,
        error,
        exception
      );
    },
    deleteEvaluate(evaluate) {
      let loading = Loading.service({
        target: "button-evaluate",
      });

      let params = {
        id: evaluate.Id,
      };

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
        "delete",
        deleteCourseEvaluateUrl,
        {},
        params,
        callback,
        error,
        exception
      );
    },
    queryKey() {
      if (this.queryStr.trim() === "") return;

      let loading = Loading.service({
        target: ".el-table",
      });

      let params = {
        courseid: this.queryStr.trim(),
      };

      let callback = (res) => {
        loading.close();
        this.evaluateList = res.data;

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