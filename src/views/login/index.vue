<template>
  <div id="login">
    <div id="content">
      <h1>中国文学著作课程在线网站</h1>
      <div id="form">
        <el-form
          :model="user"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input
              type="text"
              v-model="user.userName"
              autocomplete="on"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              :type="pwdType"
              v-model="user.password"
              autocomplete="off"
            >
              <span ref="iconView" slot="suffix">
                <i
                  class="el-icon-view"
                  :style="iconStyle"
                  @click="watchPwd()"
                ></i>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button @click="resetForm()">重置</el-button>
            <el-button @click="register()" type="danger">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog
      title="用户注册"
      :visible.sync="registerDialog"
      :modal-append-to-body="isAppendToBody"
    >
      <el-form :model="userRegister">
        <el-form-item label="用户名" label-width="100px">
          <el-input
            v-model="userRegister.userName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实名称" label-width="100px" style="color: black">
          <el-input
            v-model="userRegister.realName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input
            :type="pwdType"
            v-model="userRegister.password"
            autocomplete="off"
          >
            <span ref="iconView" slot="suffix">
              <i
                class="el-icon-view"
                :style="iconStyle"
                @click="watchPwd()"
              ></i>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="100px">
          <el-input
            :type="pwdType"
            v-model="userRegister.confirmPassword"
            autocomplete="off"
          >
            <span ref="iconView" slot="suffix">
              <i
                class="el-icon-view"
                :style="iconStyle"
                @click="watchPwd()"
              ></i>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="100px">
          <el-input
            v-model="userRegister.phoneNumber"
            autocomplete="off"
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item label="入学年份" label-width="100px">
          <el-input
            v-model="userRegister.attendanceYear"
            autocomplete="off"
            maxlength="4"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="registerDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitRegister()">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { loginUrl, registerUrl } from "../../util/api";
import { Loading } from "element-ui";
import md5 from "js-md5";
import userDB from "../../util/userDB.js";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      registerDialog: false,
      isAppendToBody: true,
      user: {
        userName: "",
        password: "",
      },
      userRegister: {
        userName: "",
        password: "",
        confirmPassword: "",
        realName: "",
        phoneNumber: "",
        attendanceYear: "",
      },
      registerLoading: false,
      iconStyle: "color: #4ef4fd;line-height: 50px",
      pwdType: "password",
      rules: {
        userName: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
    };
  },
  methods: {
    submitRegister() {
      let loading = Loading.service({
        target: ".el-dialog",
      });
      const userName = this.userRegister.userName.trim();
      const password = this.userRegister.password.trim();
      const confirmPassword = this.userRegister.confirmPassword.trim();
      const realName = this.userRegister.realName.trim();
      const phoneNumber = this.userRegister.phoneNumber.trim();
      const attendanceYear = this.userRegister.attendanceYear.trim();

      if (userName === "") return;
      if (password === "") return;
      if (confirmPassword !== password) {
        this.$message({
          content: "两次密码不一致",
          type: "warning",
        });
        return;
      }

      if (realName === "") return;
      if (phoneNumber === "") return;
      if (attendanceYear === "") return;

      let callback = (res) => {
        loading.close();
        this.registerDialog = false;

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

      const data = {
        userName,
        password: md5(password),
        realName,
        phoneNumber,
        attendanceYear,
      };

      this._ajax("post", registerUrl, data, {}, callback, error, exception);
    },
    register() {
      this.registerDialog = true;
    },
    submitForm() {
      this.user.userName = this.user.userName.trim();
      this.user.password = this.user.password.trim();

      if (this.user.userName == "" || this.user.password == "") return;

      this.user.password = md5(this.user.password);
      // this.user.password = md5("123456");
      // this.user.userName = "2018_qinmingyuan";

      let callback = (res) => {
        this.$message({
          message: res.message,
          type: "success",
        });

        this.getCookie();

        if (res.data == 1) {
          sessionStorage.setItem("isAdmin", true);
          this.$router.push({
            path: "/admin",
          });
        } else {
          sessionStorage.setItem("isAdmin", false);
          this.$router.push({
            path: "/",
          });
        }
      };

      let error = (res) => {
        this.resetForm();
        this.$message({
          message: res.message,
          type: "warning",
        });
      };

      let exception = (res) => {
        this.$message({
          message: res.message,
          type: "error",
        });
      };

      this._ajax("get", loginUrl, {}, this.user, callback, error, exception);
    },
    getCookie() {
      let cookieArray = Object.keys(Cookie.get());

      localStorage.setItem("sessionName", cookieArray[0]);
    },
    resetForm() {
      this.user.userName = "";
      this.user.password = "";
    },
    watchPwd() {
      this.pwdType = this.pwdType == "password" ? "text" : "password";
      this.iconStyle =
        this.iconStyle == "color: #4ef4fd;line-height: 50px"
          ? "color: darksalmon;line-height: 50px"
          : "color: #4ef4fd;line-height: 50px";
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  display: flex;
  background: url("../../assets/background.jpg") no-repeat;
  background-size: 100% 100%;
  height: 100%;
  width: 100%;

  justify-content: center;
  align-items: center;
}
h1 {
  font: 50px bold;
  color: aliceblue;
  letter-spacing: 2rem;
}

#content {
  display: block;
}

#form {
  max-width: 400px;
  margin: auto;
}

.el-form-item {
  /deep/ .el-form-item__label {
    color: aliceblue;
    font-size: 20px;
    line-height: 50px;
  }
  /deep/ .el-form-item__content {
    /deep/ .el-form-item__error {
      font-size: 14px;
    }
  }
}
.el-dialog__wrapper {
  /deep/ .el-dialog {
    /deep/.el-dialog__header,
    .el-dialog__body, .el-dialog__footer {
      background: #66C9FF;
    }
  }
}

.el-input {
  font-size: 18px;
  font-size: 20px;
  min-height: 60px;
  /deep/ .el-input__inner {
    min-height: 50px;
  }
}
</style>