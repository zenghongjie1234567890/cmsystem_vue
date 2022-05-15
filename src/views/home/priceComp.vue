<template>
<div class="playerinformation">
    <el-form label-width="50px">
        <el-form-item label="竞赛ID:" label-width="100px">
            <el-input v-model="compId" placeholder="请输入竞赛ID" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
    </el-form>
    <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
    <el-button type="warning" @click="reset">重置</el-button>
    <div style="padding-top: 30px;position: relative;bottom: 15px;">
    </div>
    <el-tag type="success" style="font-size: 20px;">设置奖项信息:</el-tag>
    <br>
    <br>
    一等奖:
    <el-input-number v-model="num1" @change="handleChange" :min="0" :max="10" class="dudu"></el-input-number>
    二等奖:
    <el-input-number v-model="num2" @change="handleChange" :min="0" :max="10" class="dudu"></el-input-number>
    三等奖:
    <el-input-number v-model="num3" @change="handleChange" :min="0" :max="10" class="dudu"></el-input-number>
    优秀奖:
    <el-input-number v-model="num4" @change="handleChange" :min="0" :max="10" class="dudu"></el-input-number>
    <div style="padding-top: 30px;position: relative;bottom: 15px;">
        <el-button size="mini" type="success" class="el-icon-caret-top" @click="setprice">一键评奖</el-button>
        <el-button size="mini" type="warning" class="el-icon-caret-top" @click="exportExcel">导出获奖队伍信息</el-button>
    </div>
    <el-table :data="tableData" border fit style="width: 100%">
        <el-table-column fixed prop="teamId" label="队伍ID">
        </el-table-column>
        <el-table-column prop="teamName" label="队伍名称">
        </el-table-column>
        <el-table-column label="作品名字" prop="teamWorks" style="margin: auto;">
        </el-table-column>
        <el-table-column label="参加比赛ID" prop="teamCompid" style="margin: auto;">
        </el-table-column>
        <el-table-column label="指导老师" prop="teamTeaid" style="margin: auto;">
        </el-table-column>
        <el-table-column label="提交作品预览">
            <template slot-scope="scope">
                <el-button type="primary" @click="downloadfile(scope.row.teamFile)" size="mini" icon="el-icon-download">下载
                </el-button>
            </template>
        </el-table-column>
        <el-table-column label="评分" prop="teamGrade" style="margin: auto;" width="200px">
            <template slot-scope="scope">
                <el-input-number v-model="scope.row.teamGrade" :min="1" :max="100" @change="grade(scope.row)"></el-input-number>
            </template>
        </el-table-column>
        <el-table-column label="获得奖项" prop="teamPrice" style="margin: auto;">
        </el-table-column>
    </el-table>
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
            compId: '',
            total: 0,
            num1: 1,
            num2: 1,
            num3: 1,
            num4: 1
        }
    },
    created() {
        this.load()
    },
    methods: {
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
                window.open(this.base_url + "/price/export")
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消导出操作'
                });
            });
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
        search() {
            this.load()
        },
        reset() {
            this.compId = ''
            this.num1 = 1
            this.num2 = 1
            this.num3 = 1
            this.num4 = 1
            this.load()
        },
        //分页
        pageChange(item) {
            this.currentPage = item.page_index;
            this.pageSize = item.page_limit;
            this.load()
        },
        downloadfile(url) {
            window.open(url)
            this.load()
        },
        grade(ele) {
            this.axios.post(this.base_url + "/team/setGrade", ele)
        },
        setprice() {
            if (this.compId == '') {
                this.$message.warning("请先选择比赛ID！！！")
            } else {
                this.axios.get(this.base_url + "/team/setPrice", {
                    params: {
                        compid: this.compId,
                        firstPrice: this.num1,
                        secondPrice: this.num2,
                        thirdPrice: this.num3,
                        excellentPrice: this.num4
                    }
                }).then((result) => {
                    this.$message.success("自动评奖成功！！")
                    this.load()
                }).catch((err) => {
                    this.$message, error("自动评奖失败！！！")
                    this.load()
                })
            }
        }
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

.dudu {
    margin-right: 20px;
}
</style>
