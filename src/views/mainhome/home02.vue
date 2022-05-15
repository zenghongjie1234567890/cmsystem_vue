<template>
<div id='id'>
    <div style="width: 100%; height: 50px;background-color: #07419e;position: relative;top: -20px;">
        <div style="width: 83%; height: 50px;background-color: #07419e;;margin: auto;">
            <div style="height: 50px;float: left;"><b style="color: #fff;font-size: 23px;line-height: 50px;">竞赛目录</b></div>
            <div style="height: 50px;float: right;"><b style="color: #fff;font-size: 23px;line-height: 50px;cursor:pointer;" @click="jjj">返回</b></div>
        </div>
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="19">
                <div class="grid-content bg-purple-light">
                    <el-table :data="tableData" style="width: 100%;height: 350px;font-size: 16px;">
                        <el-table-column label="竞赛名称" prop="compName" width="1000px">
                            <template slot-scope="scope">
                                <div style="cursor:pointer;" @click="j(scope.row)">{{scope.row.compName}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="发布时间" prop="compStarttime" style="margin: auto;">
                        </el-table-column>
                    </el-table>

                </div>
            </el-col>
        </el-row>
        <el-row>
            <div class="block" style="margin: auto;">
                <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :total="100" style="text-align: center;">
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
    name: 'name',
    components: {
        pageNation01
    },
    data() {
        return {
            tableData: [],
            currentPage: 1,
            route: ''
        }
    },
    created() {
        this.load()
    },
    methods: {
        handleCurrentChange(val) {
            this.currentPage = val
            this.load()
        },
        j(ele) {
            this.$router.push({
                path: '/home03',
                query: {
                    name: ele.compName,
                    id: ele.compId,
                    route: 'home02'
                }
            })
        },
        jjj() {
            this.$router.go(-1)
        },
        load() {
            this.axios.get(this.base_url + "/comp/page", {
                params: {
                    currentPage: this.currentPage,
                    pageSize: 6,
                    compName: '',
                    compStatus: '',
                }
            }).then((result) => {
                this.tableData = result.data.data.records
            }).catch((err) => {
                console.log(err);
            });
        },
    }
}
</script>

<style scoped>

</style>
