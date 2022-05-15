<template>
    <div class="home">
       <el-container :style="{height: 100 + 'vh' }">
          <el-menu background-color="#304156" text-color="#fff" active-text-color="#09F7F7" default-active="1"
              class="el-menu-vertical-demo" :collapse="isCollapse" unique-opened router :default-active="$route.path">
              <div>
                  <div class="biaoti" v-if="check">
                      <img src="../../assets/pp.png" width="40px"
                      style="position: relative;top: 7px; border-radius:100%; overflow:hidden;">
                      <b style="font-size: 18px;color: white;position: relative;top: -10px;"> 用户管理中心</b>
                  </div>
                  <div class="biaoti" v-else>
                      <img src="../../assets/pp.png" alt="" width="40px"
                      style="position: relative;top: 7px; border-radius:100%; overflow:hidden;">
                  </div>
              </div>
              <el-menu-item v-for="item in menu" :index="item.id" :key="item.id" >
                  <template slot="title">
                      <i :class="item.icon" style="color: #fff" ></i>
                      <span slot="title" >{{item.name}}</span>
                  </template>
</el-menu-item>
</el-menu>
<el-container>
    <el-header>
        <div class="icons" @click="toggleCollapse">
            <i class="el-icon-s-unfold" v-if="isCollapse"></i>
            <i class="el-icon-s-fold"></i>
        </div>
        <div class="mbx">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="headeright">
            <span style="padding: 18px;">欢迎您，<span style="color: blue;">{{user.stuName}}</span></span>
            <el-tag type="danger" style="cursor: pointer;" @click="logout">退出登录</el-tag>
        </div>
    </el-header>
    <el-main>
        <Tags/>
        <div class="maincontent">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>
    </el-main>
</el-container>
</el-container>
</div>
</template>
<script>
    import menu from "../../config/menu-user"
    import Tags from "../../components/tags/tagsuser"
    export default {
        name: 'Home',
        components: {
            Tags
        },
        data() {
            return {
                isCollapse: false,
                user: {},
                check: true,
                menu: menu,
                breadlist: []
            };
        },
        watch: {
            // 监听路由
            $route(val) {
                // 调用获取路由数组方法
                this.getbreadlist(val);
            }
        },
        mounted() {
            this.user = window.localStorage.getItem("user");
            this.user = JSON.parse(this.user)
        },
        methods: {
            getbreadlist(val) {
                let obj = {
                    to: val.meta.comp,
                    name: val.meta.name,
                    pathname: val.meta.pathname
                }
                let matched = []
                matched.push(obj)
                this.breadlist = matched;
            },
            toggleCollapse() {
                this.isCollapse = !this.isCollapse
                if (this.isCollapse == false) {
                    this.check = true;
                } else {
                    this.check = false;
                }
            },
            logout() {
                this.$confirm('确定退出登录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //点击确定的操作(调用接口)
                    window.localStorage.clear();
                    this.$message.success("退出登录成功！！！")
                    this.$router.push('/login')
                });
            },
        }
    }
</script>
<style scoped="scoped">
    .titles {
        font-size: 20px;
        color: #000;
    }
    
    .mbx {
        padding: 20px;
        font-size: 20px;
    }
    
    .headeright {
        font-size: 20px;
        position: absolute;
        right: 15px;
    }
    
    .maincontent {
        overflow-y: scroll;
        height: calc(100vh-70px);
        padding: 15px;
    }
    
     ::-webkit-scrollbar {
        display: none;
    }
    
    .biaoti {
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: center;
    }
    
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    
    .el-header {
        background-color: #FFFFFF;
        color: #333;
        line-height: 60px;
        display: flex;
        float: left;
        padding: 0 !important;
    }
    
    .el-header i {
        font-size: 25px;
    }
    
    .el-main {
        background-color: #F1F4F5;
        padding: 20px 4px;
    }
    
    .icons {
        width: 25px;
        height: 60px;
        padding: 0 20px;
        text-align: center
    }
    
    .icons:hover {
        background: rgb(248, 248, 248);
        transition: 1s;
        cursor: pointer;
    }
</style>