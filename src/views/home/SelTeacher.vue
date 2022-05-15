<template>
	<div class="playerinformation">
		<el-form label-width="150px">
		  <el-form-item label="老师所属学院:">
		    <el-input v-model="teacherCollege" placeholder="请输入学院" prefix-icon="el-icon-search"></el-input>
		  </el-form-item>
		  <el-form-item label="指导老师姓名:">
		    <el-input v-model="teacherName" placeholder="请输入姓名" prefix-icon="el-icon-search"></el-input>
		  </el-form-item>
		</el-form>
		<el-button type="primary" @click="search"  icon="el-icon-search">查询</el-button>
    <el-button type="warning" @click="reset" icon="el-icon-refresh">重置</el-button>
    <div style="padding-top: 30px;position: relative;bottom: 15px;">
    <el-button size="mini" type="primary" class="el-icon-circle-plus-outline" @click="dialogVisible01 = true">新增</el-button>
    <el-upload action="http://localhost:8055/teacher/upload" style="display: inline-block " :show-file-list="false" accept="xlsx"  :on-error="onerror" :on-success="onsuccess">
        <el-button size="mini" type="success" class="el-icon-caret-bottom" >导入</el-button>
    </el-upload>
    <el-button size="mini" type="warning" class="el-icon-caret-top" @click="exportExcel" >导出</el-button>
    </div>
		  <el-table :data="tableData" border fit style="width: 100%"  @selection-change="handleSelectionChange">
		    <el-table-column
		      fixed
		      prop="teacherId"
		      label="ID" width="80px"
		    >
		    </el-table-column>
            <el-table-column
            prop="teacherName"
            label="指导老师姓名" width="150px"
            > 
            </el-table-column>
		    <el-table-column
		      prop="teacherPicture"
              width="180px"
		      label="头像"
		    >
            <template slot-scope="scope">            
                <img :src="scope.row.teacherPicture"  min-width="102px" height="136px" />
             </template>
</el-table-column>
<el-table-column prop="teacherCollege" width="120px" label="隶属学院">
</el-table-column>
<el-table-column prop="teacherLevel" width="200px" label="学历等级">
</el-table-column>
<el-table-column prop="teacherDesc" width="350px" label="个人信息">
</el-table-column>
<el-table-column prop="operate" label="操作">
    <template slot-scope="scope">
              <el-button type="success" class="el-icon-edit" size="mini" @click="handleEdit(scope.row)" style="margin-left: 1px;">编辑</el-button>
              <el-popconfirm title="是否确定删除该指导老师吗？" @confirm="del(scope.row.teacherId)">
              <el-button type="danger" class="el-icon-delete" size="mini" slot="reference" style="margin-left: 1px;">删除</el-button>
              </el-popconfirm>
          </template>
</el-table-column>
</el-table-column>
</el-table>
<div class="updateAdd">
    <el-dialog title="指导老师添加" :visible.sync="dialogVisible01" width="30%">
        <el-form :model="form01" label-width="80px" size="mini">
            <el-form-item label="老师姓名">
                <el-input v-model="form01.teacherName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="头像照片">
                <el-upload class="avatar-uploader" action="http://localhost:8055/teacher/savePicture" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" style="border: 1px dashed #d9d9d9;"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="隶属学院">
                <el-input v-model="form01.teacherCollege" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="学历等级">
                <el-input v-model="form01.teacherLevel" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="个人信息">
                <el-input v-model="form01.teacherDesc" autocomplete="off" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                    <el-button @click="addcancel">取 消</el-button>
                    <el-button type="primary" @click="addsure">确 定</el-button>
                </span>
    </el-dialog>
    <el-dialog title="老师信息更新" :visible.sync="dialogVisible02" width="30%">
        <el-form :model="form02" label-width="80px" size="mini">
            <el-form-item label="老师姓名">
                <el-input v-model="form02.teacherName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="旧头像">
                <img :src="form02.teacherPicture" class="avatar" style="width: 100px;height: 150px;">
            </el-form-item>
            <el-form-item label="新头像">
                <el-upload class="avatar-uploader" action="http://localhost:8055/teacher/savePicture" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" style="border: 1px dashed #d9d9d9;"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="隶属学院">
                <el-input v-model="form02.teacherCollege" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="学历等级">
                <el-input v-model="form02.teacherLevel" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="个人信息">
                <el-input v-model="form02.teacherDesc" autocomplete="off" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                    <el-button @click="updatecancel">取 消</el-button>
                    <el-button type="primary" @click="updatesure">确 定</el-button>
                </span>
    </el-dialog>
