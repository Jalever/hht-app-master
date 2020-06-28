<template>
  <div class="details-wrapper">
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
      class="details-content"
      v-show="isLoading"
    >
      <div class="course-box-top">
        <img :src="detailsList.coverImage" />
      </div>
      <div class="course-card-details">
        <div class="course-card">
          <div class="course-card-box">
            <div class="card-name">
              <p>{{ detailsList.name }}</p>
            </div>
            <div class="card-time">
              <p>
                <img src="../../assets/image/course/renshu@2x.png" />
                适合{{ detailsList.suitedMinAge }}-{{
                  detailsList.suitedMaxAge
                }}岁
              </p>
              <p>
                <img src="../../assets/image/course/time@2x.png" />
                共 {{ detailsList.classHour }} 课时
              </p>
              <p>
                <img src="../../assets/image/course/xuexi@2x.png" />
                {{ participants }}人学习
              </p>
            </div>
            <div class="card-lable">
              <span
                v-for="opt in detailsList.labels"
                :key="opt.name"
              >{{
                opt.name
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="details-tab">
        <div class="details-tab-itme">
          <p
            @click="detalsTab(1)"
            :class="tabAction == 1 ? 'tabAction' : ''"
          >
            课程简介
            <span></span>
          </p>
          <p
            @click="detalsTab(2)"
            :class="tabAction == 2 ? 'tabAction' : ''"
          >
            课程计划
            <span></span>
          </p>
        </div>
        <div class="tab-content">
          <v-details-intro
            v-if="tabAction == 1"
            :list="detailsList"
          ></v-details-intro>
          <v-details-list
            v-if="tabAction == 2"
            :data="detailsList.courseList"
          ></v-details-list>
        </div>
      </div>
      <div
        class="details-btn"
        @click="onAddCourse"
        v-if="detailsList.learningState == 10"
      >
        <p>会员免费加入</p>
      </div>

      <fixed-button
        @clk="onDelCourse"
        text="从我的课程中删除"
        v-if="detailsList.learningState == 20"
      ></fixed-button>
    </div>
  </div>
</template>

<script>
import * as CONSTANTS from '@/constants/index'
import Header from '@/components/Header.vue'
import DetailsIntro from '@/components/DetailsIntro.vue'
import DetailsList from '@/components/DetailsList.vue'
import { getQueryStringValue } from '@/common/util'
import FixedButton from '@/components/FixedButton'
import { getCookies, setCookies } from '@/common/cookie'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      isLoading: false,
      title: '课程详情',
      tabAction: 1,
      detailsList: [],
      babyid: 0,
      babyList: [], //宝宝list
    }
  },
  computed: {
    ...mapState(['memberInfoVip', 'userCourseList', 'system']),
    //学习人数: 初始值+课程实际报名人数*3
    participants () {
      const list = this.detailsList
      return list.participantOpsCount + list.particiPants
    },
    //当前课程包的课程
    courseList () {
      if (!this.detailsList && !this.detailsList.courseList) return []
      return this.detailsList.courseList
    },
    //课程包ID
    coursePackageId () {
      let isDev = window.location.href.indexOf('localhost:') > -1
      if (isDev) return this.$route.query.id
      return getQueryStringValue('id')
    },
  },
  created () {
    this.babyid = localStorage.getItem('courseBaby')
    this.getAsyncCourseDetails()
  },
  methods: {
    detalsTab (index) {
      this.tabAction = index
    },
    //获取该用户所有的宝宝list
    async getBabyList () {
      try {
        const { data } = await this.$axios.getBabyList()
        if (!data.success) throw new Error(data.info)
        this.babyList = data.data
      } catch (err) {
        console.log(err)
      }
    },
    //添加课程
    async onAddCourse () {
      const signupCourseLen = this.courseList.length
      const willCourse = this.userCourseList.filter(
        (item) => item.status * 1 !== 20
      )
      const willCourseLen = willCourse.length
      const courseLength = signupCourseLen * 1 + willCourseLen * 1

      // 添加课程限制
      if (courseLength > 10) return this.showOverloadCourseModal()

      if (this.memberInfoVip == 0) {
        this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT, { path: '/' })
        return this.$toast('请先开通会员')
      }

      // 验证宝宝id是否有效
      await this.getBabyList()
      if (!this.babyList.length) return this.showLackBabyModal()
      this.$toast.loading({ message: '报名中...', forbidClick: true })

      try {
        const id = this.coursePackageId
        const { data } = await this.$axios.courseApply(id, this.babyid)
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        this.$toast('报名成功')

        this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT, {
          path: '/course/apply',
        })
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },
    async showLackBabyModal () {
      const dialog = await this.$createDialog(
        () => import('@/views/Course/LackBabyModal.vue'),
        {
          destroyOnClose: true,
          on: {
            close: (v) => {
              dialog.close()
              if (this.system == 'ios')
                return window.webkit.messageHandlers.addBabys.postMessage(null)
              else return window.android.playCourse('addBabys', '')
            },
          },
        }
      )
    },
    // 课程包详情
    async getAsyncCourseDetails () {
      try {
        const id = this.coursePackageId
        const { data } = await this.$axios.getCourseDetails(id, this.babyid)
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        this.detailsList = resData
        this.isLoading = true
        this.$store.dispatch('setCourseDetails', resData)
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },
    onDelCourse () {
      this.$dialog
        .confirm({
          title: '删除课程',
          message: '确认要取消该课程的学习吗？',
          confirmButtonText: '确定',
        })
        .then(() => {
          // on confirm
          this.$toast.loading({
            message: '删除中...',
            forbidClick: true,
          })

          const id = this.coursePackageId
          const { courseList } = this.detailsList
          const ids = courseList.map((i) => i.id)

          // ------------

          this.$axios
            .getCourseDel(id, this.babyid)
            .then((res) => {
              if (res.data.code == 1) {
                this.$toast.success('删除成功')

                this.delCourseCookies(ids)

                this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT_HOME, {
                  path: '/course/smart-course',
                })
              }
            })
            .catch((err) => {
              console.error(err)
              this.$toast.fail(err)
            })
        })
        .catch(() => { })
    },
    delCourseCookies (ids = []) {
      const curUserId = window.localStorage.getItem(
        CONSTANTS.LOCALSTORAGE_COURSEBABY
      )
      let schoolTimeCookie = getCookies(curUserId)
      if (!schoolTimeCookie) return
      schoolTimeCookie = schoolTimeCookie && JSON.parse(schoolTimeCookie)

      for (let item in schoolTimeCookie) {
        let isExist = ids.find((id) => id * 1 === item * 1)
        if (isExist) delete schoolTimeCookie[item]
      }

      setCookies(curUserId, JSON.stringify(schoolTimeCookie))
    },
    //添加课程限制 Modal
    async showOverloadCourseModal () {
      const dialog = await this.$createDialog(
        () => import('@/views/Course/OverloadCourseModal.vue'),
        {
          destroyOnClose: true,
          on: {
            close: (v) => {
              dialog.close()
            },
          },
        }
      )
    },
  },
  components: {
    'v-header': Header,
    'v-details-intro': DetailsIntro,
    'v-details-list': DetailsList,
    FixedButton,
  },
}
</script>

