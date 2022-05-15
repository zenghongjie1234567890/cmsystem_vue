<template>
  <div class="mail">
    <el-form  label-width="80px">
      <el-form-item label="名称:">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="开始时间:">
       <el-date-picker
            v-model="first_time"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            >
          </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间:">
         <el-date-picker
              v-model="last_time"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
          >
            </el-date-picker>
      </el-form-item>
    </el-form>
	<el-button type="primary" @click="search()" style="margin-left: 15px;">查询</el-button>
	<el-button type="success" @click="sendMail()" icon="el-icon-plus" style="position: relative;right: -150px;">
	  新建邮件
	</el-button>
	
      <el-table border :fit="true" 
        :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      >

        <el-table-column prop="server" sortable label="发送区服">
            <template slot-scope="{ row, $index }">
            <span v-if="!showEdit[$index]">{{ row.server }}</span>
            <el-input
              type="text" 
              v-model="row.server"
              v-else
              placeholder="请输入发送区服"
            ></el-input>
          </template>
</el-table-column>

<el-table-column prop="text" sortable label="文本">
    <template slot-scope="{ row, $index }">
            <span v-if="!showEdit[$index]">{{ row.text }}</span>
            <el-input
              type="text"
              v-model="row.text"
              v-else
              placeholder="请输入文本"
            ></el-input>
          </template>
</el-table-column>

<el-table-column prop="enclosure" sortable label="附件">
    <template slot-scope="{ row, $index }">
              <span v-if="!showEdit[$index]">{{ row.enclosure }}</span>
              <el-input
                type="text"
                v-model="row.enclosure"
                v-else
                placeholder="请输入附件"
              ></el-input>
          </template>
</el-table-column>

<el-table-column prop="versionum" sortable label="版本号">
    <template slot-scope="{ row, $index }">
              <span v-if="!showEdit[$index]">{{ row.versionum }}</span>
              <el-input
                type="text"
                v-model="row.versionum"
                v-else
                placeholder="请输入版本号"
              ></el-input>
           </template>
</el-table-column>

<el-table-column sortable label="发送时间">
    <template slot-scope="{ row, $index }">
            <span v-if="!showEdit[$index]">
              {{row.sendtime}}
            </span>
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="row.sendtime"
              v-else
              placeholder="请输入发送时间"
            >
            </el-date-picker>
          </template>
</el-table-column>

<el-table-column prop="state" sortable label="状态">
    <template slot-scope="{ row, $index }">
              <span v-if="!showEdit[$index]">{{ row.state }}</span>
              <el-input
                type="text"
                v-model="row.state"
                v-else
                placeholder="请输入状态"
              ></el-input>
           </template>
</el-table-column>

<el-table-column prop="sender" sortable label="发送人">
    <template slot-scope="{ row, $index }">
              <span v-if="!showEdit[$index]">{{ row.sender }}</span>
              <el-input
                type="text"
                v-model="row.sender"
                v-else
                placeholder="请输入发送人"
              ></el-input>
           </template>
</el-table-column>

<el-table-column label="操作" header-align="center" align="center" width="200">
    <template slot-scope="{ row, $index }">
            <el-button
              v-if="!showEdit[$index]"
              @click="showUpdate($index, row)"
              type="primary"
            >
              <i class="el-icon-edit"></i>修改
            </el-button>
            <el-button
              v-if="!showEdit[$index]"
              @click="del($index, row)"
              type="danger"
            >
              <i class="el-icon-delete"></i>删除
            </el-button>
            <el-button
              v-if="showEdit[$index]"
              @click="submit($index, row)"
              type="success"
              >确定</el-button
            >
            <el-button
              v-if="showEdit[$index]"
              @click="cancelUpdate($index)"
              type="warning"
              >取消</el-button
            >
          </template>
</el-table-column>
</el-table>
<pageNation :total="tableData.length" :page-size="pageSize" @pageChange="pageChange" :page_index="currentPage" />
<MailDialog :dialog="dialog" @update="getfileMsg($event)" />
</div>
</template>
<script>
    import MailDialog from "../../components/maildialog/MailDialog";
    import pageNation from "../../components/pagenation/pageNation";
    export default {
        name: "Mail",
        components: {
            MailDialog,
            pageNation
        },
        data() {
            return {
                showEdit: [],
                last_time: "",
                first_time: "",
                name: "",
                tableData: [{
                    server: "美国服1",
                    text: "这是一封邮件信息",
                    enclosure: "10014",
                    versionum: "v2.01.03",
                    sendtime: "2020-12-01 18:30:59",
                    state: "已发送",
                    sender: "Admin"
                }],
                currentPage: 1, //当前页数
                pageSize: 10, //每页的数据
                dialog: {
                    show: false, //是否显示弹出框
                    title: "", //弹出框的title
                },
            };
        },

        methods: {
            //分页
            pageChange(item) {
                this.currentPage = item.page_index;
                this.pageSize = item.page_limit;
            },
            sendMail() {
                this.dialog = {
                    show: true,
                    title: "发送邮件",
                };
            },
            //获取Dialog发送的信息
            getfileMsg(value) {
                console.log(value)
            },
            //编辑后点击确定按钮
            submit(index, row) {
                console.log(index, row);
                this.$set(this.showEdit, index, false);
            },
            //点击删除
            del(index, row) {
                console.log(index, row);
            },
            //点击修改
            showUpdate(index) {
                this.showEdit[index] = true;
                //点击修改后改变状态切换为确定按钮
                this.$set(this.showEdit, index, true); //这里要用$set方法，否则页面状态不更新
            },
            //取消修改
            cancelUpdate(index) {
                this.$confirm("取消修改？", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                    .then(() => {
                        this.$set(this.showEdit, index, false);
                    })
                    .catch(() => {});
            },
        },
    };
</script>
<style scoped>
    .mail .el-form {
        display: flex;
        float: left;
    }
</style>