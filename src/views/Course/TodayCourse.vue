<template>
  <div
    class="course-list-wrapper"
    :style="{'margin-left': marginLeft+'px','margin-right': marginRight+'px',}"
  >
    <div
      class="empty"
      v-if="courseListWith.length == 0 && !eduData"
    >
      <van-empty
        class="custom-image"
        :image="emptyImg"
        description="你今天没有课程安排哦～"
      />
    </div>
    <div
      class="list"
      v-else
    >
      <ul>
        <li v-if="eduData">
          <div class="list-name">
            <p>智慧早教课程</p>
            <p>
              第<span>{{ applyTime }}</span>天计划<rec-radius></rec-radius>约<span>30</span>分钟
            </p>
          </div>
          <div
            class="list-btn"
            @click="onSchoolTime('', 1)"
          >
            <span>上课<i v-if="isShowReddot"></i></span>
          </div>
        </li>
        <li
          v-for="item in dataWithIndex"
          :key="item.id"
        >
          <div class="list-name">
            <p>
              {{ item.name }}
            </p>
            <p>
              第{{ item.classHoursIdx }}/<span>{{ item.classHourCount }}</span>课时<rec-radius></rec-radius><span>约{{ item.curDuration }}</span>分钟
            </p>
          </div>
          <div
            class="list-btn"
            @click="onSchoolTime(item, 0)"
          >
            <span>上课<i v-if="item.isShowReddot"></i></span>
          </div>
        </li>
      </ul>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getDayTime, computedTime } from '@/common/util'
import * as CONSTANTS from '@/constants/index'
import RecRadius from '@/components/RecRadius'
import { getCookies, setCookies, initCookies } from '@/common/cookie'
import Cookies from 'js-cookie'
export default {
  props: {
    courseData: '',
    isShow: false,
    eduData: Boolean,
    marginLeft: {
      type: [Number, String],
      default: 15
    },
    marginRight: {
      type: [Number, String],
      default: 15
    }
  },
  data () {
    return {
      emptyImg: require('@/assets/image/course/qsy@2x.png'),
      babyid: 0,
      isLockSchooltime: false,
      courseListWithCookie: [], //course data with cookie so that displaying reddot
      isShowReddot: true,
      applyTime: 0,
    }
  },
  computed: {
    ...mapState(['system']),
    courseListWith () {
      return this.courseListWithCookie.map((item) => {
        const { currentHourDuration } = item
        const curDuration = Math.ceil((currentHourDuration * 1) / 60)

        return {
          ...item,
          curDuration,
        }
      })
    },
    dataFilter: function () {
      return this.courseListWith.filter((item, index) =>
        this.isShow ? (this.eduData ? index < 2 : index < 3) : item
      )
    },
    dataWith () {
      return this.dataFilter.filter((item) => item.status * 1 !== 20)
    },
    dataWithIndex () {
      return this.dataWith.map((item) => {
        let classHoursIdx
        const list = item.classHours
        const isReadyState = list.every((val) => val.status * 1 === 0)
        const learningItem = list.find((val) => val.status * 1 === 10)

        classHoursIdx = isReadyState ? 1 : learningItem && learningItem.index
        //当有仅有一个20，其余为0的情况
        if (!isReadyState && !learningItem)
          classHoursIdx = this.getLearningItemIdx(list, 'status', 20)

        return {
          ...item,
          classHoursIdx,
        }
      })
    },
  },
  async created () {
    await this.getSumTime()
    this.babyid = localStorage.getItem('courseBaby')
  },

  mounted () { },
  watch: {
    courseData: {
      immediate: true,
      deep: true,
      handler (v) {
        const curUserId = window.localStorage.getItem(
          CONSTANTS.LOCALSTORAGE_COURSEBABY
        )
        let schoolTimeCookie = getCookies(curUserId)
        if (!schoolTimeCookie) {
          this.courseListWithCookie = this.courseData
          return setCookies(curUserId, {})
        }

        schoolTimeCookie = JSON.parse(schoolTimeCookie)
        this.isShowReddot = !schoolTimeCookie['isClickSmartCourse']
        this.courseListWithCookie = this.courseData.map((item) => {
          let isShowReddot = !schoolTimeCookie[item.id]
          return {
            ...item,
            isShowReddot,
          }
        })
      },
    },
  },
  methods: {
    async getSumTime () {
      try {
        const cid = localStorage.getItem('cid')
        const { data } = await this.$axios.userApplyTime(cid)
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        const { createTime } = resData
        this.applyTime = computedTime(createTime)
      } catch (err) {
        console.log(err)
      }
    },
    // '上课'
    async onSchoolTime (item, type) {
      this.onSetReddot(item, type)

      if (this.isLockSchooltime) return
      this.isLockSchooltime = true
      // 普通课程
      if (type == 0) {
        this.$axios
          .getCourseData(item.courseGroupId, item.id, this.babyid)
          .then((res) => {
            if (res.data.code == 1) {
              let array = {
                title: item.name,
                coursePackId: item.courseGroupId,
                courseId: item.id,
                babyId: this.babyid,
                course: [],
                classHoursIdx: item.classHoursIdx,
              }
              let audioData = res.data.data.audios
              this.setAudioData(audioData, array)
            }
          })
          .catch((err) => {
            this.isLockSchooltime = false
            console.error(err)
            this.$toast.fail(err)
          })
      } else if (type == 1) {
        // 智慧早教
        let currentTime = getDayTime()
        this.$axios
          .getDayCourse(currentTime)
          .then((res) => {
            let array = {
              title: '智慧早教第' + this.applyTime + '天',
              coursePackId: 0,
              courseId: localStorage.getItem('cid'),
              babyId: localStorage.getItem('babyId'),
              course: [],
              classHoursIdx: '',
            }
            // let array = [];
            if (res.data.code == 1) {
              let audioData = res.data.data
              this.setAudioData(audioData, array)
            } else {
              this.$toast('暂无今日早教课程')
            }
          })
          .catch((err) => {
            this.isLockSchooltime = false
            console.error(err)
            this.$toast.fail(err)
          })
      }
    },
    setAudioData (audioData, array) {
      audioData.forEach(function (data, index) {
        let obj = {
          url: data.url,
          id: data.id,
          name: data.name,
        }
        array.course.push(obj)
      })
      try {
        this.$toast('获取课程成功')
        this.isLockSchooltime = false

        if (this.system == 'ios') {
          window.webkit.messageHandlers.course_play.postMessage(array)
        } else if (this.system == 'android') {
          window.android.playCourse('course_play', JSON.stringify(array))
        }
      } catch (e) {
        this.$toast('获取课程失败')
      }
    },
    //点击设置小红点
    onSetReddot (item, isSmartCourse = 0) {
      const curUserId = window.localStorage.getItem(
        CONSTANTS.LOCALSTORAGE_COURSEBABY
      )
      let { id } = item
      if (isSmartCourse) id = 'isClickSmartCourse'
      let schoolTimeCookie = getCookies(curUserId)
      if (!schoolTimeCookie) schoolTimeCookie = initCookies(curUserId)
      schoolTimeCookie = schoolTimeCookie && JSON.parse(schoolTimeCookie)
      schoolTimeCookie = {
        ...schoolTimeCookie,
        [id]: true,
      }

      setCookies(curUserId, JSON.stringify(schoolTimeCookie))
      isSmartCourse ? (this.isShowReddot = false) : (item.isShowReddot = false)
      this.$forceUpdate()
    },
    //获取正在学习中的课时index
    getLearningItemIdx (list = [], prop, conditional) {
      let statusList = list.map((item) => item.status * 1)
      let idx = statusList.lastIndexOf(20)
      return list[idx * 1 + 1]['index']
    },
  },
  components: {
    RecRadius,
  },
}
</script>

