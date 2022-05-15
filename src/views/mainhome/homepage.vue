<template>
    <div id='id'>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <div class="imgstyle">
                        <img src="../../assets/logo11.png" alt="">
                        <p style="font-size: 44px;color: white;position: relative;bottom: 30px;">学 科 竞 赛 管 理 系 统</p>
                    </div>
                    <div class="searchstyle">
                        <el-input v-model="search" placeholder="搜索" prefix-icon="el-icon-search"></el-input>
                    </div> 
                </div>
            </el-col>
        </el-row>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'name',
        data() {
            return {
                search: ''
            }
        }

    }
</script>

<style scoped>
    .el-col {
        border-radius: 4px;
    }
    
    .bg-purple-dark {
        background: #99a9bf;
        background-image: url(../../assets/banner.png);
        background-size: cover;
    }
    
    .bg-purple {
        background: #d3dce6;
    }
    
    .bg-purple-light {
        background: #e5e9f2;
    }
    
    .grid-content {
        border-radius: 4px;
        min-height: 300px;
    }
    
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    
    .imgstyle {
        margin: auto;
        text-align: center;
        position: relative;
        bottom: -30px;
    }
    
    .searchstyle {
        /* display: flex; */
        width: 400px;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        position: relative;
        top: -25px;
    }
</style>