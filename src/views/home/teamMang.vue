<template>
<div class="playerinformation">
    <el-form label-width="50px">
        <el-form-item label="竞赛ID:" label-width="100px">
            <el-input v-model="compId" placeholder="请输入竞赛ID" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item label="参赛队伍ID:" label-width="130px">
            <el-input v-model="teamId" placeholder="请输入队伍ID" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
    </el-form>
    <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
    <el-button type="warning" @click="reset">重置</el-button>
    <div style="padding-top: 30px;position: relative;bottom: 15px;">
        <el-popconfirm title="是否确定批量删除数据吗？" @confirm="delmore" style="margin: 5px;">
            <el-button size="mini" type="danger" class="el-icon-remove-outline" slot="reference">批量删除</el-button>
        </el-popconfirm>
        <el-button size="mini" type="warning" class="el-icon-caret-top" @click="exportExcel">导出队伍信息</el-button>
    </div>
    <el-table :data="tableData" border fit style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column fixed prop="teamId" label="队伍ID">
        </el-table-column>
        <el-table-column prop="teamName" label="队伍名称">
        </el-table-column>
        <el-table-column prop="teamCompid" label="参加比赛">
        </el-table-column>
        <el-table-column label="作品名字" prop="teamWorks" style="margin: auto;">
        </el-table-column>
        <el-table-column label="队伍人数" prop="teamNums" style="margin: auto;">
        </el-table-column>
        <el-table-column label="指导老师" prop="teamTeaid" style="margin: auto;">
        </el-table-column>
        <el-table-column label="获得分数" prop="teamGrade" style="margin: auto;">
        </el-table-column>
        <el-table-column label="获得奖项" prop="teamPrice" style="margin: auto;">
        </el-table-column>
        <el-table-column label="提交作品预览">
            <template slot-scope="scope">
                <el-button type="primary" @click="downloadfile(scope.row.teamFile)" size="mini" icon="el-icon-download">下载
                </el-button>
            </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="200px">
            <template slot-scope="scope">
                <el-button type="success" class="el-icon-reading" size="mini" @click="handleEdit(scope.row)" style="margin-left: 1px;">
                </el-button>
                <el-popconfirm title="是否确定删除该竞赛队伍吗？" @confirm="del(scope.row.teamId)">
                    <el-button type="danger" class="el-icon-delete" size="mini" slot="reference" style="margin-left: 1px;"></el-button>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog title="队伍成员" :visible.sync="dialogVisible">
        <el-tag type="success" style="font-size: 20px">队长: </el-tag>
        <el-table :data="captainName" border style="width: 100%">
            <el-table-column prop="stuPicture" label="头像">
                <template slot-scope="scope">
                    <el-avatar :size="40" :src="scope.row.stuPicture"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column prop="stuCollege" label="学院">
            </el-table-column>
            <el-table-column prop="stuClass" label="班级">
            </el-table-column>
            <el-table-column prop="stuName" label="名字">
            </el-table-column>
            <el-table-column prop="stuQq" label="联系QQ">
            </el-table-column>
        </el-table>
        <el-tag type="success" style="font-size: 20px;float: left;">队员: </el-tag>
        <el-table :data="partner" border style="width: 100%">
            <el-table-column prop="stuPicture" label="头像">
                <template slot-scope="scope">
                    <el-avatar :size="40" :src="scope.row.stuPicture"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column prop="stuCollege" label="学院">
            </el-table-column>
            <el-table-column prop="stuClass" label="班级">
            </el-table-column>
            <el-table-column prop="stuName" label="名字">
            </el-table-column>
            <el-table-column prop="stuQq" label="联系QQ">
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
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
            tableData: [],
            currentPage: 1, //当前页数
            pageSize: 18, //每页的数据
            teamId: '',
            compId: '',
            total: 0,
            multipleSelection: [],
            dialogVisible: false,
            captainName: [],
            partner: [],
        }
    },
    created() {
        this.load()
    },
    methods: {
        handleEdit(comp) {
            this.dialogVisible = true
            this.axios.get(this.base_url + '/members/getName', {
                params: {
                    id: comp.teamId
                }
            }).then((result) => {
                this.captainName = result.data
            })
            this.axios.get(this.base_url + '/members/getsonname', {
                params: {
                    id: comp.teamId
                }
            }).then((result) => {
                this.partner = result.data
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        exportExcel() {
            this.$confirm('是否要导出所有参赛队伍数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: 'Excel表格导出成功！！'
                });
                window.open(this.base_url + "/team/export")
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消导出操作'
                });
            });
        },
        delmore() {
            let ids = this.multipleSelection.map(v => v.teamId)
            if (ids.length == 0) {
                this.$message.warning("尚未选择删除数据！")
            } else {
                this.axios.post(this.base_url + "/team/delmore", ids).then(res => {
                    this.$message.success("批量删除 " + ids.length + " 条数据成功！！")
                    this.load()
                })
            }
        },
        load() {
            this.axios.get(this.base_url + "/team/page", {
                params: {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                    id: this.compId,
                    teamId: this.teamId
                }
            }).then((result) => {
                this.tableData = result.data.data.records
                this.total = result.data.data.total
            })
        },
        //查看
        handleClick(row) {
            console.log(row);
        },
        search() {
            this.load()
        },
        reset() {
            this.teamId = null
            this.compId = null
            this.load()
        },
        //分页
        pageChange(item) {
            this.currentPage = item.page_index;
            this.pageSize = item.page_limit;
            this.load()
        },
        del(id) {
            this.axios.get(this.base_url + "/team/delstu/" + id).then(res => {
                this.$message.success("竞赛ID为:" + id + "  的队伍删除成功！")
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
