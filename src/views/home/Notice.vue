<template>
<div class="notice">
    <el-form label-width="80px">
        <el-form-item label="竞赛ID附件:" label-width="100px">
            <el-input v-model="id"></el-input>
        </el-form-item>
    </el-form>
    <el-button type="primary" @click="search()" style="margin-left: 15px;" icon="el-icon-search">查询</el-button>
    <el-button type="warning" @click="reset" style="margin-left: 15px;margin-bottom: 20px;" icon="el-icon-circle-close">重置</el-button>
    <el-button type="success" @click="AddNotice()" icon="el-icon-plus" style="position: absolute;right: 15px;">新建竞赛获奖名单公告</el-button>
    <el-table border :fit="true" :data="tableData">
        <el-table-column prop="compid" sortable label="比赛编号">
        </el-table-column>
        <el-table-column prop="fileName" sortable label="附件名称">
        </el-table-column>
        <el-table-column sortable label="获奖名单下载">
            <template slot-scope="scope">
                <el-button type="primary" @click="downloadfile(scope.row.fileUrl)" style="background-color: rebeccapurple" size="mini" icon="el-icon-download">下载
                </el-button>
            </template>
        </el-table-column>
        <el-table-column prop="fileData" sortable label="发布时间">
        </el-table-column>
        <el-table-column header-align="center" align="center" width="200" label="操作">
            <template slot-scope="scope">
                <el-popconfirm title="是否确定删除该附件吗？" @confirm="del(scope.row.compid)">
                    <el-button type="danger" class="el-icon-delete" size="mini" slot="reference" style="margin-left: 1px;">删除</el-button>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <pageNation :total="total" :page-size="pageSize" @pageChange="pageChange" :page_index="currentPage" />
    <div class="updateAdd">
        <el-dialog title="发布竞赛获奖名单附件" :visible.sync="dialogVisible" width="50%">
            <el-form :model="priceFile" label-width="80px" size="mini">
                <el-form-item label="竞赛编号：" label-width="100px">
                    <el-input v-model="priceFile.compid" autocomplete="off" maxlength="5" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="名单上传：" label-width="100px">
                    <el-upload class="upload-demo" drag ref="upload" action="http://localhost:8055/price/upload" :before-upload="beforeAvatarUpload" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" multiple :limit="1">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">只能上传一个文件<em>点击上传</em></div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updatecancel">取 消</el-button>
                <el-button type="primary" @click="updatesure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</div>
</template>

<script>
import pageNation from '../../components/pagenation/pageNation01';
export default {
    name: "Notice",
    components: {
        pageNation
    },
    data() {
        return {
            id: "",
            tableData: [],
            currentPage: 1, //当前页数
            pageSize: 4, //每页的数据
            dialogVisible: false,
            priceFile: {},
            fileList: [],
            total: 0,
        };
    },
    created() {
        this.load()
    },
    methods: {
        search() {
            this.load()
        },
        reset() {
            this.id = ''
            this.load()
        },
        load() {
            this.$forceUpdate()
            this.axios.get(this.base_url + '/price/page', {
                params: {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                    id: this.id,
                }
            }).then((result) => {
                this.tableData = result.data.data.records
                this.total = result.data.data.total
                            this.$forceUpdate()
            }).catch((err) => {
                console.log(err);
            });

        },
        //分页
        pageChange(item) {
            this.currentPage = item.page_index;
            this.pageSize = item.page_limit;
            this.load()
        },
        AddNotice() {
            this.dialogVisible = true
        },
        updatesure() {
            if (this.priceFile.compid == null) {
                this.$message.error("请输入比赛编号和上传附件！！！")
            } else {
                this.axios.post(this.base_url + "/price/addPrice", this.priceFile).then(res => {
                    if (res.data.code) {
                        this.$message.success("发布成功！！！")
                        this.$refs.upload.submit();
                        this.priceFile.compid = ''
                        this.dialogVisible = false
                        this.load()
                    } else {
                        this.$message.error("获奖名单发布失败！！")
                    }
                })
            }
        },
        updatecancel() {
            this.dialogVisible = false
            this.priceFile.compid = ''
            this.fileList = []
            this.$message.warning("已经取消发布！！！")
        },
        //点击删除
        del(row) {
            this.axios.get(this.base_url + '/price/del', {
                params: {
                    compId: row
                }
            })
            this.$message.success("删除成功！！！")
            this.load()
        },
        downloadfile(url) {
            window.open(url)
            this.load()
        },
    },
}
</script>

<style scoped>
.notice .el-form {
    display: flex;
    float: left;
}

.updateAdd .el-form {
    all: initial;
}
</style>
