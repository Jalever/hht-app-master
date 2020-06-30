<template>
  <div class="learning-wrapper">
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
      class="learning-content"
      v-show="isLoading"
    >
      <div class="learning-top">
        <p>{{ courseData.name }}</p>
        <p>
          共 <span>{{ courseData.classHourCount }}</span> 课时<span></span>每节课约 <span>{{ courseData.avgDuration }}</span> 分钟
        </p>
        <p>艾宾浩斯曲线学习计划</p>
      </div>
      <div class="learning-wacth">
        <img src="../../assets/image/course/icon_weixin@2x.png" />
        <p>点击加入微信专业交流群</p>
        <span @click="onShowQRCode">加入</span>
      </div>
      <div class="learnig-list mbot">
        <v-title
          :title="titleNmae"
          top="34"
          bottom="17"
          :courseCount="courseData.classHourCount"
        ></v-title>
        <class-hours-list :class-hours="courseData.classHours"></class-hours-list>

      </div>
    </div>

    <div
      class="retake-course-btn"
      v-if="isShowRetakeBtn"
    >
      <p @click="onRetakeCourse">重新加入学习</p>
    </div>
  </div>
</template>
<script>
import * as CONSTANTS from '@/constants/index'
import Title from '@/components/Title.vue'
import { tranNumber, timeCycle } from '../../common/util.js'
import { mapState } from 'vuex'
import ClassHoursList from '@/views/Course/ClassHoursList'
export default {
  data () {
    return {
      title: '',
      isLoading: false,
      titleNmae: '课程安排',
      courseData: [],
      babyid: 0,
    }
  },
  computed: {
    isShowRetakeBtn () {
      return this.courseData && this.courseData.status * 1 === 20
    },
  },
  created () {
    this.babyid = localStorage.getItem('courseBaby')
    this.getCourseDeta(this.$route.query.id)
  },
  methods: {
    getCourseDeta (id) {
      this.$axios
        .getCourseDeta(id, this.babyid)
        .then((res) => {
          if (res.data.code == 1) {
            this.courseData = res.data.data
            this.isLoading = true
          }
        })
        .catch((err) => {
          console.error(err)
          this.$toast.fail(err)
        })
    },
    browse (num, point) {
      return tranNumber(num, point)
    },
    time (val) {
      return timeCycle(val)
    },
    //重修
    async onRetakeCourse () {
      const { id, courseGroupId } = this.courseData
      let babyId = localStorage.getItem('courseBaby')
      let userId = localStorage.getItem('user')
      babyId = JSON.parse(babyId)
      userId = JSON.parse(userId)
      try {
        const params = {
          babyId,
          userId,
          courseId: id,
          courseGroupId,
        }
        const { data } = await this.$axios.getRetakeCourse(params)
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        this.$toast.success('重新报名成功')

        this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT_HOME, {
          path: '/course/smart-course',
        })
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },
    async onShowQRCode () {
      const dialog = await this.$createDialog(
        () => import('@/views/Course/QrCodeModal.vue'),
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
    'v-title': Title,
    ClassHoursList
  },
}
</script>

<style lang="less" scoped>
@import "./../../assets/css/constants.less";
.learning-wrapper {
  margin: 0 14px;
  margin-top: 20px;
}
.learning-content {
  // margin-bottom: 84px;
  border-bottom: 84px solid transparent;
}
.learning-top {
  margin-top: 5px;
  p {
    line-height: 13px;
    font-family: "SourceHanSansCN-Regular";
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.6);

    &:nth-of-type(1) {
      line-height: 22px;
      font-family: "SourceHanSansCN-Medium";
      font-size: 22px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.8);
    }
    &:nth-of-type(2) {
      margin-top: 7px;
      line-height: 13px;
      font-family: "SourceHanSansCN-Regular";
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.6);

      & > span:first-of-type {
        line-height: 24px;
        font-family: "SourceHanSansCN-Medium";
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ff8a66;
      }
      & > span:nth-of-type(2) {
        display: inline-block;
        width: 1px;
        height: 10px;
        margin: 0 8px;
        border-radius: 1px;
        background-color: #666666;
      }
      & > span:last-of-type {
        font-family: "SourceHanSansCN-Medium";
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ff8a66;
      }
    }
    &:nth-of-type(3) {
      margin-top: 18px;
      line-height: 13px;
      font-family: "SourceHanSansCN-Normal";
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
.learning-wacth {
  width: 100%;
  height: 63px;
  margin-top: 28px;
  padding: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px 3px rgba(76, 76, 76, 0.06);
  border-radius: 8px;
  img {
    width: 31px;
    height: 24px;
  }
  p {
    font-family: "SourceHanSansCN-Normal";
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.8);
  }
  span {
    display: inline-block;
    width: 60px;
    height: 25px;
    border-radius: 24px;
    text-align: center;
    line-height: 25px;
    vertical-align: middle;
    background-color: #4dc42a;
    font-family: "SourceHanSansCN-Regular";
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }
}
.list-box {
  width: 345px;
  background-color: #ffffff;
  box-shadow: 0px 0px 8px 3px rgba(76, 76, 76, 0.06);
  border-radius: 8px;
  margin: 0 auto;
  ul {
    width: 100%;
    padding: 18px 15px 18px 15px;
    border-bottom: 1px #f3f3f3 solid;
    .list-item-title {
      width: 100%;
      display: flex;
      align-items: center;
      p {
        &:nth-of-type(1) {
          font-family: "SourceHanSansCN-Medium";
          font-size: 15px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: rgba(0, 0, 0, 0.8);
        }

        &:nth-of-type(2) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.3);
          margin-left: auto;
        }
      }
    }
    li {
      margin-top: 14px;
      .item-name {
        font-family: "SourceHanSansCN-Normal";
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: rgba(0, 0, 0, 0.8);
      }
      .item-time {
        display: flex;
        align-items: center;
        margin-top: 5px;
        img {
          width: 18px;
          height: 18px;
          margin-top: -2px;
        }
        p {
          font-family: "SourceHanSansCN-Normal";
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: rgba(0, 0, 0, 0.4);
          &:nth-of-type(2) {
            padding-left: 14px;
          }
        }
      }
    }
  }
}
.learnig-list {
}
.mbot {
  margin-bottom: 40px;
}

.retake-course-btn {
  width: 100%;
  height: 84px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  background-color: #fff;

  p {
    width: 345px;
    height: 48px;
    line-height: 48px;
    margin: 14px 15px;
    // font-family: 'SourceHanSansCN-Medium';
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    border-radius: 24px;
    border: solid 1px rgba(0, 0, 0, 0.4);
    // opacity: 0.5;
    font-family: "SourceHanSansCN-Medium";
    font-size: 17px;
    color: rgba(0, 0, 0, 0.6);
  }
}
</style>
