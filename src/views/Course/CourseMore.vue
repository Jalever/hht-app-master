<template>
  <div class="app">
    <div
      class="loadingding center"
      v-show="!isLoading"
    >
      <van-loading
        size="30px"
        color="#ff6666"
        vertical
      >加载中</van-loading>
    </div>
    <div
      class="content"
      v-show="isLoading"
    >
      <div class="course-data">
        <!-- <div class="header"></div> -->
        <calendar-comp></calendar-comp>
      </div>
      <div class="course-list mbot">
        <today-course
          :isShow="isShow"
          :courseData="userCourseList"
          :eduData="isShowSmartCourse"
          v-if="userCourseList.lenght != 0"
        ></today-course>
        <div
          class="empty"
          v-else
        >
          <van-empty
            class="custom-image"
            :image="emptyImg"
            description="没有学习课程"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CalendarComp from '@/views/Course/Calendar.vue'
import TodayCourse from '@/views/Course/TodayCourse.vue'
import HeaderIcon from '@/components/HeaderIcon.vue'
import * as CONSTANTS from '@/constants/index'
export default {
  data () {
    return {
      isLoading: true,
      emptyImg: require('@/assets/image/course/qsy@2x.png'),
      isShow: false,
      userCourseList: [],
      isShowSmartCourse: false,
    }
  },
  computed: {},
  async created () {
    await this.getAsyncUserCourse()
    await this.getSignupTime()
  },
  components: {
    CalendarComp,
    TodayCourse,
    'v-header-icon': HeaderIcon,
  },
  methods: {
    async getAsyncUserCourse () {
      try {
        const id = window.localStorage.getItem('courseBaby')
        const { data } = await this.$axios.getUserCourse(id)
        if (!data.success) throw new Error(data.info)
        this.userCourseList = data.data
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },
    // 获取报名时间
    async getSignupTime () {
      try {
        const curUserId = window.localStorage.getItem(
          CONSTANTS.LOCALSTORAGE_COURSEBABY
        )
        const cid = localStorage.getItem('cid')
        const { data } = await this.$axios.userApplyTime(cid)
        if (!data.success) throw new Error(data.info)
        const { babyId } = data.data

        if (curUserId * 1 === babyId * 1) this.isShowSmartCourse = true
      } catch (err) {
        this.isShowSmartCourse = false
        console.log(err)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 182px;
  background: url(../../assets/image/rli@2x.png) no-repeat;
  background-size: contain;
  position: relative;
  background-color: #ff9f80;
}
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
.van-empty__description {
  margin-top: 0;
}
.mbot {
  margin-bottom: 40px;
}
</style>
