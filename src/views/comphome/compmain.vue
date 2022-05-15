<template>
    <div class="activationcode">
        <div style="width: 100%; height: 50px;background-color: #07419e;">
            <div style="width: 83%; height: 50px;background-color: #07419e;;margin: auto;">
                <div style="height: 50px;float: left;"><b style="color: #fff;font-size: 23px;line-height: 50px;">竞赛信息大厅</b></div>
                <div style="height: 50px;float: right;"><b style="color: #fff;font-size: 23px;line-height: 50px;cursor:pointer;" @click="jjj">返回</b></div>
            </div>
              <el-row type="flex" class="row-bg" justify="center" style="height: 100px;">
                <el-col :span="19">
                    <div class="grid-content bg-purple-light" style="margin-top: 30px;height: 10px;">
                        <el-form  label-width="80px" style="margin-left: 8%;">
                            <el-form-item label="竞赛名称:">
                              <el-input v-model="name"></el-input>
                            </el-form-item>
                            <el-form-item label="比赛状态:">
                              <el-select v-model="status" placeholder="请选择比赛状态">
                                  <el-option label="未开始" value="未开始"></el-option>
                                  <el-option label="进行中" value="进行中"></el-option>
                                  <el-option label="已结束" value="已结束"></el-option>
                                </el-select>
                            </el-form-item>
                          </el-form>
                          <el-button type="primary" @click="search" style="margin-left: 15px;"  icon="el-icon-search">查询</el-button>
                          <el-button type="warning" @click="reset" style="margin-left: 15px;">重置</el-button>
                    </div>
                </el-col>
                </el-row>
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="19">
                    <div class="grid-content bg-purple-light">
                                <el-table
                                    :data="tableData"
                                    cell-style="cursor: pointer"
                                    @row-click="editCurrentApplicationApproval"
                                    style="width: 100%;font-size: 16px;height: 500px;">
                                    <el-table-column
                                    label="竞赛名称"
                                    prop="compName" width="600px">
                                    <template slot-scope="scope">
                                        <div>{{scope.row.compName}}</div>
                                      </template>
</el-table-column>
<el-table-column label="比赛状态" prop="compStatus">
    <el-tag :type="type01">{{status}}</el-tag>
</el-table-column>
<el-table-column label="报名开始时间" prop="compStarttime" style="margin: auto;">
</el-table-column>
<el-table-column label="报名截止时间" prop="compEndtime" style="margin: auto;">
</el-table-column>
<el-table-column label="比赛发布时间" prop="compCreatetime" style="margin: auto;">
</el-table-column>
</el-table>

</div>
</el-col>
</el-row>
<el-row>
    <div class="block" style="margin: auto;">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :total="50" style="text-align: center;">
        </el-pagination>
    </div>
    <el-col :span="24">
        <div class="grid-content bg-purple-dark" style="min-height: 35px;margin-top: 30px;background-color: #07419e;"></div>
    </el-col>
</el-row>
</div>
</div>
</template>
<script>
    import pageNation01 from '../../components/pagenation/pageNation01';
    export default {
        name: "compmain",
        components: {
            pageNation01
        },
        data() {
            return {
                name: '',
                status: '进行中',
                loading: false,
                tableData: [],
                currentPage: 1, //当前页数
                pageSize: 7, //每页的数据
                form: {},
                type01: 'success',
                route: ''
            };
        },
        created() {
            this.load()
        },
        methods: {
            editCurrentApplicationApproval(row) {
                this.$router.push({
                    path: '/home03',
                    query: {
                        name: row.compName,
                        id: row.compId,
                        route: 'compmain'
                    }
                })
            },
            //编辑后点击确定按钮
            load() {
                if (this.status == '已结束') {
                    this.type01 = 'info'
                }
                if (this.status == '未开始') {
                    this.type01 = 'warning'
                }
                if (this.status == '进行中') {
                    this.type01 = 'success'
                }
                this.axios.get(this.base_url + "/comp/page", {
                    params: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                        compName: this.name,
                        compStatus: this.status,
                    }
                }).then((result) => {
                    this.tableData = result.data.data.records
                    if (this.tableData.length == 0) {
                        this.$message.warning("没有再多数据啦！！！")
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.load()
            },
            search() {
                this.load()
            },
            reset() {
                this.name = ""
                this.type01 = 'success'
                this.status = '进行中'
                this.load()
            },
            jjj() {
                this.$router.go(-1)
            }
        },
    };
</script>

<style scoped>
    .activationcode .el-form {
        display: flex;
        float: left;
    }
    
    .el-table--enable-row-hover .el-table__body tr:hover>td {
        color: #07419e;
    }
</style>