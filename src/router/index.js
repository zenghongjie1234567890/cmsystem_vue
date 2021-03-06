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
                meta: { comp: "/usermessage", name: "????????????" }
            },
            {
                path: '/joincomp',
                name: 'joincomp',
                component: () =>
                    import ('../views/user/joincomp.vue'),
                meta: { comp: "/joincomp", name: "??????????????????" }
            },
            {
                path: '/honor',
                name: 'honor',
                component: () =>
                    import ('../views/user/honor.vue'),
                meta: { comp: "/honor", name: "????????????" }
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
                meta: { comp: "/selstu", pathname: "????????????", name: "??????????????????" }
            },
            {
                path: '/SelTeacher',
                name: 'SelTeacher',
                component: () =>
                    import ('../views/home/SelTeacher.vue'),
                meta: { comp: "/SelTeacher", pathname: "??????????????????", name: "??????????????????" }
            },
            {
                path: '/compMang',
                name: 'compMang',
                component: () =>
                    import ('../views/home/compMang.vue'),
                meta: { comp: "/compMang", pathname: "????????????", name: "??????????????????" }
            },
            {
                path: '/CompPut',
                name: 'CompPut',
                component: () =>
                    import ('../views/home/CompPut.vue'),
                meta: { comp: "/CompPut", pathname: "????????????", name: "???????????????" }
            },
            {
                path: '/SelFile',
                name: 'SelFile',
                component: () =>
                    import ('../views/home/SelFile.vue'),
                meta: { comp: "/SelFile", pathname: "??????????????????", name: "??????????????????" }
            },
            {
                path: '/notice',
                name: 'notice',
                component: () =>
                    import ('../views/home/Notice.vue'),
                meta: { comp: "/notice", pathname: "??????????????????", name: "???????????????????????????" }
            },
            {
                path: '/priceComp',
                name: 'priceComp',
                component: () =>
                    import ('../views/home/priceComp.vue'),
                meta: { comp: "/priceComp", pathname: "?????????????????????", name: "????????????????????????" }
            },
            {
                path: '/teamMang',
                name: 'teamMang',
                component: () =>
                    import ('../views/home/teamMang.vue'),
                meta: { comp: "/teamMang", pathname: "?????????????????????", name: "????????????????????????" }
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