<template>
  <div>
    <div class="content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>作业下发</span>

          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="addTest()"
            >上传试卷</el-button
          >
          <el-button
            style="float: right; padding: 3px 0; margin-right: 5px"
            type="text"
            @click="testPaperDialogVisible = true"
            >试卷预览</el-button
          >
          <el-dropdown
            trigger="click"
            @command="handleCommand"
            style="float: right; padding: 3px 0; margin-right: 5px"
          >
            <span class="el-dropdown-link">
              {{ content }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in courseList"
                :key="index"
                :command="item.Id"
                >{{ item.Id }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div style="width: 40%">
          <el-tabs v-model="question.type" @tab-click="handleClick" stretch>
            <el-tab-pane label="问答题" name="question">
              <div>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 6 }"
                  placeholder="请输入问题"
                  v-model="question.content.value"
                >
                </el-input>
              </div>
              <div class="answer">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 6 }"
                  placeholder="请输入关键词并以分号隔开"
                  v-model="question.answer"
                >
                </el-input>
              </div>
            </el-tab-pane>
            <el-tab-pane label="单选题" name="radio">
              <div>
                <div class="answer">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    placeholder="请输入问题"
                    v-model="question.content.value"
                  >
                  </el-input>
                </div>
                <div class="answer">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    placeholder="请输入A选项"
                    v-model="question.content.A"
                  >
                  </el-input>
                </div>
                <div class="answer">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    placeholder="请输入B选项"
                    v-model="question.content.B"
                  >
                  </el-input>
                </div>
                <div class="answer">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    placeholder="请输入C选项"
                    v-model="question.content.C"
                  >
                  </el-input>
                </div>
                <div class="answer">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    placeholder="请输入D选项"
                    v-model="question.content.D"
                  >
                  </el-input>
                </div>
              </div>
              <div class="answer">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 6 }"
                  placeholder="请输入答案"
                  v-model="question.answer"
                  maxlength="1"
                >
                </el-input>
              </div>
            </el-tab-pane>
            <el-tab-pane label="判断题" name="judge">
              <div>
                <div class="answer">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    placeholder="请输入问题"
                    v-model="question.content.value"
                  >
                  </el-input>
                </div>
                <div class="answer">
                  <el-radio v-model="question.answer" label="true">对</el-radio>
                  <el-radio v-model="question.answer" label="false"
                    >错</el-radio
                  >
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="多选题" name="checkbox">
              <div>
                <div class="answer">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    placeholder="请输入问题"
                    v-model="question.content.value"
                  >
                  </el-input>
                </div>
                <div class="answer">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    placeholder="请输入A选项"
                    v-model="question.content.A"
                  >
                  </el-input>
                </div>
                <div class="answer">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    placeholder="请输入B选项"
                    v-model="question.content.B"
                  >
                  </el-input>
                </div>
                <div class="answer">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    placeholder="请输入C选项"
                    v-model="question.content.C"
                  >
                  </el-input>
                </div>
                <div class="answer">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    placeholder="请输入D选项"
                    v-model="question.content.D"
                  >
                  </el-input>
                </div>
              </div>
              <div class="answer">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 6 }"
                  placeholder="请输入答案"
                  v-model="question.answer"
                  maxlength="4"
                >
                </el-input>
              </div>
            </el-tab-pane>
          </el-tabs>

          <div class="answer button-test-paper">
            <el-button type="primary" plain @click="toTestPaper()"
              >加入试卷</el-button
            >
          </div>
        </div>
      </el-card>
    </div>
    <div>
      <el-dialog
        title="试卷"
        :visible.sync="testPaperDialogVisible"
        width="50%"
        :modal-append-to-body="isAppendToBody"
      >
        <div>
          <div
            v-for="(item, index) in testPaper"
            :key="index"
            style="overflow: auto"
          >
            <h1>{{ index + 1 }}.{{ item.content.value }}</h1>

            <template v-if="item.type === 'question'">
              <div class="answer">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 6 }"
                  placeholder="答案"
                  v-model="item.answer"
                  disabled
                >
                </el-input>
              </div>
            </template>
            <template v-else-if="item.type === 'radio'">
              <div class="answer radio-question">
                <el-radio v-model="item.answer" label="A" disabled>{{
                  item.content.A
                }}</el-radio>
                <el-radio v-model="item.answer" label="B" disabled>{{
                  item.content.B
                }}</el-radio>
                <el-radio v-model="item.answer" label="C" disabled>{{
                  item.content.C
                }}</el-radio>
                <el-radio v-model="item.answer" label="D" disabled>{{
                  item.content.D
                }}</el-radio>
              </div>
            </template>
            <template v-else-if="item.type === 'judge'">
              <div class="answer radio-question">
                <el-radio v-model="item.answer" label="true" disabled
                  >对</el-radio
                >
                <el-radio v-model="item.answer" label="false" disabled
                  >错</el-radio
                >
              </div>
            </template>
            <template v-else>
              <div class="answer radio-question">
                <el-checkbox-group v-model="item.answer">
                  <el-checkbox label="A" disabled>{{
                    item.content.A
                  }}</el-checkbox>
                  <el-checkbox label="B" disabled>{{
                    item.content.B
                  }}</el-checkbox>
                  <el-checkbox label="C" disabled>{{
                    item.content.C
                  }}</el-checkbox>
                  <el-checkbox label="D" disabled>{{
                    item.content.D
                  }}</el-checkbox>
                </el-checkbox-group>
              </div>
            </template>
            <div class="button-operate">
              <el-button
                @click="deleteQuestion(item, index)"
                type="danger"
                size="mini"
                >删除</el-button
              >
              <el-button @click="moveUp(item, index)" type="primary" size="mini"
                >上移</el-button
              >
              <el-button
                @click="moveDown(item, index)"
                type="primary"
                size="mini"
                >下移</el-button
              >
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="testPaperDialogVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="button-"></div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import { postTestPaperUrl, getCoursesUrl } from "../../util/api.js";
export default {
  mounted(){
    this.getCourseTable();
  },
  data() {
    return {
      courseTestList: [],
      testPaper: [],
      testPaperDialogVisible: false,

      question: {
        type: "question",
        answer: "",
        content: {
          value: "",
          A: "",
          B: "",
          C: "",
          D: "",
        },
      },
      answer: [],
      isAppendToBody: false,
      courseId: "",
      content: "请绑定课程",
      courseList: [],
    };
  },
  methods: {
    getCourseTable() {
      let loading = Loading.service({
        target: ".el-table",
      });

      let callback = (res) => {
        loading.close();
        console.log(res);
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
        getCoursesUrl,
        {},
        {},
        callback,
        error,
        exception
      );
    },
    handleCommand(command) {
      this.courseId = command;
      this.content = command;
    },
    addTest() {
      if(this.courseId == '') return;
      if(this.testPaper.length === 0) return;
      let loading = Loading.service({
        target: ".el-card",
      });

      let data = {
        course_id: this.courseId,
        test_content: this.testPaper,
        test_answers: this.answer
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

      this._ajax("post", postTestPaperUrl, data, {}, callback, error, exception);
    },
    moveUp(item, index) {
      if (index === 0) return;
      const temp = JSON.parse(JSON.stringify(this.testPaper[index - 1]));
      const tempAnswer = JSON.parse(JSON.stringify(this.answer[index - 1]));

      this.testPaper.splice(index - 1, 1, item);
      this.testPaper.splice(index, 1, temp);

      const itemAnswer = this.answer[index];
      this.answer.splice(index - 1, 1, itemAnswer);
      this.answer.splice(index, 1, tempAnswer);
      console.log(this.answer);
    },
    moveDown(item, index) {
      if (index === this.testPaper.length - 1) return;

      const temp = JSON.parse(JSON.stringify(this.testPaper[index + 1]));
      const tempAnswer = JSON.parse(JSON.stringify(this.answer[index + 1]));
      this.testPaper.splice(index + 1, 1, item);
      this.testPaper.splice(index, 1, temp);

      const itemAnswer = this.answer[index];
      this.answer.splice(index + 1, 1, itemAnswer);
      this.answer.splice(index, 1, tempAnswer);

      console.log(this.answer);
    },
    deleteQuestion(item, index) {
      this.testPaper.splice(index, 1);
      this.answer.splice(index, 1);
    },
    handleClick(tab, event) {},
    toTestPaper() {
      if (this.question.answer.trim() === "") return;
      if (this.question.content.value.trim() === "") return;
      // if (this.question.type === "checkbox")
      //   this.question.answer = [...this.question.answer];
      // else if (this.question.type === "question")
      //   this.question.answer = this.question.answer.split(";");

      const qus = JSON.parse(JSON.stringify(this.question));
      delete qus.answer;
      this.testPaper.push(qus);
      this.answer.push(this.question.answer);

      this.clearQuestion();
    },
    clearQuestion() {
      this.question.answer = "";
      this.question.content.value = "";
      this.question.content.A = "";
      this.question.content.B = "";
      this.question.content.C = "";
      this.question.content.D = "";
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
.button-test-paper {
  display: flex;
  justify-content: center;
}
.el-card {
  /deep/ .el-card__body {
    min-height: 600px;
    display: flex;
    justify-content: center;
  }
}
.answer {
  margin-top: 20px;
}
.radio-question {
  display: block;
}
.button-operate {
  float: right;
  margin-top: 5px;
}
.el-upload__tip {
  font-size: 14px;
}
</style>