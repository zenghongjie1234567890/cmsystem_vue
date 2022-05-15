<template>
	<div class="playerinformation">
		<el-form label-width="50px">
		  <el-form-item label="学号:">
		    <el-input v-model="stuId" placeholder="请输入学号" prefix-icon="el-icon-search"></el-input>
		  </el-form-item>
		  <el-form-item label="学院:">
            <el-select v-model="stuCollege" placeholder="请选择学院">
                <el-option label="大数据学院" value="大数据学院"></el-option>
                <el-option label="经济管理学院" value="经济管理学院"></el-option>
                <el-option label="电气与信息工程学院" value="电气与信息工程学院"></el-option>
                <el-option label="机械工程学院" value="机械工程学院"></el-option>
                <el-option label="土木工程学院" value="土木工程学院"></el-option>
                <el-option label="矿业工程学院" value="矿业工程学院"></el-option>
                <el-option label="资源与环境工程学院" value="资源与环境工程学院"></el-option>
                <el-option label="建筑与城市规划学院" value="建筑与城市规划学院"></el-option>
                <el-option label="材料与能源工程学院" value="材料与能源工程学院"></el-option>
                <el-option label="交通工程学院" value="交通工程学院"></el-option>
                <el-option label="材料与冶金工程学院" value="材料与冶金工程学院"></el-option>
                <el-option label="化学工程学院" value="化学工程学院"></el-option>
                <el-option label="食品药品制造工程学院" value="食品药品制造工程学院"></el-option>
                <el-option label="理学院" value="理学院"></el-option>
                <el-option label="外国语学院" value="外国语学院"></el-option>
                <el-option label="航空航天工程学院" value="航空航天工程学院"></el-option>
                <el-option label="人工智能与电气工程学院" value="人工智能与电气工程学院"></el-option>
                <el-option label="国际教育学院" value="国际教育学院"></el-option>
              </el-select>
		  </el-form-item>
		  <el-form-item label="姓名:">
		    <el-input v-model="stuName" placeholder="请输入姓名" prefix-icon="el-icon-search"></el-input>
		  </el-form-item>
      <el-form-item label="班级:">
		    <el-input v-model="stuClass" placeholder="请输入班级" prefix-icon="el-icon-search"></el-input>
		  </el-form-item>
		</el-form>
		<el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
    <el-button type="warning" @click="reset">重置</el-button>
    <div style="padding-top: 30px;position: relative;bottom: 15px;">
    <el-button size="mini" type="primary" class="el-icon-circle-plus-outline" @click="dialogVisible01 = true">新增</el-button>
    <el-popconfirm title="是否确定批量删除数据吗？" @confirm="delmore" style="margin: 5px;">
        <el-button size="mini" type="danger" class="el-icon-remove-outline" slot="reference">批量删除</el-button>
    </el-popconfirm>
    <el-upload action="http://localhost:8055/stu/import" style="display: inline-block " :show-file-list="false" accept="xlsx"  :on-error="onerror" :on-success="onsuccess">
        <el-button size="mini" type="success" class="el-icon-caret-bottom" >导入</el-button>
    </el-upload>
    <el-button size="mini" type="warning" class="el-icon-caret-top" @click="exportExcel" >导出</el-button>
    </div>
		  <el-table :data="tableData" border fit style="width: 100%"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
		    <el-table-column
		      fixed
		      prop="stuId"
		      label="学号"
		    >
		    </el-table-column>
		    <el-table-column
		      prop="stuCollege"
		      label="学院"
		    >
		    </el-table-column>
		    <el-table-column
		      prop="stuName"
		      label="姓名"
		    >
		    </el-table-column>
		    <el-table-column
		      prop="stuClass"
		      label="班级"
			>
		    </el-table-column>
		    <el-table-column
		      prop="stuPwd"
		      label="密码"
		    >
		    </el-table-column>
		    <el-table-column
		      prop="stuQq"
		      label="QQ号"
		    >
		    </el-table-column>
                        <el-table-column prop="stuPicture" label="头像地址">
                        </el-table-column>
        <el-table-column prop="operate" label="操作" width="200px">
          <template slot-scope="scope">
              <el-button type="success" class="el-icon-edit" size="mini" @click="handleEdit(scope.row)" style="margin-left: 1px;">编辑</el-button>
              <el-popconfirm title="是否确定删除该用户吗？" @confirm="del(scope.row.stuId)">
              <el-button type="danger" class="el-icon-delete" size="mini" slot="reference" style="margin-left: 1px;">删除</el-button>
              </el-popconfirm>
          </template>
