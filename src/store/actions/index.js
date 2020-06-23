import * as types from "@/store/mutation-type.js";
import $axios from '@/api/index.js';
import router from '@/router/index';
import ROUTEACTIONS from "./route";
import * as CONSTANTS from "@/constants/index";


import {
  Toast,
} from 'vant'

export default {
	...ROUTEACTIONS,
	/*
	 * 获取用户信息
	 * */
	setUserInfoAction({
		commit
	}, data) {
		$axios
			.getUserVip()
			.then(res => {
				// console.log("会员信息", res);
				commit(types.SET_MEMBERINFO, res.data.data);
			})
			.catch(err => console.error(err));
	},
	/*
	 *获取课程id
	 * */
	getUserActivityInfo({
		commit
	}, data) {
		$axios
			.userActivityInfo()
			.then(res => {
				localStorage.setItem("cid", res.data.data.id);
				commit(types.SET_USERCID, res.data.data.id);
			})
			.catch(err => console.error(err));
	},
	/*
	 *获取vip权益介绍
	 * */
	setEquityAction({
		commit
	}, data) {
		$axios
			.getVipEquity(data)
			.then(res => {
				commit(types.SET_EQUITYLIST, res.data.data.list);
			})
			.catch(err => console.error(err));
	},
	/**
	 * ios: 获取宝贝信息
	 * */
	setBabyInfoAction({ commit, dispatch }, data) {
		try {
			window.webkit.messageHandlers.getUserInfo.postMessage(null);
			window.webkit.messageHandlers.getCurrentBaby.postMessage(null);
			window['getUserInfo'] = res => {
				if (res.uid == "") return router.push({ name: 'course-login' });
				localStorage.setItem("user", res.uid)
				commit(types.SET_USERINFO, res);
				$axios
					.getBabyList(res.uid)
					.then(res => {
						commit(types.SET_BABYINFO, res.data.data);
					})
					.catch(err => console.error(err));
			};
			window['getCurrentBaby'] = res => {
				localStorage.setItem("courseBaby", res.babyId)
			}
		} catch (e) {
			console.log("请先登录app")
		}
	},
	// android
	setBabyInfoADAction({
		commit, dispatch
	}, data) {
		try {
			let user = window.android.getUserInfo();
			let babyid = window.android.getCurrentBaby();
			console.warn('user');
			console.log(user);
			console.log('\n');
			user = JSON.parse(user);
			if (user.uid == "") return router.push({ name: 'course-login' });

			let babyData = JSON.parse(babyid);
			if (Object.keys(babyData).length === 0 && babyData.constructor === Object) throw new Error('lack of babyId');
			
			localStorage.setItem("courseBaby", babyData.id)
			let userData = JSON.parse(user);
			localStorage.setItem("user", userData.id)
			commit(types.SET_USERINFO, JSON.parse(user));
			$axios
				.getBabyList(userData.id)
				.then(res => {
					commit(types.SET_BABYINFO, res.data.data);
				})
				.catch(err => console.error(err));
		} catch (e) {
			//TODO handle the exception
		}
	},
	/*
	 *设置宝宝信息
	 */
	defaultBaby({
		commit
	}, data) {
		commit(types.SET_USERBABY, data)
	},
	/**
	 * 获取系统版本
	 * */
	setSystemAction({
		commit
	}, data) {
		commit(types.SET_SYSTEM, data)
	},
	/*
	 *设置课程包详情
	 */
	setCourseDetails({
		commit
	}, data) {
		commit(types.SET_COURSEDETAILS, data);
	},
	/*
	 *设置用户课程
	 */
	setUserCourse({
		commit
	}, data) {
		// console.log(data)
		commit(types.SET_USERCOURSE, data);
	},
	setEduFlag({
		commit
	}, data) {
		commit(types.SET_ISEDU, data);
	}
};
