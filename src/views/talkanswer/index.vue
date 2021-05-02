<template>
  <div class="content">
    <el-table :data="evaluateList" border style="width: 100%">
      <el-table-column prop="Content" label="评论内容" align="center">
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <template v-if="!scope.row.isUpdate">
            <el-button
              size="mini"
              type="success"
              plain
              id="button-evaluate"
              @click="scope.row.isUpdate = true"
              >修改</el-button
            >
          </template>
          <template v-else>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入评论内容"
              maxlength="100"
              show-word-limit
              v-model="scope.row.Content"
              @blur="updateEvaluate(scope.row)"
            >
            </el-input>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import { getUserEvaluateUrl, updateUserEvaluateUrl } from "../../util/api.js";
export default {
  mounted() {
    this.queryKey();
  },
  data() {
    return {
      evaluateList: [],
      queryStr: "",
    };
  },

  methods: {
    updateEvaluate(evaluate) {
      let loading = Loading.service({
        target: ".el-table",
      });

      let data = {
          childContent: evaluate.ChildContent,
          content: evaluate.Content,
          courseId: evaluate.CourseId,
          id: evaluate.Id,
          userId: evaluate.UserId,
      };
      let callback = (res) => {
        loading.close();
        evaluate.isUpdate = false;
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
        updateUserEvaluateUrl,
        data,
        {},
        callback,
        error,
        exception
      );
    },
    queryKey() {
      let loading = Loading.service({
        target: ".el-table",
      });

      let callback = (res) => {
        loading.close();
        this.evaluateList = res.data;
        this.evaluateList.forEach((evaluate) => {
          this.$set(evaluate, "isUpdate", false);
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

      this._ajax("get", getUserEvaluateUrl, {}, {}, callback, error, exception);
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