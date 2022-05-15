<template>
<div>
    <h1>获奖的比赛以及荣誉</h1>
    <el-table :data="tableData" border fit style="width: 100%">
        <el-table-column fixed prop="teamId" label="队伍ID">
        </el-table-column>
        <el-table-column prop="teamName" label="队伍名称">
        </el-table-column>
        <el-table-column prop="teamFname" label="参加比赛">
        </el-table-column>
        <el-table-column prop="teamNums" label="队长or队友">
        </el-table-column>
        <el-table-column prop="teamPrice" label="奖项等级">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="success" @click="jump(scope.row.teamCompid)" size="mini" icon="el-icon-download">跳转查看获奖详情
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
        this.axios.get(this.base_url + '/members/privatePrice', {
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
                path: '/home06',
                query: {
                    compid: id
                }
            })
        },
    },
}
</script>

<style type="text/css" scoped>

</style>
