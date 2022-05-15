<template>
    <div class="wrapper">
        <el-form :rules="rules" :model="user" ref="userform">
            <div style="margin: 200px auto; background-color: #fff; width: 350px; height: 300px; padding: 20px; border-radius: 10px;">
                <div style="margin: 20px 0; text-align: center; font-size: 24px;">
                    <b>贵 理 工 通 行 证</b></b>
                </div>
                <el-form-item prop="stuId" >
                    <el-input v-model="user.stuId" placeholder="请输入账号" size="medium" prefix-icon="el-icon-user" style="margin: 10px 0;" ></el-input>
                </el-form-item>
                <el-form-item prop="stuPwd">
                    <el-input v-model="user.stuPwd" placeholder="请输入密码" size="medium" prefix-icon="el-icon-lock" style="margin: 10px 0;" show-password ></el-input>
                </el-form-item>    
                <div style="margin: 10px 0; text-align: right;">
                    <el-button type="primary" size="small" autocomplete="off" @click="login">登录</el-button>
                    <el-button type="warning" size="small" autocomplete="off" @click="reset">重置</el-button>
                    <el-button type="success" size="small" autocomplete="off" @click="visitor">游客访问</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                user: {},
                rules: {
                    stuId: [{
                        required: true,
                        message: '请输入用学号',
                        trigger: 'blur'
                    }, {
                        min: 3,
                        max: 10,
                        message: '长度在 5 到 10 个字符',
                        trigger: 'blur'
                    }],
                    stuPwd: [{
                        required: true,
                        message: '请输入账号密码',
                        trigger: 'blur'
                    }, {
                        min: 5,
                        max: 10,
                        message: '密码长度在 6 到 10 个字符，默认是学号后6位',
                        trigger: 'blur'
                    }],
                }
            }
        },
        created() {
            localStorage.clear()
        },
        methods: {
            login() {
                this.$refs['userform'].validate((valid) => {
                    if (valid) {
                        this.axios.post(this.base_url + "/stu/login", this.user).then(res => {
                            if (res.data.msg == true) {
                                if (this.user.stuId == 'admin') {
                                    this.$message.success("登录成功！！！欢迎来到管理界面！！")
                                    this.$router.push('/selstu')
                                    localStorage.setItem("user", JSON.stringify(res.data.stu))
                                } else {
                                    this.$message.success("登录成功，" + "欢迎" + res.data.stu.stuName + "用户！！！")
                                    this.$router.push('/home01')
                                    localStorage.setItem("user", JSON.stringify(res.data.stu))
                                }
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                    } else {
                        this.$message.error("登录信息格式不对！！！")
                        return false;
                    }
                });
            },
            reset() {
                this.user = {}
            },
            visitor() {
                this.$router.push('/home01')
            }
        }
    }
</script>

<style>
    .wrapper {
        height: 100vh;
        background-image: linear-gradient(to bottom right, #FC466B, #3F5EFB);
        overflow: hidden;
    }
</style>