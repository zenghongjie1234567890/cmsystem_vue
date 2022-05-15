<template>
        <div class="activationcode">
            <div style="width: 100%; height: 50px;background-color: #07419e;" class="playerinformation">
                <div style="width: 83%; height: 50px;background-color: #07419e;;margin: auto;">
                    <div style="height: 50px;float: left;"><b style="color: #fff;font-size: 23px;line-height: 50px;">指导老师信息查询</b>
                    </div>
                    <div style="height: 50px;float: right;"><b
                            style="color: #fff;font-size: 23px;line-height: 50px;cursor:pointer;" @click="jjj">返回</b></div>
                </div>
                            <el-row type="flex" class="row-bg" justify="center" style="margin-top: 50px;">
                                <el-col :span="19">
                                            <el-form label-width="150px">
                                                <el-form-item label="老师所属学院:">
                                                    <el-input v-model="teacherCollege" placeholder="请输入学院" prefix-icon="el-icon-search"></el-input>
                                                </el-form-item>
                                                <el-form-item label="指导老师姓名:">
                                                    <el-input v-model="teacherName" placeholder="请输入姓名" prefix-icon="el-icon-search"></el-input>
                                                </el-form-item>
                                            </el-form>
                                            <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
                                            <el-button type="warning" @click="reset" icon="el-icon-refresh">重置</el-button>
<el-table :data="tableData" border fit style="width: 100%" >
    <el-table-column fixed prop="teacherId" label="ID" width="80px">
    </el-table-column>
    <el-table-column prop="teacherName" label="指导老师姓名" width="150px">
    </el-table-column>
    <el-table-column prop="teacherPicture" width="180px" label="头像">
        <template slot-scope="scope">
            <img :src="scope.row.teacherPicture" min-width="102px" height="136px" />
        </template>
</el-table-column>
<el-table-column prop="teacherCollege" width="120px" label="隶属学院">
</el-table-column>
<el-table-column prop="teacherLevel" width="200px" label="学历等级">
</el-table-column>
<el-table-column prop="teacherDesc" label="个人信息">
</el-table-column>
</el-table>
<pageNation01 :total="total" :page-size="pageSize" @pageChange="pageChange" :page_index="currentPage" />
</el-col>
</el-row>
<el-col :span="24">
    <div class="grid-content bg-purple-dark" style="min-height: 35px;margin-top: 30px;background-color: #07419e;"></div>
</el-col>
</div>
</div>
</template>

<script>
    import pageNation01 from '../../components/pagenation/pageNation01';
    export default {
        components: {
            pageNation01
        },
        data() {
            return {
                tableData: [],
                currentPage: 1, //当前页数
                pageSize: 4, //每页的数据
                total: 0,
                teacherName: '',
                teacherCollege: ''
            }
        },
        created() {
            this.load()
        },
        methods: {
            search() {
                this.currentPage = 1, //当前页数
                    this.pageSize = 4, //每页的数据
                    this.load()
            },
            reset() {
                this.teacherCollege = ''
                this.teacherName = ''
                this.load()
            },
            load() {
                this.axios.get(this.base_url + "/teacher/page", {
                    params: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                        teacherCollege: this.teacherCollege,
                        teacherName: this.teacherName
                    }
                }).then((result) => {
                    this.tableData = result.data.data.records
                    this.total = result.data.data.total
                }).catch((err) => {
                    console.log(err);
                });
            },
            jjj() {
                this.$router.go(-1)
            },
            pageChange(item) {
                this.currentPage = item.page_index;
                this.pageSize = item.page_limit;
                this.load()
            },
        },
    }
</script>

<style type="text/css" scoped>
    .playerinformation .el-form {
        display: flex;
        float: left;
    }
    
    .playerinformation .el-button {
        margin-left: 20px;
    }
</style>