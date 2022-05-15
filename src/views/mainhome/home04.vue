<template>
    <div id='id'>
        <div style="width: 100%; height: 50px;background-color: #07419e;position: relative;top: -20px;">
            <div style="width: 83%; height: 50px;background-color: #07419e;;margin: auto;">
                <div style="height: 50px;float: left;"><b
                        style="color: #fff;font-size: 23px;line-height: 50px;">比赛附件</b></div>
                <div style="height: 50px;float: right;"><b
                        style="color: #fff;font-size: 23px;line-height: 50px;cursor:pointer;" @click="jjj">返回</b></div>
            </div>
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="19">
                    <div class="grid-content bg-purple-light">
                        <el-table :data="tableData" style="width: 100%;height: 360px;font-size: 16px;">
                            <el-table-column label="附件名称" prop="compName" width="1000px">
                                <template slot-scope="scope">
                                    <div style="cursor:pointer;" @click="j(scope.row.compName)">{{scope.row.fileName}}
                                    </div>
                                </template>
</el-table-column>
<el-table-column label="附件下载" prop="compStarttime" style="margin: auto;">
    <template slot-scope="scope">
                        <el-button type="success" @click="downloadfile(scope.row.fileUrl)" icon="el-icon-download" circle  >下载
                        </el-button>
                    </template>
</el-table-column>
</el-table>

</div>
</el-col>
</el-row>
<el-row>
    <div class="block" style="margin: auto;">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :total="100" style="text-align: center; margin-top: 20px;">
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
                currentPage: 1
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
            jjj() {
                this.$router.go(-1)
            },
            load() {
                this.axios.get(this.base_url + "/file/page", {
                    params: {
                        currentPage: this.currentPage,
                        pageSize: 6,
                        compName: '',
                        compStatus: '',
                    }
                }).then((result) => {
                    this.tableData = result.data.data.records
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

</style>