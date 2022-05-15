<template>
<div class="dialog">
    <el-dialog :title="dialog.title" :close-on-click-modal="false" :close-on-press-escape="false" :modal-append-to-body="false" :visible.sync="dialog.show" :show-close="false">
        <el-form ref="MailForm" :rules="rules" :model="MailForm" label-width="100px">
            <el-form-item label="选择：">
                <el-radio-group v-model="checked" v-for="item in workOrderList" :key="item.label" @change="qiehua(item.label)">
                    <el-radio-button :label="item.label" :disabled="jundge">
                        {{item.value}}
                    </el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-show="joinOne" label="本人学号:">
                <el-input v-model="stuId" placeholder="请输入本人学号" @blur="blur" autocomplete="off" maxlength="10" show-word-limit></el-input>
            </el-form-item>
            <el-form-item v-show="joinTeam" label="队长学号:">
                <el-input v-model="stuId" placeholder="请输入本人学号" @blur="blur" autocomplete="off" maxlength="10" show-word-limit>
                </el-input>
            </el-form-item>
            <el-form-item prop="teamName" label="队伍名称:">
                <el-input v-model="MailForm.teamName"></el-input>
            </el-form-item>
            <el-form-item v-show="joinOne" label="本人名字:">
                <el-tag type="success" size="medium" style="font-size: 17px;">{{stuName}}</el-tag>
            </el-form-item>
            <el-form-item v-show="joinTeam" label="队长名字:">
                <el-tag type="success" size="medium" style="font-size: 17px;">{{stuName}}</el-tag>
            </el-form-item>
            <el-form-item prop="teamWorks" label="作品名字:">
                <el-input v-model="MailForm.teamWorks"></el-input>
            </el-form-item>

            <el-form-item label="成员添加:" v-show="joinTeam">
                <el-button class="el-icon-plus" @click.prevent="addRow()">添加组员</el-button>
            </el-form-item>

            <div class="table" v-show="joinTeam">
                <el-table :data="teams" ref="table" tooltip-effect="dark" border stripe @selection-change='selectRow'>
                    <el-table-column label="学号" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.id" @blur="blur" autocomplete="off" maxlength="10" show-word-limit placeholder="请输入组员学号"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="姓名">
                        <template slot-scope="scope">
                            <el-tag type="info" size="medium" style="font-size: 17px;">{{scope.row.name}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" icon="el-icon-delete" @click="del(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-form-item prop="checkedServer" label="指定老师选择:" style="margin-top: 20px;">
                <el-select v-model="MailForm.teamTeaid" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.teacherName" :value="item.teacherName" :label="item.teacherName">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="作品上传：">
                <el-upload class="upload-demo" drag ref="upload" action="http://localhost:8055/team/upload" :before-upload="beforeAvatarUpload" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" multiple :limit="1">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">只能上传一个文件 </em><em>点击上传</em></div>
                </el-upload>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleclose()">取 消</el-button>
            <el-button type="primary" @click="handleAddAndEdit()">立即报名</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    name: "MailDialog",
    // 获取父亲传过来的值
    props: {
        dialog: Object,
    },
    data() {
        return {
            teams: [{
                id: '',
                name: '← ← ← 输入学号自动出名字',
            }],
            selectlistRow: [],
            options: [],
            jundge: false,
            dialogVisible: false,
            innerVisible: false,
            stuId: null,
            stuName: '请输入学号 ↑ ↑ ↑ ',
            joinOne: true,
            joinTeam: false,
            checked: 1,
            fileList: [],
            MailForm: {},
            workOrderList: [{
                label: 1,
                value: "个人参赛",
            }, {
                label: 2,
                value: "团队参赛",
            }],
            rules: {
                teamName: [{
                    required: true,
                    message: "请输入队伍名字",
                    trigger: "blur"
                }],
                teamWorks: [{
                    required: true,
                    message: "请输入作品名字",
                    trigger: "blur"
                }],
            },
            name: '',
            comp: {},
            member: {}
        };
    },
    created() {
        this.name = this.$route.query.compName
        this.axios.get(this.base_url + '/teacher/getAllName').then((result) => {
            this.options = result.data
        })
        this.axios.get(this.base_url + '/comp/selOne', {
            params: {
                id: this.name
            }
        }).then((result) => {
            this.comp = result.data
            if (this.comp.compMaxnums == 1) {
                this.jundge = true
            }
        })
    },
    methods: {
        // 增加行
        addRow() {
            var list = {
                id: this.id,
                name: '← ← ← 输入学号自动出名字'
            }
            if (this.teams.length > this.comp.compMaxnums - 2) {
                this.$message.warning("已经达到队伍最大参数人数！！")
            } else {
                this.teams.unshift(list)
            }
        },
        //删除行数
        del(index) {
            this.teams.splice(index, 1)
        },
        reset() {
            this.jundge = false
            this.stuId = null
            this.stuName = '请输入学号 ↑ ↑ ↑ '
            this.MailForm = {}
            this.teams = [{
                id: '',
                name: '← ← ← 输入学号自动出名字',
            }]
            this.fileList = []
        },
        handleAddAndEdit() {
            this.dialog.show = false;
            this.MailForm.teamCompid = this.$route.query.compId
            this.MailForm.teamId = null
            if (this.checked == 2) {
                this.MailForm.teamNums = this.teams.length + 1
            }
            this.axios.post(this.base_url + "/team/addTeam", this.MailForm).then((res) => {
                if (res.data.code) {
                    this.$message.success(res.data.msg + ",你的团队id为" + res.data.id)
                    this.$refs.upload.submit();
                    this.member.memberTearmid = res.data.id
                    this.member.memberStuid = this.stuId
                    this.member.memberIsleader = 1
                    this.axios.post(this.base_url + "/members/add", this.member)
                    if (this.checked == 2) {
                        this.member.memberIsleader = 0
                        this.member.memberTearmid = res.data.id
                        for (let index = 0; index < this.teams.length; index++) {
                            this.member.memberStuid = this.teams[index].id
                            this.axios.post(this.base_url + "/members/add", this.member)
                        }
                    }
                    this.reset()
                    this.$emit('mark')
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        handleclose() {
            this.dialog.show = false;
            this.reset()
            this.$message.warning("已取消报名！！")
        },
        blur() {
            if (this.checked == 1) {
                this.jundge = true
                this.MailForm.teamNums = 1
                this.axios.get(this.base_url + "/stu/findstu/", {
                    params: {
                        stuId: this.stuId
                    }
                }).then((result) => {
                    if (result.data == '') {
                        this.stuName = '查无此学生！！'
                    } else {
                        this.stuName = result.data.stuName

                    }
                })
            }
            if (this.checked == 2) {
                this.jundge = true
                this.axios.get(this.base_url + "/stu/findstu/", {
                    params: {
                        stuId: this.stuId
                    }
                }).then((result) => {
                    if (result.data == '') {
                        this.stuName = '查无此学生！！'
                    } else {
                        this.stuName = result.data.stuName
                    }
                })
                this.axios.get(this.base_url + "/stu/findstu/", {
                    params: {
                        stuId: this.teams[0].id
                    }
                }).then((result) => {
                    if (result.data == '') {
                        this.teams[0].name = '查无此学生！！'
                    } else {
                        this.teams[0].name = result.data.stuName
                    }
                })
            }
        },
        qiehua(value) {
            if (value == 1) {
                this.joinOne = true;
            } else {
                this.joinOne = false;
            }
            if (value == 2) {
                this.joinTeam = true;
            } else {
                this.joinTeam = false;
            }
        },
    },
};
</script>

<style scoped>
.upload {
    width: 20px;
    height: 20px;
    margin-top: 10px;
}
</style>