</el-table-column>
</el-table-column>
</el-table>
<div class="updateAdd">
    <el-dialog title="学生添加" :visible.sync="dialogVisible01" width="30%">
        <el-form :model="form01" label-width="80px" size="mini">
            <el-form-item label="学号">
                <el-input v-model="form01.stuId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="学院">
                <el-input v-model="form01.stuCollege" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form01.stuName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="班级">
                <el-input v-model="form01.stuClass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form01.stuPwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="QQ号">
                <el-input v-model="form01.stuQq" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                    <el-button @click="addcancel">取 消</el-button>
                    <el-button type="primary" @click="addsure">确 定</el-button>
                </span>
    </el-dialog>
    <el-dialog title="学生信息更新" :visible.sync="dialogVisible02" width="30%">
        <el-form :model="form02" label-width="80px" size="mini">
            <el-form-item label="学号">
                <el-input v-model="form02.stuId" autocomplete="off" disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="学院">
                <el-input v-model="form02.stuCollege" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form02.stuName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="班级">
                <el-input v-model="form02.stuClass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form02.stuPwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="QQ号">
                <el-input v-model="form02.stuQq" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片地址">
                <el-input v-model="form02.stuPicture" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                    <el-button @click="updatecancel">取 消</el-button>
                    <el-button type="primary" @click="updatesure">确 定</el-button>
                </span>
    </el-dialog>
</div>

<pageNation :total="total" :page-size="pageSize" @pageChange="pageChange" :page_index="currentPage" />

</div>
</template>

<script>
    import pageNation from '../../components/pagenation/pageNation';
    export default {
        name: "PlayerINformation",
        components: {
            pageNation
        },

        data() {
            return {
                name: "",
                nickname: "",
                uid: "",
                tableData: [],
                currentPage: 1, //当前页数
                pageSize: 18, //每页的数据
                stuId: '',
                stuCollege: '',
                stuName: '',
                stuClass: '',
                total: 0,
                dialogVisible01: false,
                dialogVisible02: false,
                form01: {},
                form02: {},
                form03: {},
                multipleSelection: [],
            }
        },
        created() {
            this.load()
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            updatecancel() {
                this.dialogVisible02 = false;
                this.load()
                this.$message.warning("已取消修改！！")
            },
            addcancel() {
                this.dialogVisible01 = false;
                this.form01 = {}
                this.$message.warning("已取消添加！！")
            },
            exportExcel() {
                this.$confirm('是否要导出所有学生数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: 'Excel表格导出成功！！'
                    });
                    window.open(this.base_url + "/stu/export")
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消导出操作'
                    });
                });
            },
            delmore() {
                let ids = this.multipleSelection.map(v => v.stuId)
                console.log(ids);
                if (ids.length == 0) {
                    this.$message.warning("尚未选择删除数据！")
                } else {
                    this.axios.post(this.base_url + "/stu/delmore", ids).then(res => {
                        this.$message.success("批量删除 " + ids.length + " 条数据成功！！")
                        this.load()
                    })
                }
            },
            load() {
                this.axios.get(this.base_url + '/stu/page', {
                    params: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                        stuId: this.stuId,
                        stuCollege: this.stuCollege,
                        stuName: this.stuName,
                        stuClass: this.stuClass,
                    }
                }).then((result) => {
                    this.tableData = result.data.data.records
                    this.total = result.data.data.total
                }).catch((err) => {
                    console.log(err);
                });
            },
            //查看
            handleClick(row) {
                console.log(row);
            },
            search() {
                this.currentPage = 1, //当前页数
                    this.pageSize = 18, //每页的数据
                    this.load()
            },
            handleEdit(row) {
                this.form02 = row
                this.form03 = row
                this.dialogVisible02 = true
            },
            addsure() {
                this.dialogVisible01 = false
                this.axios.post(this.base_url + "/stu/addstu", this.form01).then(res => {
                    if (res.data.msg) {
                        this.$message.success("学号为:" + this.form01.stuId + "的用户添加成功")
                        this.load()
                        this.form01 = {}
                    } else {
                        this.$message.warning("学号为:" + this.form01.stuId + "的用户添加成失败！！")
                        this.load()
                        this.form01 = {}

                    }
                })
            },
            updatesure() {
                this.axios.post(this.base_url + "/stu/updatestu", this.form02).then(res => {
                    console.log(res);
                    if (res.data.msg) {
                        this.$message.success("用户修改成功")
                    }
                })
                this.dialogVisible02 = false
            },
            reset() {
                this.stuId = ''
                this.stuCollege = ''
                this.stuClass = ''
                this.stuName = ''
                this.load()
            },
            //分页
            pageChange(item) {
                this.currentPage = item.page_index;
                this.pageSize = item.page_limit;
                this.load()
            },
            del(id) {
                this.axios.get(this.base_url + "/stu/delstu/" + id).then(res => {
                    this.$message.success("学号为:" + id + "  的学生删除成功！")
                    this.load()
                })
            },
            onerror(a, b) {
                this.$message.error("文件" + b.name + "上传失败，文件格式只支持xlsx！！！")
            },
            onsuccess(a, b) {
                this.$message.success("文件" + b.name + "上传成功，数据成功导入！！！")
                this.load()
            }
        }
    }
</script>

<style scoped="scoped">
    .playerinformation .el-form {
        display: flex;
        float: left;
    }
    
    .playerinformation .el-button {
        margin-left: 20px;
    }
    
    .updateAdd .el-form {
        all: initial;
    }
</style>