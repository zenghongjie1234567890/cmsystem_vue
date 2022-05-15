<template>
<div id='id'>
    <div style="width: 85%;height: 138px;margin: auto;">
        <div class="grid-content bg-purple" id="fw01" @click="fw01" style="cursor: pointer;float: left;">
            <div>
                <b style="font-size: 44px;
                    font-weight: 700;
                    color: #9bd7ff;
                    line-height: 66px;
                    letter-spacing: 3px;
                    text-shadow: 0 2px 12px rgba(0,0,0,.5);">个人管理中心
                </b>
            </div>
        </div>
        <div class="grid-content bg-purple" id="fw02" @click="fw02" style="cursor: pointer;float:right;">
            <div>
                <b style="font-size: 44px;
                    font-weight: 700;
                    color:  #ffa3a3;
                    line-height: 66px;
                    letter-spacing: 3px;
                    text-shadow: 0 2px 12px rgba(0,0,0,.5);">竞赛管理中心
                </b>
            </div>
        </div>
    </div>

    <div style="width: 85%;height: 138px;margin: auto;margin-top: 30px;">
        <div class="grid-content bg-purple" style="min-height: 300px;float: left;">
            <div style="background-color: #07419e;height: 35px;">
                <div style="height: 30px;float: left;">
                    <b style="color: #fff;font-size: 15px;line-height: 35px;margin-left: 10px;">竞赛目录
                    </b>
                </div>
                <div style="height: 20px;float: right;width: 40px;background-color: #fff;cursor: pointer;position: relative;top: 5px;right: 15px;
                    margin: 0;
                    border-radius: 14px;
                    text-align: center;
                    line-height: 16px;
                    font-size: 12px;" @click="more01">
                    more
                </div>
            </div>
            <div>
                <el-table :data="tableData01" :show-header="false" style="font-size: 13px;">
                    <el-table-column prop="compName" width="500px" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div style="cursor:pointer;" @click="j(scope.row)">{{scope.row.compName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="compStarttime" style="margin: auto;">
                        <template slot-scope="scope">
                            <div style="cursor:pointer;width: 200px;" @click="j(scope.row)">{{scope.row.compStarttime}}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="grid-content bg-purple" style="min-height: 300px;float:right;">
            <div style="background-color: #07419e;height: 35px;">
                <div style="height: 30px;float: left;">
                    <b style="color: #fff;font-size: 15px;line-height: 35px;margin-left: 10px;">比赛附件</b>
                </div>
                <div style="height: 20px;float: right;width: 40px;background-color: #fff;cursor: pointer;position: relative;top: 5px;right: 15px;
                    margin: 0;
                    border-radius: 14px;
                    text-align: center;
                    line-height: 16px;
                    font-size: 12px;" @click="more02">
                    more
                </div>
                <div>
                    <el-table :data="tableData02" :show-header="false" style="font-size: 13px;">
                        <el-table-column prop="compName" label="比赛名字" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <div>{{scope.row.fileName}}</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
    <div style="width: 60%;min-height: 300px;margin: auto;margin-top: 170px;" class="grid-content bg-purple-dark">
        <div style="background-color: #07419e;height: 35px;">
            <div style="height: 30px;float: left;">
                <b style="color: #fff;font-size: 15px;line-height: 35px;margin-left: 10px;">比赛获奖名单</b>
            </div>
            <div style="height: 20px;float: right;width: 40px;background-color: #fff;cursor: pointer;position: relative;top: 5px;right: 15px;
                    margin: 0;
                    border-radius: 14px;
                    text-align: center;
                    line-height: 16px;
                    font-size: 12px;" @click="more03">
                more
            </div>
            <div>
                <el-table :data="tableData03" :show-header="false" style="font-size: 13px;">
                    <el-table-column prop="fileName" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div style="cursor:pointer;" @click="jj(scope.row)">{{scope.row.fileName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="fileData" style="margin: auto;" width="100px">
                        <template slot-scope="scope">
                            <div style="cursor:pointer;" @click="jj(scope.row)">{{scope.row.fileData}}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>

    <el-col :span="24" style="margin-top: 40px;">
        <div class="grid-content bg-purple-dark" style="min-height: 35px;background-color: #07419e;">
        </div>
    </el-col>
</div>
</template>

<script>
export default {
    name: 'name',
    data() {
        return {
            tableData01: [],
            tableData02: [],
            tableData03: []
        }
    },
    created() {
        this.axios.get(this.base_url + "/comp/page", {
            params: {
                currentPage: 1,
                pageSize: 5,
                compName: '',
                compStatus: '',
            }
        }).then((result) => {
            this.tableData01 = result.data.data.records
        })
        this.axios.get(this.base_url + "/file/page", {
            params: {
                currentPage: 1,
                pageSize: 5,
                compName: '',
                compStatus: '',
            }
        }).then((result) => {
            this.tableData02 = result.data.data.records
        })
        this.axios.get(this.base_url + "/price/page", {
            params: {
                currentPage: 1,
                pageSize: 5,
            }
        }).then((result) => {
            this.tableData03 = result.data.data.records
        })
    },
    methods: {
        more01() {
            this.$router.push('/home02')
        },
        more02() {
            this.$router.push('/home04')
        },
        more03() {
            this.$router.push('/home05')
        },
        fw01() {
            if (localStorage.getItem('user') != null) {
                this.$router.push('/usermessage')
            } else {
                this.$router.push('/login')
            }
        },
        fw02() {
            this.$router.push('/compmain')
        },
        j(ele) {
            this.$router.push({
                path: '/home03',
                query: {
                    name: ele.compName,
                    id: ele.compId,
                }
            })
        },
        jj(ele) {
            this.$router.push({
                path: '/home06',
                query: {
                    compid:ele.compid
                }
            })
        }
    }
}
</script>

<style lang="css">
.el-row {
    margin-bottom: 20px;
}

.el-col {
    border-radius: 4px;
}

.bg-purple {
    width: 588px;
    height: 138px;
}

.grid-content {
    border-radius: 4px;
    min-height: 138px;
}

.row-bg {
    padding: 3px 0;
    background-color: #f9fafc;
}

#fw01 {
    background-image: url(../../assets/demo01.png);
    background-size: cover;
}

#fw02 {
    background-image: url(../../assets/demo02.png);
    background-size: cover;
}

html,
body {
    margin: 0;
    padding: 0;
}

/*鼠标移入某行时的背景色*/

.el-table--enable-row-hover .el-table__body tr:hover>td {
    color: #07419e;
}
</style>
