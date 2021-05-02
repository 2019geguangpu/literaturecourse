<template>
  <div>
    <div>
      <el-table
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
            <template v-if="!scope.row.isExistTest">
              <el-button
                @click="getTestPaper(scope.row)"
                type="text"
                size="small"
                >开始考试</el-button
              >
            </template>
            <template v-else>
              <el-select
                v-model="testContent"
                placeholder="请选择考试试卷"
                @change="showTestPaper"
              >
                <el-option
                  v-for="item in scope.row.testList"
                  :key="item.id"
                  :label="item.id"
                  :value="item.test_content"
                >
                </el-option>
              </el-select>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-for="(item, index) in testPaper" :key="index" style="overflow: auto">
      <h1>{{ index + 1 }}.{{ item.content.value }}</h1>

      <template v-if="item.type === 'question'">
        <div class="answer">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6 }"
            placeholder="答案"
            v-model="item.answer"
          >
          </el-input>
        </div>
      </template>
      <template v-else-if="item.type === 'radio'">
        <div class="answer radio-question">
          <el-radio v-model="item.answer" label="A">{{
            item.content.A
          }}</el-radio>
          <el-radio v-model="item.answer" label="B">{{
            item.content.B
          }}</el-radio>
          <el-radio v-model="item.answer" label="C">{{
            item.content.C
          }}</el-radio>
          <el-radio v-model="item.answer" label="D">{{
            item.content.D
          }}</el-radio>
        </div>
      </template>
      <template v-else-if="item.type === 'judge'">
        <div class="answer radio-question">
          <el-radio v-model="item.answer" label="true">对</el-radio>
          <el-radio v-model="item.answer" label="false">错</el-radio>
        </div>
      </template>
      <template v-else>
        <div class="answer radio-question">
          <el-checkbox-group v-model="item.answer">
            <el-checkbox label="A" name="answer">{{
              item.content.A
            }}</el-checkbox>
            <el-checkbox label="B" name="answer">{{
              item.content.B
            }}</el-checkbox>
            <el-checkbox label="C" name="answer">{{
              item.content.C
            }}</el-checkbox>
            <el-checkbox label="D" name="answer">{{
              item.content.D
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </template>
    </div>

    <div class="div-submit-answer">
      <el-button type="success" plain @click="submitAnswer()">提交</el-button>
    </div>
    <el-dialog
      title="您的成绩"
      :visible.sync="scoreDialogVisible"
      width="30%"
      :modal="false"
    >
      <!-- {{ testContent }} -->
      <div style="text-align: center">
        <h1>{{ score }}分</h1>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="scoreDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTestPaperUrl,
  getStudentCourseUrl,
  postTestAnswerUrl,
} from "../../util/api.js";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      testPaper: [],
      answer: [],
      courseTable: [],
      papers: [],
      testId: "",
      courseId: "",
      testContent: "",
      scoreDialogVisible: false,
      score: "",
    };
  },
  methods: {
    showTestPaper(value) {
      this.testPaper = eval(value);
      this.testPaper.forEach((item) => {
        if (item.type === "checkbox") this.$set(item, "answer", []);
      });
      console.log(this.testPaper);
    },
    getCourseTable() {
      let loading = Loading.service({
        target: ".el-table",
      });

      let callback = (res) => {
        loading.close();
        this.courseTable = res.data;

        this.courseTable.forEach((course) => {
          this.$set(course, "isExistTest", false);
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
        getStudentCourseUrl,
        {},
        {},
        callback,
        error,
        exception
      );
    },
    submitAnswer() {
      if (this.courseId === "") return;
      this.testPaper.forEach((item) => {
        if(item.type === 'checkbox') this.answer.push(item.answer.reduce((str, cur) => str + cur, ''))
        else this.answer.push(item.answer);
        
      });
      let loading = Loading.service({
        target: ".el-table",
      });

      let params = {
        courseid: this.courseId,
      };

      let data = this.answer;
      let callback = (res) => {
        loading.close();
        this.courseId = "";

        const { data = 0 } = res;

        this.score = data;

        if (this.score == null) this.score = 0;

        this.scoreDialogVisible = true;
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
        postTestAnswerUrl,
        data,
        params,
        callback,
        error,
        exception
      );
    },

    getTestPaper(course) {
      let loading = Loading.service({
        target: ".el-table",
      });
      this.courseId = course.Id;
      let params = {
        courseid: course.Id,
      };
      let callback = (res) => {
        loading.close();
        if (res.data != null && res.data.length != 0) course.isExistTest = true;

        this.$set(course, "testList", res.data);
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
        getTestPaperUrl,
        {},
        params,
        callback,
        error,
        exception
      );
    },
  },
  mounted() {
    this.getCourseTable();
    // this.getTestPaper();
  },
};
</script>

<style scoped>
.answer {
  margin-top: 20px;
}
.radio-question {
  display: block;
}

.div-submit-answer {
  text-align: center;
}
h1 {
  height: 30px;
  color: black;
  font-style: bold;
  font-size: 30px;
}
</style>