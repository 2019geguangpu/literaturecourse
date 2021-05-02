<template>
  <div>
    <div class="content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>资料上传</span>
        </div>

        <div>
          <input
            type="file"
            id="files"
            style="display: none"
            @change="fileImport"
          /><label style="cursor: pointer; color: #409eff" for="files"
            >点击上传</label
          >
        </div>
      </el-card>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="createTime" label="上传日期" align="center">
      </el-table-column>
      <el-table-column prop="fileName" label="资料名" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small"
            >下载</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import { postHomeworkUrl, getHomeworkUrl, downloadHomeworkUrl } from "../../util/api.js";
export default {
  mounted() {
    this.getFileList();
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    fileImport(e) {
      var selectedFile = document.getElementById("files").files[0];

      if (!selectedFile) return;

      let loading = Loading.service({
        target: ".el-card",
      });

      let data = new FormData();
      data.set("file", selectedFile);

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
        postHomeworkUrl,
        data,
        {},
        callback,
        error,
        exception,
        "multipart/form-data"
      );
    },
    handleClick(file) {
      let loading = Loading.service({
        target: ".el-table",
      });

      let data = new URLSearchParams();
      data.set("id", file.Id);

      let callback = (res) => {
        loading.close();
        let blob = new Blob([res], { type: res.type });
        let downloadElement = document.createElement("a");
        let href = window.URL.createObjectURL(blob); //创建下载的链接
        let fileName = file.fileName;
        downloadElement.href = href;
        downloadElement.download = fileName; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放blob对象
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
        downloadHomeworkUrl,
        data,
        {},
        callback,
        error,
        exception,
        "application/x-www-form-urlencoded",
        'blob'
      );
    },
    getFileList() {
      let loading = Loading.service({
        target: ".el-table",
      });

      let callback = (res) => {
        loading.close();
        this.$message({
          message: res.message,
          type: "success",
        });
        const { data = [] } = res;

        this.tableData = data;
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

      this._ajax("get", getHomeworkUrl, {}, {}, callback, error, exception);
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