<style lang="less" scoped>
@import "./../../assets/css/constants.less";
.details-wrapper {
  border-bottom: @fixed-bottom-bar solid transparent;
}
.details-content {
  width: 100%;
  background: #fafafa;
}

.course-box-top {
  width: 100%;
  height: 187px;

  img {
    width: 100%;
    height: 100%;
  }
}

.course-card-details {
  width: 100%;
  background: #fafafa;
  padding-top: 21px;

  .course-card {
    width: 349px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: relative;
  }

  .course-card-box {
    width: 100%;
    margin: 0 auto;
    position: relative;

    .card-name {
      line-height: 20px;
      font-family: "SourceHanSansCN-Medium";
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.8);
    }

    .card-name-subhead {
      font-size: 15px;
      color: rgba(0, 0, 0, 0.5);
    }

    .card-lable {
      display: flex;
      margin-top: 13px;

      span {
        display: inline-block;
        background-color: rgba(255, 102, 102, 0.08);
        border-radius: 12px;
        padding: 4px 8px;
        margin-right: 11px;
        line-height: 13px;
        vertical-align: middle;
        font-family: "SourceHanSansCN-Normal";
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ff6666;
      }
    }

    .card-time {
      width: 100%;
      margin-top: 13px;
      display: flex;
      align-items: center;

      p {
        display: flex;
        align-items: center;

        line-height: 14px;
        font-family: "SourceHanSansCN-Normal";
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: rgba(0, 0, 0, 0.5);

        img {
          width: 15px;
          height: 15px;
          margin-right: 6px;
        }

        &:nth-of-type(2) {
          margin-left: 16px;
        }

        &:nth-of-type(3) {
          margin-left: 16px;
        }
      }
    }
  }
}

.details-tab {
  width: 100%;
  padding-top: 50px;
  background: #fafafa;

  .details-tab-itme {
    width: 100%;
    display: flex;

    justify-content: center;
    align-items: center;
    font-family: "SourceHanSansCN-Bold";
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;

    p {
      line-height: 16px;
      font-family: SourceHanSansCN-Medium;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      align-items: center;
      & > span {
        margin-top: 8px;
      }
    }
    & > p:first-of-type {
      margin-right: 85px;
    }
  }
}

.details-tab-itme p.tabAction {
  // color: rgba(0, 0, 0, 0.8);
  line-height: 16px;
  font-family: SourceHanSansCN-Medium;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff6666;

  & > span {
    margin-top: 8px;
    display: inline-block;
    width: 22px;
    height: 4px;
    background-color: #ff6666;
    border-radius: 2px;
  }
}

.tab-content {
  background-color: #fff;
  margin-bottom: 10px;
}

.details-btn {
  width: 100%;
  height: 84px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  text-align: center;
  margin-top: 28px;
  padding-top: 14px;
  border-top: solid 1px rgba(0, 0, 0, 0.08);
  background-color: #fff;

  p {
    width: 345px;
    height: 48px;
    line-height: 48px;
    background-image: linear-gradient(90deg, #ff6666 0%, #ff9043 100%);
    border-radius: 24px;
    font-size: 17px;
    color: #ffffff;
    margin: 0 auto;
  }
}

.details-btn1 {
  width: 100%;
  height: 84px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  text-align: center;
  // margin-top: 28px;
  padding-top: 14px;
  // margin-bottom: 34px;
  background-color: #fff;
  border-top: solid 1px rgba(0, 0, 0, 0.08);

  p {
    width: 345px;
    height: 48px;
    line-height: 48px;
    background: #fff;
    border-radius: 24px;
    border: solid 1px rgba(0, 0, 0, 0.4);
    font-size: 17px;
    color: rgba(0, 0, 0, 0.6);
    margin: 0 auto;
  }
}

.mbot {
  margin-bottom: 40px;
}

.header {
  width: 100%;
  height: 44px;
  line-height: 44px;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;

  p {
    width: 100%;
    height: 44px;
    background: #006699;
    line-height: 44px;
  }
}
</style>
