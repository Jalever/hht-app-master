import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      //首页
      path: '/',
      name: 'index',
      component: () =>
        import(/* webpackChunkName: "home" */ '@/views/Course/Index.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      //排行榜
      path: '/ranking',
      name: 'ranking',
      component: () =>
        import(/* webpackChunkName: "ranking" */ '@/views/Home/Ranking.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      //报告
      path: '/report',
      name: 'report',
      component: () =>
        import(/* webpackChunkName: "report" */ '@/views/Home/Report.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      //登陆
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/Login/Login.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      //vip
      path: '/education',
      name: 'education',
      component: () =>
        import(/* webpackChunkName: "member" */ '@/views/Home/Education.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      //会员激活
      path: '/membership',
      name: 'membership',
      component: () =>
        import(/* webpackChunkName: "membership" */ '@/views/Home/Membership.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      //会员激活
      path: '/purchase-help',
      name: 'purchase-help',
      component: () =>
        import(/* webpackChunkName: "purchase-help" */ '@/views/Home/PurchaseHelp.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      //会员激活
      path: '/member-activity',
      name: 'member-activity',
      component: () =>
        import(/* webpackChunkName: "member-activity" */ '@/views/Home/MemberActivity.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      //会员帮助
      path: '/member-help',
      name: 'member-help',
      component: () =>
        import(/* webpackChunkName: "member-help" */ '@/views/Home/MemberHelp.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      //会员权益
      path: '/member-equity',
      name: 'member-equity',
      component: () =>
        import(/* webpackChunkName: "member-equity" */ '@/views/Home/MemberEquity.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      //会员权益
      path: '/apply',
      name: 'apply',
      component: () =>
        import(/* webpackChunkName: "member-equity" */ '@/views/Home/Apply.vue'),
      meta: {
        keepAlive: false,
      },
    },
    {
      //专享内容
      path: '/more',
      name: 'more',
      component: () =>
        import(/* webpackChunkName: "more" */ '@/views/Home/more.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      //首页
      path: '/course/index',
      name: 'course/index',
      component: () =>
        import(/* webpackChunkName: "home" */ '@/views/Course/Index.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      //详情
      path: '/course/details',
      name: 'course/details',
      component: () =>
        import(/* webpackChunkName: "details" */ '@/views/Course/Details.vue'),
      meta: {
        keepAlive: false,
      },
    },
    {
      //报名详情
      path: '/course/add-course',
      name: 'course/add-course',
      component: () =>
        import(/* webpackChunkName: "apply" */ '@/views/Course/AddCourse.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      //报名详情
      path: '/course/apply',
      name: 'course/apply',
      component: () =>
        import(/* webpackChunkName: "apply" */ '@/views/Course/Apply.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      //今日课程更多
      path: '/course/course-more',
      name: 'course/courseMore',
      component: () =>
        import(/* webpackChunkName: "apply" */ '@/views/Course/CourseMore.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      //学习中详情
      path: '/course/learning',
      name: 'course/learning',
      component: () =>
        import(/* webpackChunkName: "apply" */ '@/views/Course/Learning.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      //学习中详情
      path: '/error',
      name: 'error',
      component: () =>
        import(/* webpackChunkName: "apply" */ '@/views/Common/Error.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      path: '*',
      redirect: '/',
    }, //路由按顺序从上到下，依次匹配。最后一个*能匹配全部，然后重定向到主页面
  ],
})
