// 源码（版权所有）：
<template>
    <div class="personalCenter" style="position: relative;top: -20px;">
        <el-card class="box-card" style="width: 100%;background-color: #FC466B;">
        </el-card>
        <el-card class="box-card" style="width: 100%">
            <div > 
                <el-col :span="12">
                <div class="demo-basic--circle" style="margin: auto;">
                    <div class="img">
                        <el-avatar :size="100" :src="user.stuPicture"></el-avatar>
                    </div>
                </div>
                <div style="margin: 20px;"></div>
                <el-form :label-position="labelPosition" label-width="80px" >
                    <el-form-item label="姓名:">
                        <el-tag type="primary" style="width:500px">{{user.stuName}}</el-tag>
                    </el-form-item>
                    <el-form-item label="学院:">
                        <el-tag type="primary" style="width:500px">{{user.stuCollege}}</el-tag>
                    </el-form-item>
                    <el-form-item label="班级:">
                        <el-tag type="primary" style="width:500px">{{user.stuClass}}</el-tag>
                    </el-form-item>
                    <el-form-item label="学号:">
                        <el-tag type="primary" style="width:500px">{{user.stuId}}</el-tag>
                    </el-form-item>
                    <el-form-item label="密码:">
                        <el-tag type="primary" style="width:500px">{{user.stuPwd}}</el-tag>
                    </el-form-item>
                    <el-form-item label="联系QQ:">
                        <el-tag type="primary" style="width:500px">{{user.stuQq}}</el-tag>
                    </el-form-item>
                </el-form>
<el-button-group style="float: right; padding: 3px 0" type="text">                  
                        <el-button type="primary" icon="el-icon-edit" size="medium" round @click="update">
                            修改信息
                        </el-button>
</el-button-group>
</el-col>
</div>
</el-card>
<el-card class="box-card" style="width: 100%;background-color: #3F5EFB;">
</el-card>
<div class="updateAdd">
    <el-dialog title="学生信息更新" :visible.sync="dialogVisible" width="50%">
        <el-form :model="user" label-width="80px" size="mini">
            <el-form-item label="旧头像">
                    <el-avatar :size="150" :src="user.stuPicture" align="center"></el-avatar>
            </el-form-item>
            <el-form-item label="新头像">
                <el-upload class="avatar-uploader" action="http://localhost:8055/stu/savePicture" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" accept=".jpg,.jpeg,.png">
                    <el-avatar :size="150" :src="imageUrl" align="center" v-if="imageUrl"></el-avatar>
                    <i v-else  class="el-icon-plus avatar-uploader-icon" style="border: 1px dashed #d9d9d9;"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="密码更改：" label-width="100px">
                <el-input v-model="user.stuPwd" autocomplete="off" maxlength="10" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="联系QQ更改： " label-width="120px">
                <el-input v-model="user.stuQq" autocomplete="off" maxlength="10" show-word-limit></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="updatecancel">取 消</el-button>
            <el-button type="primary" @click="updatesure">确 定</el-button>
        </span>
    </el-dialog>
</div>
</div>
</template>
<script>
    export default {
        name: 'PersonalCenter',
        data() {
            return {
                pwd: null,
                qq: null,
                imageUrl: '',
                user: {},
                labelPosition: 'right',
                dialogVisible: false,
            }
        },
        created() {
            this.user = window.localStorage.getItem("user");
            this.user = JSON.parse(this.user)
        },
        methods: {
            update() {
                this.dialogVisible = true
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = this.base_url + res
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
                    return false;
                }
                if (!isLt5M) {
                    this.$message.error('上传头像图片大小不能超过 5MB!');
                    return false;
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            updatesure() {
                if (this.imageUrl != '') {
                    this.user.stuPicture = this.imageUrl
                }
                this.axios.post(this.base_url + "/stu/updatestu", this.user).then(res => {
                    if (res.data.msg) {
                        this.$message.success("用户信息修改成功，请重新登录！！")
                        this.$router.push('/login')
                    } else {
                        this.$message.error("用户信息修改失败！！")
                    }
                })
                this.dialogVisible = false
                this.imageUrl = ''
            },
            updatecancel() {
                this.dialogVisible = false
                this.$message.warning("已取消修改！！")
                this.user = window.localStorage.getItem("user");
                this.user = JSON.parse(this.user)
            },
        },
    }
</script>
<style>
    .el-main {
        line-height: 36px;
        text-align: center;
        background-color: #e9eef3;
    }
    
    .block {
        margin-left: 25px;
        font-weight: bold;
    }
    
    .text {
        font-size: 14px;
    }
    
    .item {
        margin-bottom: 18px;
    }
    
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: '';
    }
    
    .clearfix:after {
        clear: both;
    }
    
    .box-card {
        width: 1368px;
        border-radius: 30px;
    }
    
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>