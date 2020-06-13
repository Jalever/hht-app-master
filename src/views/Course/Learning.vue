<template>
  <div class="course-learning-wrapper">
    <!-- <v-header :title="courseData.name"></v-header> -->

    <v-header title=""></v-header>
    <div class="loadingding center" v-show="!isLoading">
      <van-loading size="30px" color="#ff6666" vertical>加载中</van-loading>
    </div>
    <div class="course-learning-content" v-show="isLoading">
      <div class="learning-top mbot">
        <p>{{ courseData.name }}</p>
        <p>
          共
          <span>{{ courseData.classHourCount }}</span>
          课时 | 每节课约
          <span>{{ courseData.avgDuration }}</span>
          分钟
        </p>
        <p>艾宾浩斯曲线学习计划</p>
      </div>
      <div class="learning-wacth">
        <img src="../../assets/image/course/icon_weixin@2x.png" alt="" />
        <p>点击加入微信专业交流群</p>
        <span>加入</span>
      </div>
      <div class="learnig-list mbot">
        <v-title
          :title="titleNmae"
          :isShowCourseCount="true"
          :course-count="courseData.classHourCount"
        ></v-title>
        <div class="list-box">
          <ul v-for="titleItem in courseData.classHours" :key="titleItem.index">
            <div class="list-item-title">
              <p>
                <span>第{{ titleItem.index }}课时</span>
              </p>
              <p>
                <span v-if="titleItem.newLearning > 0"
                  >新学{{ titleItem.newLearning }}首</span
                >
                |
                <span>复习{{ titleItem.review }}首</span>
              </p>
            </div>
            <li v-for="listItem in titleItem.audios" :key="listItem.name">
              <p class="item-name">{{ listItem.name }}</p>
              <div class="item-time">
                <p>
                  <img
                    src="../../assets/image/course/icon_time@2x.png"
                    alt=""
                  />
                  {{ time(listItem.timeLength) }}
                </p>
                <p>
                  <img
                    src="../../assets/image/course/icon_listen备份@2x.png"
                    alt=""
                  />
                  {{ browse(listItem.browseCount, 1) }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Title from '@/components/Title.vue'
import { tranNumber, timeCycle } from '../../common/util.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      title: '',
      isLoading: false,
      titleNmae: '课程安排',
      courseData: [],
      babyid: 0,
    }
  },
  computed: {},
  created() {
    this.babyid = localStorage.getItem('courseBaby')
    this.getCourseDeta(this.$route.query.id)
  },
  methods: {
    getCourseDeta(id) {
      this.$axios
        .getCourseDeta(id, this.babyid)
        .then((res) => {
          if (res.data.code == 1) {
            this.courseData = res.data.data
            // console.warn('this.courseData')
            // console.log(courseData)
            // console.log('\n')

            this.isLoading = true
          }
        })
        .catch((err) => console.error(err))
    },
    browse(num, point) {
      return tranNumber(num, point)
    },
    time(val) {
      return timeCycle(val)
    },
  },
  components: {
    'v-header': Header,
    'v-title': Title,
  },
}
</script>

<style lang="less" scoped>
.learning-top {
  width: 345px;
  margin: 20px auto;
  margin-top: 0;

  // background-color: #fff000;
  p {
    &:nth-of-type(1) {
      font-size: 22px;
      color: rgba(0, 0, 0, 0.8);

      font-family: 'SourceHanSansCN-Medium';
      font-size: 22px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.8);
    }
    &:nth-of-type(2) {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.6);
      margin-left: 2px;
      margin-top: 7px;
      span {
        font-size: 24px;
        color: #ff8a66;
      }
    }
    &:nth-of-type(3) {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.5);
      margin-left: 2px;
      margin-top: 16px;
    }
  }
}
.learning-wacth {
  width: 345px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  height: 63px;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px 3px rgba(76, 76, 76, 0.06);
  border-radius: 8px;
  img {
    width: 31px;
    height: 24px;
  }
  p {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
    padding-left: 18px;
  }
  span {
    margin-left: auto;
    display: inline-block;
    width: 60px;
    height: 25px;
    border-radius: 24px;
    // border: solid 1px #ff6666;
    // font-size: 12px;
    // color: #ff6666;
    text-align: center;
    line-height: 25px;
    background-color: #4dc42a;
    border-radius: 24px;
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
    padding: 18px 24px;
    border-bottom: 1px #f3f3f3 solid;
    .list-item-title {
      width: 100%;
      display: flex;
      align-items: center;
      p {
        &:nth-of-type(1) {
          font-size: 15px;
          color: rgba(0, 0, 0, 0.8);
        }
      }
      p {
        &:nth-of-type(2) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.3);
          margin-left: auto;
        }
      }
    }
    li {
      margin-top: 19px;
      .item-name {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.8);
      }
      .item-time {
        display: flex;
        align-items: center;
        img {
          width: 14px;
          height: 14px;
          margin-top: -2px;
        }
        p {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.4);
          &:nth-of-type(2) {
            padding-left: 30px;
          }
        }
      }
    }
  }
}
.mbot {
  margin-bottom: 40px;
}
</style>
