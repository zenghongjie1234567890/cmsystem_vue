module.exports = [{
        name: "首页跳转",
        icon: "el-icon-s-promotion",
        id: "role454",
        submenu: [{
            name: "返回主页",
            to: "/homepage"
        }, ]
    },
    {
        name: "学生管理",
        icon: "el-icon-s-check",
        id: "player",
        submenu: [{
            name: "学生信息查询",
            to: "/selstu"
        }, ]
    },
    {
        name: "指导老师管理",
        icon: "el-icon-s-custom",
        id: "role",
        submenu: [{
            name: "老师信息管理",
            to: "/SelTeacher"
        }]
    },
    {
        name: "比赛管理",
        icon: "el-icon-guide",
        id: "fellhb",
        submenu: [{
                name: "比赛信息管理",
                to: "/compMang"
            },
            {
                name: "发布新比赛",
                to: "/CompPut"
            },
        ]
    },
    {
        name: "竞赛队伍和成果",
        id: "liucunlv",
        icon: "el-icon-user",
        submenu: [{
            name: "竞赛队伍信息管理",
            to: "/teamMang"
        }, {
            name: "竞赛队伍评分评奖",
            to: "/priceComp"
        }, ]
    },
    {
        name: "获奖公告管理",
        id: "ggpmd",
        icon: "el-icon-magic-stick",
        submenu: [
            {
            name: "获奖附件管理与发布",
            to: "/notice"
        }
     ]
    },
    {
        name: "上传附件管理",
        id: "jihuoma",
        icon: "el-icon-pie-chart",
        submenu: [{
            name: "竞赛附件查询",
            to: "/SelFile"
        }, ]
    }
]