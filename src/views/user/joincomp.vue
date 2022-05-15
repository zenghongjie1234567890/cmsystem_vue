<template>
<div>
    <h1>参加的比赛</h1>
    <el-table :data="tableData" border fit style="width: 100%">
        <el-table-column fixed prop="teamId" label="队伍ID">
        </el-table-column>
        <el-table-column prop="teamName" label="队伍名称">
        </el-table-column>
        <el-table-column prop="teamFname" label="参加比赛">
        </el-table-column>
        <el-table-column label="提交作品预览">
            <template slot-scope="scope">
                <el-button type="primary" @click="downloadfile(scope.row.teamFile)" size="mini" icon="el-icon-download">下载
                </el-button>
            </template>
        </el-table-column>
        <el-table-column prop="teamNums" label="队长or队员">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="success" @click="jump(scope.row.teamCompid)" size="mini" icon="el-icon-download">跳转查看详情
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            user: {}
        }
    },
    created() {
        this.user = window.localStorage.getItem("user");
        this.user = JSON.parse(this.user)
        this.axios.get(this.base_url + '/members/privateMsg', {
            params: {
                stuId: this.user.stuId
            }
        }).then((result) => {
            this.tableData = result.data
        })
    },
    methods: {
        jump(id) {
            this.$router.push({
                path: '/compApply',
                query: {
                    compId: id
                }
            })
        },
        downloadfile(url) {
            window.open(url)
            this.load()
        },
    },
}
</script>

<style type="text/css" scoped>

</style>
