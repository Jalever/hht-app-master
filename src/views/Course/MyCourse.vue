<template>
  <div class="course-index-wrapper iphonex-bd-bottom">
    <div class="loadingding center" v-show="!isLoading">
      <van-loading size="30px" color="#ff6666" vertical>加载中</van-loading>
    </div>

    <div class="course-index-content">
      <div class="course-user-top" @click="deviseText()" v-if="isDeviseText">
        <p>绑定故事机开机，即可播放今日课程哦！</p>
        <span
          ><img src="../../assets/image/course/icon_popup_close@2x.png"
        /></span>
      </div>
      <div class="course-user-day" v-if="isShowCourseUserDay">
        <div class="course-day-title">
          <p>今日学习</p>
          <span @click="onShowMore" v-if="userList.length != 0">
            <i>查看更多</i>
            <van-icon name="arrow" />
          </span>
        </div>
        <div class="course-list">
          <v-course-list
            :isShow="isShow"
            :courseData="userList"
            :eduData="isShowSmartCourse"
          >
            <div class="more-img" v-if="userList.length != 0">
              <img
                src="../../assets/image/course/icon_device_spreadoutblue@2x.png"
                @click="onShowMore"
              />
            </div>
          </v-course-list>
        </div>
      </div>
      <div class="course-user-all">
        <div class="course-day-title"><p>已报名课程</p></div>
        <div class="course-user-tab">
          <p
            :class="courseUserTab == 1 ? 'tabActive' : ''"
            @click="courseTabCLick(1)"
          >
            学习中
          </p>
          <p
            :class="courseUserTab == 2 ? 'tabActive' : ''"
            @click="courseTabCLick(2)"
          >
            已完成
          </p>
        </div>
        <div
          class="course-user-null"
          v-if="userList.length == 0 && !isShowSmartCourse"
        >
          <p>没有正在学习课程噢，快去添加吧～</p>
          <span @click="onAddCourse">添加课程</span>
        </div>
        <div class="course-user-list" v-else>
          <v-card-list
            :status="status"
            :audioData="userList"
            :isLearning="learning"
          ></v-card-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as CONSTANTS from '@/constants/index'
import Header from '@/components/Header.vue'
import CourseList from '@/components/CourseList.vue'
import CradList from '@/components/CardList.vue'
import PullDown from '@/components/Loadmore/PullDown.vue'

export default {
  data() {
    return {
      isLoading: false,
      courseTab: 1,
      courseUserTab: 1,
      lsit: [],
      userList: [],
      learning: true,
      isShowSmartCourse: false,
      status: 0,
      isShow: true,
      babyid: 0,
      isDeviseText: true,
      signupBabyId: null,
    }
  },
  computed: {
    isShowCourseUserDay() {
      if (this.isShowSmartCourse) return true
      return this.userList.length
    },
  },
  created() {
    this.babyid = localStorage.getItem('courseBaby')
    this.getSignupTime()
    this.getCourseAll()
  },
  activated() {
    this.getCourseAll()
  },
  mounted() {},
  methods: {
    onLoad() {
      location.reload()
    },
    onAddCourse() {
      // this.$toast('success')
      this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT, {
        path: '/course/smart-course',
      })
    },
    deviseText() {
      this.isDeviseText = !this.isDeviseText
    },
    // 获取报名时间
    async getSignupTime() {
      try {
        const cid = localStorage.getItem('cid')
        const { data } = await this.$axios.userApplyTime(cid)
        if (!data.success) throw new Error(data.info)
        const { babyId } = data.data
        this.signupBabyId = babyId

        this.isShowSmartCourse = true
        this.$store.dispatch('setEduFlag', true)
      } catch (err) {
        this.isShowSmartCourse = false
        this.$store.dispatch('setEduFlag', false)
        console.log(err)
      }
    },
    async getCourseAll() {
      await this.getAsyncCoursePackage()
      await this.getAsyncUserCourse()
    },
    async getAsyncCoursePackage() {
      try {
        const { data } = await this.$axios.getCoursePack(this.babyid)
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        this.lsit = resData
        this.isLoading = true
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },
    async getAsyncUserCourse() {
      try {
        const { data } = await this.$axios.getUserCourse(this.babyid)
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        this.$store.dispatch('setUserCourse', resData)

        this.userList = resData
        this.isLoading = true
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },
    courseTabCLick(index) {
      this.courseUserTab = index
      if (index == 2) {
        this.status = 30
      } else {
        this.status = 0
      }
    },
    onShowMore() {
      this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT, {
        path: '/course/course-more',
      })
    },
  },
  components: {
    'v-header': Header,
    'v-course-list': CourseList,
    'v-card-list': CradList,
    'v-pull-down': PullDown,
  },
}
</script>

<style lang="less" scoped>
@import './../../assets/css/constants.less';
.course-index-wrapper {
  width: 100%;
  border-bottom: @bottom-bar-distance-disk solid transparent;
}

.content {
  width: 100%;
}

.course-user-top {
  width: 375px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff4d0;

  p {
    width: 375px;
    height: 34px;
    line-height: 34px;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.5);
    padding: 0 15px;

    font-family: 'SourceHanSansCN-Normal';
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.5);
  }

  span {
    display: inline-block;
    margin-left: auto;
    width: 16px;
    height: 16px;
    margin-right: 16px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.course-user-day,
.course-user-all {
  width: 345px;
  margin: 20px auto;
  margin-bottom: 0;

  .course-day-title {
    width: 100%;
    display: flex;
    align-items: center;
    font-family: 'SourceHanSansCN-Medium';
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.8);

    span {
      margin-left: auto;

      display: flex;
      align-items: center;
      & > i:first-of-type {
        font-style: normal;
        font-family: 'SourceHanSansCN-Regular';
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: rgba(0, 0, 0, 0.5);
      }

      & > i:nth-of-type(2) {
        width: 11px;
        height: 100%;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.5) !important;
      }
    }
  }
}

.more-img {
  margin-top: 2px;
  text-align: center;

  img {
    display: inline-block;
    width: 13px;
    height: 13px;
    margin: 0 auto;
  }
}

.course-user-tab {
  width: 345px;
  margin: 21px auto 8px auto;
  display: flex;

  p {
    display: inline-block;
    padding-right: 38px;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.3);
    text-align: center;

    span {
      width: 30px;
      height: 4px;
      display: block;
      background-color: #ff6666;
      border-radius: 2px;
      margin: 0 auto;
    }
  }
}

.course-user-tab p.tabActive {
  color: rgba(0, 0, 0, 0.8);
  font-family: 'SourceHanSansCN-Regular';
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: rgba(0, 0, 0, 0.8);
}

.course-user-null {
  width: 100%;
  margin: 0 auto;
  margin-top: 60px;
  margin-bottom: 60px;
  text-align: center;
  // background-color: #ff0000;

  p {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
  }

  span {
    margin-top: 24px;
    display: inline-block;
    width: 155px;
    height: 48px;
    background-image: linear-gradient(90deg, #ff6666 0%, #ff9043 100%);
    border-radius: 24px;
    font-size: 17px;
    color: #ffffff;
    line-height: 48px;
  }
}

.course-list {
  box-shadow: 0px 0px 8px 3px rgba(76, 76, 76, 0.06);
  border-radius: 8px;
  margin-top: 20px;
}
</style>
