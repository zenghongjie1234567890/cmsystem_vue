<template>
<div class="activationcode">
    <el-form label-width="80px">
        <el-form-item label="竞赛编号:">
            <el-input v-model="compId" placeholder="请输入编号" style="width: 400px;"></el-input>
        </el-form-item>

        <el-form-item label="竞赛上传附件名称:" label-width="140px">
            <el-input v-model="compName" placeholder="请输入附件名称" style="width: 600px;"></el-input>
        </el-form-item>

    </el-form>
    <el-button type="primary" @click="search" style="margin-left: 15px;" icon="el-icon-search">查询</el-button>
    <el-button type="warning" @click="reset" style="margin-left: 15px;margin-bottom: 20px;" icon="el-icon-circle-close">重置</el-button>

    <el-button type="warning" @click="add" style="margin-left: 15px;background-color:rgb(65, 89, 165);" icon="el-icon-circle-plus-outline">新增竞赛附件</el-button>
    <el-table :data="tableData" border fit style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column fixed prop="compId" label="竞赛编号">
        </el-table-column>
        <el-table-column prop="fileName" label="竞赛上传附件名称">
        </el-table-column>
        <el-table-column label="下载">
            <template slot-scope="scope">
                <el-button type="primary" @click="downloadfile(scope.row.fileUrl)" size="mini" icon="el-icon-download">下载</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作">
            <template slot-scope="scope">
                <el-button type="success" class="el-icon-edit" size="mini" @click="handleEdit(scope.row)" style="margin-left: 1px;">编辑</el-button>
                <el-popconfirm title="是否确定删除该用户吗？" @confirm="del(scope.row)">
                    <el-button type="danger" class="el-icon-delete" size="mini" slot="reference" style="margin-left: 1px;">删除</el-button>
                </el-popconfirm>
            </template>
        </el-table-column>
        </el-table-column>
    </el-table>
    <pageNation01 :total="total" :page-size="pageSize" @pageChange="pageChange" :page_index="currentPage" />
    <div class="zhj">
        <el-dialog title="附件信息更新" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="80px" size="mini">
                <el-form-item label="竞赛编号:">
                    <el-input v-model="form.compId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="竞赛上传附件名称:" label-width="130px">
                    <el-input v-model="form.fileName" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updatecancel">取 消</el-button>
                <el-button type="primary" @click="updatesure">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="比赛附件添加" :visible.sync="dialogVisible01" width="40%">
            <el-form :model="fileform" label-width="80px" size="mini">
                <el-form-item label="竞赛编号:">
                    <el-input v-model="fileform.compId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="竞赛上传附件名称:">
                    <el-upload class="upload-demo" drag ref="upload" action="http://localhost:8055/file/upload" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addcancel">取 消</el-button>
                <el-button type="primary" @click="addsure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</div>
</template>

<script>
import pageNation01 from '../../components/pagenation/pageNation01';
export default {
    name: "FeeRolePh",
    components: {
        pageNation01
    },
    data() {
        return {
            tableData: [],
            currentPage: 1, //当前页数
            pageSize: 10, //每页的数据
            total: 0,
            multipleSelection: [],
            compId: '',
            compName: '',
            dialogVisible: false,
            dialogVisible01: false,
            form: {},
            fileform: {},
            fileList: []
        };
    },
    created() {
        this.load()
    },
    methods: {
        handleRemove(file, fileList) {},
        handlePreview(file) {},
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        handleEdit(row) {
            this.dialogVisible = true
            this.form = row
        },
        add() {
            this.dialogVisible01 = true
        },
        addcancel() {
            this.dialogVisible01 = false
            this.load()
            this.$message.warning("已取消添加！！")
        },
        addsure() {
            console.log(this.fileform.compId);
            this.axios.post(this.base_url + "/file/addFile", this.fileform).then(res => {
                if (res.data.msg) {
                    this.$message.success("竞赛附件添加成功！！")
                    this.$refs.upload.submit();
                    this.load()
                } else {
                    this.$message.error("竞赛附件添加失败，请重新尝试！！")
                    this.load()
                }
            })
            this.dialogVisible01 = false
        },
        updatecancel() {
            this.dialogVisible = false
            this.load()
            this.$message.warning("已取消修改！！")
        },
        updatesure() {
            this.axios.post(this.base_url + "/file/updateFile", this.form).then(res => {
                if (res.data.msg) {
                    this.$message.success("信息修改成功")
                } else {
                    this.$message.error("信息修改失败！！")
                }
            })
            this.dialogVisible = false
        },
        load() {
            this.axios.get(this.base_url + "/file/page", {
                params: {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                    compId: this.compId,
                    compName: this.compName
                }
            }).then((result) => {
                this.tableData = result.data.data.records
                this.total = result.data.data.total
            }).catch((err) => {
                console.log(err);
            });
        },
        search() {
            this.load()
        },
        reset() {
            this.compId = ''
            this.compName = ''
            this.load()
        },
        //分页
        pageChange(item) {
            this.currentPage = item.page_index;
            this.pageSize = item.page_limit;
            this.load()
        },
        del(id) {
            this.axios.post(this.base_url + "/file/del/", id).then(res => {
                this.$message.success("工号为:" + id + "  的指定老师删除成功！")
                this.load()
            })
        },
        downloadfile(url) {
            window.open(url)
            this.load()
        },
    }
}
</script>

<style scoped>
.zhj .el-form {
    all: initial;
}
</style>
