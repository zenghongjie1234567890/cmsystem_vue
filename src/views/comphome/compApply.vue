<template>
    <div class="activationcode">
        <div style="width: 100%; height: 50px;background-color: #07419e;">
            <div style="width: 83%; height: 50px;background-color: #07419e;;margin: auto;">
                <div style="height: 50px;float: left;"><b
                        style="color: #fff;font-size: 23px;line-height: 50px;">竞赛报名大厅</b>
                </div>
                <div style="height: 50px;float: right;"><b
                        style="color: #fff;font-size: 23px;line-height: 50px;cursor:pointer;" @click="jjj">返回</b
                ></div>
            </div>
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="19">
                    <div style="text-align: center;">
                        <el-card class="box-card" style="width: 100%;font-size: 25px;">{{form.compName}}
                                <el-tag type="success" style="font-size: 24px;float: right;" >进行中。。。</el-tag>
                        </el-card>
                        <div style="float:left;" class="box">
                            <h3>主办方</h3>
                            <el-tag type="warning" style="font-size: 20px;background-color: #166480;">{{form.compSponsor}}</el-tag>
                        </div>
                        <div style="float: left;margin-left: 50px;" class="box">
                            <h3>比赛队伍最多报名人数</h3>
                            <el-tag type="warning" style="font-size: 20px;background-color: #166480;">{{form.compMaxnums}}</el-tag>
                        </div>
                        <div style="float: left;margin-left: 50px;" class="box">
                            <h3>报名结束时间</h3>
                            <el-tag type="warning" style="font-size: 20px;background-color: #166480;">{{form.compEndtime}}</el-tag>
                        </div>
                        <div style="float: right;" class="box1">
                            <h3>操作</h3>
                            <el-button type="success" style="background-color: #9fd42b;" @click="homejump" icon="el-icon-s-home">首页跳转</el-button>
                            <el-button type="success" style="background-color: #FC466B;" @click="teamsg" icon="el-icon-tickets">指导老师信息</el-button>
                            <el-button type="success" style="background-color: #3F5EFB;" @click="msg" icon="el-icon-message-solid">我的报名信息</el-button>
                        </div>
                        <el-card class="box-card">
                                <h2 style="float: left;margin-left: 35px;position: relative;top: -16px;">参赛队伍信息</h2>
                                <el-button style="float: right;font-size: 25px;margin-right: 100px;position: relative;bottom: 10px;" type="text" @click="sendMail">点击报名参赛</el-button>
                        </el-card>
                    </div>
                </el-col>                       
            </el-row>
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="19">
                    <div class="grid-content bg-purple-light">
                        <el-table :data="tableData"  style="width: 100%;font-size: 16px;height: 400px;">
                            <el-table-column label="参赛团队id" prop="teamId" >
                            </el-table-column>
                            <el-table-column label="队伍名称" prop="teamName" style="margin: auto;">
                            </el-table-column>
                            <el-table-column label="作品名字" prop="teamWorks" style="margin: auto;">
                            </el-table-column>
                            <el-table-column label="队伍人数" prop="teamNums" style="margin: auto;">
                            </el-table-column>
                            <el-table-column label="指导老师" prop="teamTeaid"  style="margin: auto;">
                            </el-table-column>
                                    <el-table-column prop="operate" label="操作" width="200px">
                                        <template slot-scope="scope">
                                            <el-button type="success" class="el-icon-reading" size="mini" @click="handleEdit(scope.row)"
                                                style="margin-left: 1px;"> Read</el-button>
                                        </template>
</el-table-column>
</el-table>
<pageNation01 :total="total" :page-size="pageSize" @pageChange="pageChange" :page_index="currentPage" />
</div>
</el-col>
</el-row>
<div class="block" style="margin: auto;">
</div>
<el-col :span="24">
    <div class="grid-content bg-purple-dark" style="min-height: 35px;margin-top: 30px;background-color: #07419e;"></div>
</el-col>
</div>

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

<MailDialog :dialog="dialog" @mark="running" />
</div>
</template>
<script>
    import MailDialog from "../../components/maildialog/MailDialog"
    import pageNation01 from '../../components/pagenation/pageNation01';
    export default {
        name: "compmain",
        components: {
            MailDialog,
            pageNation01
        },
        data() {
            return {
                user: null,
                dialogVisible: false,
                captainName: [],
                partner: [],
                id: '',
                loading: false,
                currentPage: 1, //当前页数
                pageSize: 4, //每页的数据
                total: 0,
                form: {},
                type01: 'success',
                dialog: {
                    show: false, //是否显示弹出框
                    title: "", //弹出框的title
                    cname: ''
                },
                tableData: []
            };
        },
        created() {
            this.user = window.localStorage.getItem("user");
            this.user = JSON.parse(this.user)
            this.id = this.$route.query.compId
            this.load()
        },
        methods: {
            //编辑后点击确定按钮
            load() {
                this.axios.get(this.base_url + '/comp/selOne', {
                    params: {
                        id: this.id
                    }
                }).then((result) => {
                    this.form = result.data
                    this.axios.get(this.base_url + "/team/page", {
                        params: {
                            currentPage: this.currentPage,
                            pageSize: this.pageSize,
                            id: this.form.compId
                        }
                    }).then((result) => {
                        this.tableData = result.data.data.records
                        this.total = result.data.data.total
                    })
                })
            },
            sendMail() {
                this.dialog = {
                    show: true,
                    title: "报名参赛",
                };
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.load()
            },
            jjj() {
                this.$router.go(-1)
            },
            teamsg() {
                this.$router.push('/compTeacher')
            },
            homejump() {
                this.$router.push('/home01')
            },
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
            running() {
                this.load()
                this.handleEdit(comp)
            },
            pageChange(item) {
                this.currentPage = item.page_index;
                this.pageSize = item.page_limit;
                this.load()
            },
            msg() {
                this.axios.get(this.base_url + '/members/isJoin', {
                    params: {
                        compId: this.form.compId,
                        stuId: this.user.stuId
                    }
                }).then((result) => {
                    if (result.data.length == 0) {
                        this.$message.warning("你还没报名,请点击下面的报名参赛！")
                    } else {
                        this.$message.success("你已经报名了,你的团队id为" + result.data)
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .activationcode .el-form {
        display: flex;
        float: left;
    }
    
    .box-card {
        width: 100%;
        border-radius: 50px;
        height: 70px;
    }
    
    .item {
        margin-bottom: 18px;
    }
    
    .box {
        width: 17%;
        height: 100px;
    }
    
    .box1 {
        width: 40%;
        height: 100px;
    }
</style>