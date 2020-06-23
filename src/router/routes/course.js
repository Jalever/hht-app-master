export default [
  { //首页
    path: '/course/index',
    name: 'course/index',
    component: () => import( /* webpackChunkName: "home" */ '@/views/Course/Index.vue'),
    meta: {
      keepAlive: false,
      title: null
    },
  },
  { //智慧早教
    path: '/course/smart-course',
    name: 'course/smart-course',
    component: () => import( /* webpackChunkName: "home" */ '@/views/Course/SmartCourse.vue'),
    meta: {
      keepAlive: false,
      title: '智慧早教'
    },
  },
  { //我的课程
    path: '/course/my-course',
    name: 'course/my-course',
    component: () => import( /* webpackChunkName: "home" */ '@/views/Course/MyCourse.vue'),
    meta: {
      keepAlive: false,
      title: null
    },
  },
  { //课程包登录页面
    path: '/course-login',
    name: 'course-login',
    component: () => import( /* webpackChunkName: "login" */ '@/views/Login/CourseLogin.vue'),
    meta: {
      keepAlive: false,
      title: null
    },
  },
  { //详情
    path: '/course/details',
    name: 'course/details',
    component: () => import( /* webpackChunkName: "details" */ '@/views/Course/Details.vue'),
    meta: {
      keepAlive: false,
      title: null,
    }
  },
  { //报名详情
    path: '/course/add-course',
    name: 'course/add-course',
    component: () => import( /* webpackChunkName: "apply" */ '@/views/Course/AddCourse.vue'),
    meta: {
      keepAlive: false,
      title: null
    }
  },
  { //报名详情
    path: '/course/apply',
    name: 'course/apply',
    component: () => import( /* webpackChunkName: "apply" */ '@/views/Course/Apply.vue'),
    meta: {
      keepAlive: false,
      title: null
    }
  },
  { //今日课程更多
    path: '/course/course-more',
    name: 'course/courseMore',
    component: () => import( /* webpackChunkName: "apply" */ '@/views/Course/CourseMore.vue'),
    meta: {
      keepAlive: false,
      title: null
    }
  },
  { //学习中详情
    path: '/course/learning',
    name: 'course/learning',
    component: () => import( /* webpackChunkName: "apply" */ '@/views/Course/Learning.vue'),
    meta: {
      keepAlive: false,
      title: null
    }
  },
  { //xmly
    path: '/course/index-copy',
    name: '/course/learning',
    component: () => import( /* webpackChunkName: "apply" */ '@/views/Home/Index-copy.vue'),
    meta: {
      keepAlive: false,
      title: null
    }
  },
  {
    path: "/wisdom-course",
    name: "wisdom-course",
    component: () => import("@/views/WisdomCourse/main"),
    meta: {
      title: "智慧早教",
    },
    children: [
      {
        path: "/wisdom-course/introduction",
        name: "wisdom-course/introduction",
        component: () => import("@/views/WisdomCourse/Introduction"),
        meta: {
          title: "智慧早教",
        },
      },
      {
        path: "/wisdom-course/index",
        name: "wisdom-course/index",
        component: () => import("@/views/WisdomCourse/Index"),
        meta: {
          title: null
        },
      },
    ]
  }
]