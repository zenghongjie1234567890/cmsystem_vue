<template>
    <div id='id'>
        <div style="width: 100%; height: 50px;background-color: #07419e;position: relative;top: -20px;">
            <div style="width: 83%; height: 50px;background-color: #07419e;;margin: auto;">
                <el-button type="warning" @click="apply"
                    style="margin-left: 70px;background-color: #fff; height: 40px;font-size: 25px;position: relative;top: 6px;"><b
                        style="color: #07419e;position: relative;top: -3px;">比赛报名</b></el-button>
                <div style="height: 50px;float: right;"><b style="color: #fff;font-size: 23px;line-height: 50px;cursor:pointer;"  @click="jjj">返回</b></div>
            </div>
            </div>
        <el-row type="flex" class="row-bg" justify="center" >
            <el-col :span="19">
                <div style="text-align: center;"><h1 style="color: rgb(255, 125, 87);font-size: 30px;">{{name}}</h1></div>
                <div class="ql-editor" v-html="contents"></div>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center" style="margin-top: 50px;">
            <el-col :span="19">
                <b style="color: red;">附件下载:</b>
                <div v-for="file in files" style="margin-top: 10px;">
                    <a href="javascript:;" @click="downloadfile(file.fileUrl)"> {{file.fileName}}</a>
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
                route: '',
                contents: '',
                files: [],
                compId: null,
                status: '',
                name: null
            }
        },
        created() {
            this.id = this.$route.query.id
            this.axios.get(this.base_url + '/comp/selOne', {
                params: {
                    id: this.id
                }
            }).then(res => {
                this.contents = res.data.compDesc
                this.compId = res.data.compId
                this.status = res.data.compStatus
                this.name = res.data.compName
                this.axios.get(this.base_url + '/file/getFiles', {
                    params: {
                        compId: this.compId
                    }
                }).then(res => {
                    this.files = res.data
                    console.log(this.files);
                })
            })
        },
        methods: {
            downloadfile(url) {
                window.open(url)
            },
            jjj() {
                this.$router.go(-1)
            },
            apply() {
                if (localStorage.getItem('user') != null) {
                    if (this.status == '未开始') {
                        this.$message.warning("比赛报名未开始!!!!")
                    }
                    if (this.status == '已结束') {
                        this.$message.warning("该比赛已结束!!!!")
                    }
                    if (this.status == '进行中') {
                        this.$router.push({
                            path: '/compApply',
                            query: {
                                compId: this.$route.query.id
                            }
                        })
                    }
                } else {
                    this.$confirm('当前未登录，是否跳转至登录页面?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.push('/login')
                    }).catch(() => {
                        this.$message.warning("已取消！！！")
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>