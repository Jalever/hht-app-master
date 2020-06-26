<template>
  <div class="course-index-wrapper iphonex-bd-bottom">
    <div
      class="loadingding center"
      v-show="isLoading"
    >
      <van-loading
        size="30px"
        color="#ff6666"
        vertical
      >加载中</van-loading>
    </div>

    <div class="course-index-content">
      <div
        class="course-user-top"
        v-if="isDeviseText"
      >
        <p>绑定故事机开机，即可播放今日课程哦！</p>
        <span @click="deviseText()"><img src="../../assets/image/course/icon_popup_close@2x.png" /></span>
      </div>
      <div
        class="course-user-day course-user-day-top"
        v-if="isShowCourseUserDay"
      >
        <div class="course-day-title">
          <p>今日课表</p>
          <span
            @click="onShowMore"
            v-if="userList.length != 0"
          >
            <i>查看更多</i>
            <van-icon name="arrow" />
          </span>
        </div>
        <div
          class="course-list"
          :class="{paddingBottom21: isShowPaddingBottom}"
        >
          <today-course
            :isShow="isShow"
            :courseData="userList"
            :eduData="isShowSmartCourse"
            margin-left="12"
            margin-right="12"
          >
            <div
              class="more-img"
              v-if="userList.length != 0"
            >
              <img
                src="../../assets/image/course/icon_device_spreadoutblue@2x.png"
                @click="onShowMore"
              />
            </div>
          </today-course>
        </div>
      </div>
      <div class="course-user-all">
        <div class="course-day-title">
          <p>已报名课程</p>
        </div>
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
          v-if="isShowAddCourseBtn"
        >
          <p>没有正在学习课程噢，快去添加吧～</p>
          <span @click="onAddCourse">添加课程</span>
        </div>
        <v-card-list
          v-else
          :status="status"
          :audioData="userList"
          :isLearning="learning"
          :isShowSmartCourse="isShowSmartCourse"
        ></v-card-list>
      </div>
    </div>
  </div>
</template>

<script>
import * as CONSTANTS from '@/constants/index'
import Header from '@/components/Header.vue'
import TodayCourse from '@/views/Course/TodayCourse.vue'
import CradList from '@/components/CardList.vue'
import PullDown from '@/components/Loadmore/PullDown.vue'

export default {
  data () {
    let status = CONSTANTS.STATUS_COURSE_LEARNING
    return {
      isLoading: false,
      courseTab: 1,
      courseUserTab: 1,
      lsit: [],
      userList: [],
      learning: true,
      isShowSmartCourse: false,
      status,
      isShow: true,
      babyid: 0,
      isDeviseText: true,
      signupBabyId: null,
    }
  },
  computed: {
    isShowCourseUserDay () {
      if (this.isShowSmartCourse) return true
      return this.userList.length
    },
    isShowPaddingBottom () {
      let len = this.userList.length;
      return !len && this.isShowSmartCourse;
    },
    isShowAddCourseBtn () {
      return this.userList.length == 0 && !this.isShowSmartCourse;
    }
  },
  async created () {
    this.babyid = localStorage.getItem('courseBaby')
    await this.getSignupTime()
    await this.getCourseAll()
  },
  activated () {
    this.getCourseAll()
  },
  mounted () { },
  methods: {
    onLoad () {
      location.reload()
    },
    onAddCourse () {
      // this.$toast('success')
      this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT, {
        path: '/course/smart-course',
      })
    },
    deviseText () {
      this.isDeviseText = !this.isDeviseText
    },
    // 获取'智慧早教'报名时间
    async getSignupTime () {
      try {
        const curUserId = window.localStorage.getItem(
          CONSTANTS.LOCALSTORAGE_COURSEBABY
        )
        const cid = localStorage.getItem('cid')
        const { data } = await this.$axios.userApplyTime(cid)
        if (!data.success) throw new Error(data.info)
        const { babyId } = data.data
        this.signupBabyId = babyId

        if (curUserId * 1 === babyId * 1) this.isShowSmartCourse = true
        this.$store.dispatch('setEduFlag', true)
      } catch (err) {
        this.isShowSmartCourse = false //该用户没有任何一个宝宝报名智慧早教
        this.$store.dispatch('setEduFlag', false)
        console.log(err)
      }
    },
    async getCourseAll () {
      await this.getAsyncCoursePackage()
      await this.getAsyncUserCourse()
    },
    async getAsyncCoursePackage () {
      try {
        this.isLoading = true;
        const { data } = await this.$axios.getCoursePack(this.babyid)
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        this.lsit = resData
        this.isLoading = false
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },
    async getAsyncUserCourse () {
      try {
        this.isLoading = true;
        const { data } = await this.$axios.getUserCourse(this.babyid)
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        this.$store.dispatch('setUserCourse', resData)

        this.userList = resData
        this.isLoading = false
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },
    courseTabCLick (index) {
      this.courseUserTab = index
      if (index == 2) {
        this.status = CONSTANTS.STATUS_COURSE_FINISHED
      } else {
        this.status = CONSTANTS.STATUS_COURSE_LEARNING
      }
    },
    onShowMore () {
      this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT, {
        path: '/course/course-more',
      })
    },
  },
  components: {
    'v-header': Header,
    TodayCourse,
    'v-card-list': CradList,
    'v-pull-down': PullDown,
  },
}
</script>

<style lang="less" scoped>
@import "./../../assets/css/constants.less";
.course-index-wrapper {
  width: 100%;
  border-bottom: @bottom-bar-distance-disk solid transparent;
}

.content {
  width: 100%;
}

.course-user-top {
  width: 100%;
  height: 34px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-color: #fff4d0;

  p {
    margin-left: 15px;
    line-height: 13px;
    font-family: "SourceHanSansCN-Normal";
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.5);
  }

  span {
    display: inline-block;
    margin-left: auto;
    width: 12px;
    height: 12px;
    margin-right: 11px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.course-user-day,
.course-user-all {
  width: calc(100% - 30px);
  margin: 24px auto 0 auto;

  .course-day-title {
    width: 100%;
    display: flex;
    align-items: center;
    // background-color: #fff000;
    & > p {
      line-height: 18px;
      font-family: "SourceHanSansCN-Medium";
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.8);
    }

    & > span {
      height: 12px;
      margin-left: auto;
      display: flex;
      align-items: center;
      // background-color: #ff0000;
      & > i:first-of-type {
        line-height: 12px;
        font-style: normal;
        font-family: "SourceHanSansCN-Regular";
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: rgba(0, 0, 0, 0.5);
      }

      & > i:nth-of-type(2) {
        width: 11px;
        height: 10px;
        font-size: 12px !important;
        line-height: 12px !important;
        color: rgba(0, 0, 0, 0.5) !important;
      }
    }
  }
}

.course-user-tab {
  height: 15px;
  line-height: 15px;
  margin-top: 24px;
  display: flex;

  p {
    display: inline-block;
    text-align: center;
    height: 15px;
    line-height: 15px;
    font-family: "SourceHanSansCN-Regular";
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.3);
  }

  & > p:first-of-type {
    margin-right: 38px;
  }
}

.course-user-tab p.tabActive {
  height: 15px;
  line-height: 15px;
  font-family: "SourceHanSansCN-Regular";
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
  padding-top: 2px;
}

.course-user-day-top {
  margin-top: 18px;
}

.more-img {
  padding: 16px 0;
  text-align: center;
  img {
    display: inline-block;
    width: 13px;
    height: 13px;
    margin: 0 auto;
  }
}
.paddingBottom21 {
  padding-bottom: 21px;
}
</style>
