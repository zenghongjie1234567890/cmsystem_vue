<template>
<div class="activationcode">
    <el-form label-width="80px">
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

    <el-button type="primary" @click="search" style="margin-left: 15px;" icon="el-icon-search">查询</el-button>
    <el-button type="warning" @click="reset" style="margin-left: 15px;">重置</el-button>

    <el-table border class="table" :fit="true" :data="tableData">
        <el-table-column sortable label="比赛编号">
            <template slot-scope="{ row, $index }">
                <span v-if="!showEdit[$index]">{{ row.compId }}</span>
                <el-input type="text" v-model="row.compId" v-else placeholder="请输入编号" disabled="true"></el-input>
            </template>
        </el-table-column>
        <el-table-column sortable label="比赛名字">
            <template slot-scope="{ row, $index }">
                <span v-if="!showEdit[$index]">{{ row.compName}}</span>
                <el-input type="text" v-model="row.compName" v-else placeholder="请输入使用次数"></el-input>
            </template>
        </el-table-column>
        <el-table-column sortable label="比赛主办方">
            <template slot-scope="{ row, $index }">
                <span v-if="!showEdit[$index]">{{ row.compSponsor}}</span>
                <el-input type="text" v-model="row.compSponsor" v-else placeholder="请输入使用次数"></el-input>
            </template>
        </el-table-column>
        <el-table-column sortable label="比赛限制人数">
            <template slot-scope="{ row, $index }">
                <span v-if="!showEdit[$index]">{{ row.compMaxnums}}</span>
                <el-input type="el-input-number" v-model="row.compMaxnums" v-else placeholder="请输入使用次数"></el-input>
            </template>
        </el-table-column>
        <el-table-column sortable label="比赛状态">
            <template slot-scope="{ row, $index }">
                <span v-if="!showEdit[$index]">{{ row.compStatus}}</span>
                <el-input type="text" v-model="row.compStatus" v-else placeholder="请输入使用次数" disabled="true"></el-input>
            </template>
        </el-table-column>
        <el-table-column sortable label="比赛开始时间">
            <template slot-scope="{ row, $index }">
                <span v-if="!showEdit[$index]">{{
                            row.compStarttime
                        }}</span>
                <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="row.compStarttime" v-else placeholder="请输入生效开始时间">
                </el-date-picker>
            </template>
        </el-table-column>
        <el-table-column sortable label="比赛结束时间">
            <template slot-scope="{ row, $index }">
                <span v-if="!showEdit[$index]">{{
                            row.compEndtime
                        }}</span>
                <el-date-picker type="date" value-format="yyyy-MM-d" v-model="row.compEndtime" v-else placeholder="请输入失效结束时间">
                </el-date-picker>
            </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" width="200" label="操作">
            <template slot-scope="{ row, $index }">
                <el-button v-if="!showEdit[$index]" @click="showUpdate($index, row)" type="primary">
                    <i class="el-icon-edit"></i>修改
                </el-button>
                <el-button v-if="!showEdit[$index]" @click="del($index, row)" type="danger">
                    <i class="el-icon-delete"></i>删除
                </el-button>
                <el-button v-if="showEdit[$index]" @click="submit($index, row)" type="success">确定</el-button>
                <el-button v-if="showEdit[$index]" @click="cancelUpdate($index)" type="warning">取消</el-button>
            </template>
        </el-table-column>
    </el-table>
    <pageNation01 :total="total" :page-size="pageSize" @pageChange="pageChange" :page_index="currentPage" />
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
            name: "",
            status: '',
            loading: false,
            //控制修改显示隐藏
            showEdit: [],
            tableData: [],
            currentPage: 1, //当前页数
            pageSize: 10, //每页的数据
            total: 0,
            form: {}
        };
    },
    mounted() {
        this.first_time = window.localStorage.getItem("first_time");
        this.last_time = window.localStorage.getItem("last_time");
    },
    created() {
        this.load()
    },
    methods: {
        //编辑后点击确定按钮
        load() {
            this.axios.get(this.base_url + "/comp/page", {
                params: {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                    compName: this.name,
                    compStatus: this.status,
                }
            }).then((result) => {
                this.tableData = result.data.data.records
                this.total = result.data.data.total
            }).catch((err) => {
                console.log(err);
            });
        },
        submit(index, row) {
            this.axios.post(this.base_url + "/comp/updateComp", this.form).then(res => {
                if (res.data.msg) {
                    this.$message.success("竞赛信息修改成功")
                } else {
                    this.$message.error("竞赛信息修改失败！！")
                }
                this.load()
            })
            this.$set(this.showEdit, index, false);
        },
        //点击删除
        del(index, row) {
            this.$confirm("确定删除该竞赛信息？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                .then(() => {
                    this.axios.get(this.base_url + "/comp/delComp/" + row.compId).then(res => {
                        this.$message.success("工号为:" + row.compId + "  的指定老师删除成功！")
                        this.load()
                    })
                })
                .catch(() => {
                    this.$message.warning("已经取消删除!! ")
                });
        },
        //点击修改
        showUpdate(index, row) {
            this.form = row
            this.showEdit[index] = true
            //点击修改后改变状态切换为确定按钮
            this.$set(this.showEdit, index, true) //这里要用$set方法，否则页面状态不更新
        },
        //取消修改
        cancelUpdate(index, row) {
            this.$confirm("取消修改？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                .then(() => {
                    this.$message.warning("已经取消竞赛信息更改！！")
                });
        },
        pageChange(item) {
            this.currentPage = item.page_index;
            this.pageSize = item.page_limit;
            this.load()
        },
        search() {
            this.load()
        },
        reset() {
            this.name = ""
            this.status = ''
            this.load()
        }
    },
};
</script>

<style scoped>
.activationcode .el-form {
    display: flex;
    float: left;
}
</style>