</div>

<pageNation01 :total="total" :page-size="pageSize" @pageChange="pageChange" :page_index="currentPage" />

</div>
</template>

<script>
    import pageNation01 from '../../components/pagenation/pageNation01';
    export default {
        name: "PlayerINformation",
        components: {
            pageNation01
        },
        data() {
            return {
                tableData: [],
                currentPage: 1, //当前页数
                pageSize: 4, //每页的数据
                total: 0,
                multipleSelection: [],
                dialogVisible01: false,
                dialogVisible02: false,
                form01: {},
                form02: {},
                imageUrl: '',
                teacherName: '',
                teacherCollege: ''
            }
        },
        created() {
            this.load()
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = this.base_url + res
                console.log(this.imageUrl);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt5M = file.size / 1024 / 1024 < 5;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
                }
                if (!isLt5M) {
                    this.$message.error('上传头像图片大小不能超过 5MB!');
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            addcancel() {
                this.dialogVisible01 = false
                this.$message.warning("已取消添加！！")
                this.load()
            },
            updatecancel() {
                this.dialogVisible02 = false
                this.load()
                this.$message.warning("已取消修改！！")
            },
            exportExcel() {
                this.$confirm('是否要导出所有指定老师信息数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: 'Excel表格导出成功！！'
                    });
                    window.open(this.base_url + "/teacher/export")
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消导出操作'
                    });
                });
            },
            load() {
                this.axios.get(this.base_url + "/teacher/page", {
                    params: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                        teacherCollege: this.teacherCollege,
                        teacherName: this.teacherName
                    }
                }).then((result) => {
                    this.tableData = result.data.data.records
                    this.total = result.data.data.total
                }).catch((err) => {
                    console.log(err);
                });
            },
            //查看
            handleClick(row) {},
            search() {
                this.currentPage = 1, //当前页数
                    this.pageSize = 4, //每页的数据
                    this.load()
            },
            handleEdit(row) {
                this.form02 = row
                this.dialogVisible02 = true
            },
            addsure() {
                this.dialogVisible01 = false
                this.form01.teacherPicture = this.imageUrl
                this.axios.post(this.base_url + "/teacher/saveTeacher", this.form01).then(res => {
                    if (res.data.code) {
                        this.$message.success(res.data.msg)
                    } else {
                        this.$message.error(res.data.msg)
                    }
                    this.load()
                    this.form01 = {}
                    this.imageUrl = ''
                })
            },
            updatesure() {
                if (this.imageUrl != '') {
                    this.form02.teacherPicture = this.imageUrl
                }
                this.axios.post(this.base_url + "/teacher/updateTeacher", this.form02).then(res => {
                    console.log(res);
                    if (res.data.msg) {
                        this.$message.success("老师信息修改成功")
                    } else {
                        this.$message.error("老师信息修改失败！！")
                    }
                })
                this.dialogVisible02 = false
                this.imageUrl = ''
            },
            reset() {
                this.teacherCollege = ''
                this.teacherName = ''
                this.load()
            },
            //分页
            pageChange(item) {
                this.currentPage = item.page_index;
                this.pageSize = item.page_limit;
                this.load()
            },
            del(id) {
                this.axios.get(this.base_url + "/teacher/delTeacher/" + id).then(res => {
                    this.$message.success("工号为:" + id + "  的指定老师删除成功！")
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
    
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>