import Vue from 'vue'
import Router from 'vue-router'
import MEMBERSHIPROUTE from "./routes/membership";
import COURSEROUTE from "./routes/course";
import { Toast } from 'vant'
Vue.use(Router)

const router = new Router({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes: [
		...MEMBERSHIPROUTE,
		...COURSEROUTE,
		
	]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title;
	if (to.meta.title === null) document.title = '\u200E';
	// Toast(`测试专用, 非BUG: ${window.location.href}`);
  next();
});

export default router;
