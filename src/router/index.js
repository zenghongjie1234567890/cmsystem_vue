import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        redirect: "/home01"
    },
    {
        path: '/homepage',
        component: () =>
            import ('../views/mainhome/homepage.vue'),
        redirect: 'home01',
        children: [{
                path: '/home01',
                name: 'home01',
                component: () =>
                    import ('../views/mainhome/home01.vue')
            },
            {
                path: '/home02',
                name: 'home02',
                component: () =>
                    import ('../views/mainhome/home02.vue')
            },
            {
                path: '/home03',
                name: 'home03',
                component: () =>
                    import ('../views/mainhome/home03.vue')
            },
            {
                path: '/home04',
                name: 'home04',
                component: () =>
                    import ('../views/mainhome/home04.vue')
            },
            {
                path: '/home05',
                name: 'home05',
                component: () =>
                    import ('../views/mainhome/home05.vue')
            },
            {
                path: '/home06',
                name: 'home06',
                component: () =>
                    import ('../views/mainhome/home06.vue')
            }
        ]
    },
    {
        path: '/compApply',
        component: () =>
            import ('../views/comphome/compApply.vue'),
    },
    {
        path: '/compmain',
        component: () =>
            import ('../views/comphome/compmain.vue'),
    },
    {
        path: '/compTeacher',
        component: () =>
            import ('../views/comphome/compTeacher.vue'),
    },
    {
        path: '/login',
        component: () =>
            import ('../views/Login.vue'),
    },
    {
        path: '/userhome',
        component: () =>
            import ('../views/user/userhome.vue'),
        children: [{
                path: '/usermessage',
                name: 'usermessage',
                component: () =>
                    import ('../views/user/usermessage.vue'),
                meta: { comp: "/usermessage", name: "个人信息" }
            },
            {
                path: '/joincomp',
                name: 'joincomp',
                component: () =>
                    import ('../views/user/joincomp.vue'),
                meta: { comp: "/joincomp", name: "比赛参加情况" }
            },
            {
                path: '/honor',
                name: 'honor',
                component: () =>
                    import ('../views/user/honor.vue'),
                meta: { comp: "/honor", name: "获奖经历" }
            }
        ]
    },
    {
        path: '/home',
        name: 'Home',
        component: () =>
            import ('../views/home/Home.vue'),
        children: [{
                path: '/selstu',
                name: 'selstu',
                component: () =>
                    import ('../views/home/SelStu.vue'),
                meta: { comp: "/selstu", pathname: "学生管理", name: "学生信息查询" }
            },
            {
                path: '/SelTeacher',
                name: 'SelTeacher',
                component: () =>
                    import ('../views/home/SelTeacher.vue'),
                meta: { comp: "/SelTeacher", pathname: "指导老师管理", name: "老师信息管理" }
            },
            {
                path: '/compMang',
                name: 'compMang',
                component: () =>
                    import ('../views/home/compMang.vue'),
                meta: { comp: "/compMang", pathname: "比赛管理", name: "比赛信息管理" }
            },
            {
                path: '/CompPut',
                name: 'CompPut',
                component: () =>
                    import ('../views/home/CompPut.vue'),
                meta: { comp: "/CompPut", pathname: "比赛管理", name: "发布新比赛" }
            },
            {
                path: '/SelFile',
                name: 'SelFile',
                component: () =>
                    import ('../views/home/SelFile.vue'),
                meta: { comp: "/SelFile", pathname: "上传附件管理", name: "竞赛附件查询" }
            },
            {
                path: '/notice',
                name: 'notice',
                component: () =>
                    import ('../views/home/Notice.vue'),
                meta: { comp: "/notice", pathname: "获奖公告管理", name: "获奖附件管理与发布" }
            },
            {
                path: '/priceComp',
                name: 'priceComp',
                component: () =>
                    import ('../views/home/priceComp.vue'),
                meta: { comp: "/priceComp", pathname: "竞赛队伍和成果", name: "竞赛队伍评分评奖" }
            },
            {
                path: '/teamMang',
                name: 'teamMang',
                component: () =>
                    import ('../views/home/teamMang.vue'),
                meta: { comp: "/teamMang", pathname: "竞赛队伍和成果", name: "竞赛队伍信息管理" }
            },

        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
export default router