<style lang="less" scoped>
.course-list-wrapper {
  margin: 18px 15px;
  margin-bottom: 0;
}
.list {
  width: 100%;
  ul {
    margin: 0 auto;
    li {
      margin-top: 28px;
      display: flex;
      align-items: center;
      .list-name {
        p {
          // title
          &:nth-of-type(1) {
            font-size: 16px;
            line-height: 16px;
            color: rgba(0, 0, 0, 0.8);
            font-family: "SourceHanSansCN-Medium";
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: rgba(0, 0, 0, 0.8);
            span {
              font-size: 12px;
              color: #26b8ef;
              padding-left: 10px;
            }
          }

          // 第N天计划 | 约xx分钟
          &:nth-of-type(2) {
            margin-top: 14px;
            line-height: 13px;
            font-family: "SourceHanSansCN-Regular";
            font-size: 13px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: rgba(0, 0, 0, 0.4);
          }
        }
      }

      // 上课button
      .list-btn {
        margin-left: auto;
        width: 67px;
        height: 26px;
        line-height: 26px;
        border-radius: 13px;
        border: solid 1px #ff985b;
        font-size: 15px;
        color: #ff985b;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        & > span {
          line-height: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "SourceHanSansCN-Regular";
          font-size: 15px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ff8a66;
          & > i {
            position: absolute;
            top: 0;
            right: 0;
            font-style: normal;
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #fa3a3a;
            border-radius: 50%;
          }
        }
      }
    }

    & > li:first-child {
      margin-top: 0;
    }
  }
}
</style>
