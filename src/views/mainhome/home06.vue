<template>
<div id='id'>
    <div style="width: 100%; height: 50px;background-color: #07419e;position: relative;top: -20px;">
        <div style="width: 83%; height: 50px;background-color: #07419e;;margin: auto;">
            <el-tag type="warning" style="margin-left: 70px;background-color: #fff; height: 40px;font-size: 25px;position: relative;top: 6px;" disabled><b style="color: #07419e;">比赛获奖详情</b></el-tag>
            <div style="height: 50px;float: right;"><b style="color: #fff;font-size: 23px;line-height: 50px;cursor:pointer;" @click="jjj">返回</b></div>
        </div>
    </div>
    <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="19">
            <div style="text-align: center;">
                <h1 style="color: rgb(255, 125, 87);font-size: 30px;">{{price.fileName}}</h1>
            </div>
            <el-table :data="table" border fit style="width: 100%">
                <el-table-column fixed prop="teamId" label="队伍ID">
                </el-table-column>
                <el-table-column prop="teamName" label="队伍名称">
                </el-table-column>
                <el-table-column label="作品名字" prop="teamWorks" style="margin: auto;">
                </el-table-column>
                <el-table-column label="指导老师" prop="teamTeaid" style="margin: auto;">
                </el-table-column>
                <el-table-column label="获得分数" prop="teamGrade" style="margin: auto;">
                </el-table-column>
                <el-table-column label="获得奖项" prop="teamPrice" style="margin: auto;">
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center" style="margin-top: 50px;">
        <el-col :span="19">
            <b style="color: red;">详情附件下载:</b>
            <div style="margin-top: 10px;">
                <a href="javascript:;" @click="downloadfile(price.fileUrl)"> {{file1}}</a>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <div class="grid-content bg-purple-dark" style="min-height: 35px;margin-top: 170px;background-color: #07419e;"></div>
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
    name: 'name',
    data() {
        return {
            id: '',
            contents: '',
            compId: null,
            name: null,
            price: {},
            file1: '',
            table: []
        }
    },
    created() {
        this.id = this.$route.query.compid
        this.axios.get(this.base_url + '/price/getone', {
            params: {
                compid: this.id
            }
        }).then(res => {
            this.price = res.data.file
            this.table = res.data.price;
            this.file1 = res.data.file.fileName + ".xlsx"
        })
    },
    methods: {
        downloadfile(url) {
            window.open(url)
        },
        jjj() {
            this.$router.go(-1)
        },
    }
}
</script>

<style scoped>

</style>
