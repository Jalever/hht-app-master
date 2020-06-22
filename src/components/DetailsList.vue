<template>
  <div class="details-list-wrapper">
    <van-tabs @click="tabClick" class="details-list-tab" color="#ff6666">
      <van-tab v-for="item in dataWith" :key="item.id" :title="item.name">
      </van-tab>
    </van-tabs>

    <div class="list-content">
      <p class="list-content-title">
        <span @click="EbbinghausClick"
          >艾宾浩斯曲线学习计划
          <img src="../assets/image/course/icon_tips@2x.png"
        /></span>
      </p>
      <div class="list-box">
        <ul
          v-for="(titleItem, index) in tabData.classHours"
          :key="`${titleItem.courseId}-${titleItem.index}`"
        >
          <div class="list-item-title">
            <span>第{{ titleItem.index }}课时</span>
            <span
              ><i v-if="titleItem.newLearning"
                >新学{{ titleItem.newLearning }}首</i
              ><i v-if="titleItem.newLearning && titleItem.review"> | </i
              ><i v-if="titleItem.review">复习{{ titleItem.review }}首</i>
            </span>
          </div>
          <li v-for="listItem in titleItem.audios" :key="listItem.name">
            <p class="item-name">{{ listItem.name }}</p>
            <div class="item-time">
              <p>
                <img src="../assets/image/course/icon_time@2x.png" alt="" />
                {{ timeCycle(listItem.timeLength) }}
              </p>
              <p>
                <img
                  src="../assets/image/course/icon_listen备份@2x.png"
                  alt=""
                />
                {{ tranNumber(listItem.browseCount, 1) }}
              </p>
            </div>
          </li>
          <div class="list-box-divider"></div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: '',
  },
  data() {
    return {
      tabData: [],
    }
  },
  computed: {
    dataWith() {
      return this.data.map((item) => {
        const name =
          item.name.length > 5 ? item.name.slice(0, 6) + '...' : item.name
        return {
          ...item,
        }
      })
    },
  },
  created() {
    this.tabData = this.dataWith[0]
  },
  methods: {
    tabClick(index, title) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      this.tabData = this.dataWith[index]
    },
    timeCycle(val) {
      var h = Math.floor(val / 3600)
      var m =
        Math.floor((val / 60) % 60) >= 10
          ? Math.floor((val / 60) % 60)
          : '0' + Math.floor((val / 60) % 60)
      var s =
        Math.floor(val % 60) >= 10
          ? Math.floor(val % 60)
          : '0' + Math.floor(val % 60)
      var format =
        Math.floor(val / 3600) != 0 ? h + ':' + m + ':' + s : m + ':' + s
      return format
    },
    tranNumber(num, point) {
      let numStr = num.toString()
      if (numStr.length > 8) {
        let decimal = numStr.substring(
          numStr.length - 8,
          numStr.length - 8 + point
        )
        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
      }
      //大于6位数是十万 (以10W分割 10W以下全部显示)
      else if (numStr.length > 0) {
        let decimal = numStr.substring(
          numStr.length - 4,
          numStr.length - 4 + point
        )
        return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
      }
    },
    async EbbinghausClick() {
      const dialog = await this.$createDialog(
        () => import('@/views/Course/EbbinghausModal.vue'),
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
  components: {},
}
</script>

<style lang="less" scoped>
@import './../assets/css/constants.less';
.details-list-wrapper {
  // background-color: #ff0000;
}
.list-content {
  width: 345px;
  margin: 0 auto;
  margin-top: 20px;
  .list-content-title {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;
    font-family: 'SourceHanSansCN-Regular';
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    img {
      width: 14px;
      height: 14px;
      margin-left: 4px;
      position: relative;
      top: -1px;
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
      padding: 18px 12px;
      padding-bottom: 0;
      // background-color: #00ffff;
      .list-item-title {
        width: 100%;
        padding-left: 4px;
        display: flex;
        align-items: center;
        // background-color: #ff0000;
        span {
          &:nth-of-type(1) {
            font-family: 'SourceHanSansCN-Medium';
            font-size: 15px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: rgba(0, 0, 0, 0.8);
          }
          &:nth-of-type(2) {
            min-width: 110px;
            max-height: 18px;
            display: inline-block;
            margin-left: auto;
            margin-right: 4px;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.3);
            text-align: right;
            & > i {
              font-style: normal;
              // background-color: #ff0000;
            }
          }
        }
      }
      li {
        padding-left: 4px;
        padding-right: 4px;
        margin-top: 19px;
        .item-name {
          font-family: 'SourceHanSansCN-Normal';
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: rgba(0, 0, 0, 0.8);
        }
        .item-time {
          display: flex;
          align-items: center;
          p {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.4);
            &:nth-of-type(2) {
              padding-left: 16px;
            }
            img {
              width: 14px;
              height: 14px;
              margin-top: -1px;
            }
          }
        }
      }
    }
  }
  .list-box-divider {
    width: 100%;
    height: 1px;
    margin-top: 18px;
    background-color: #f3f3f3;
    // background-color: #ff0000;
    transform: scaleY(0.5);
    transform-origin: 50% 100%;
  }
  // .list-box-divider2 {
  //   width: 100%;
  //   height: 1px;
  //   margin-top: 3px;
  //   background-color: #f3f3f3;
  //   // background-color: #ff0000;
  // }
}

.details-list-tab {
  overflow-x: scroll;
  /deep/ .details-list-tab {
  }

  /deep/ .van-tabs__nav {
    & > div:first-of-type {
      padding-left: 15px;
    }
    & > div:nth-last-of-type(2) {
      padding-right: 15px;
    }
  }

  /deep/ .van-tabs__line {
    width: 30px !important;
    // display: none;
    border-top: 0 !important;
  }

  /deep/ .van-tabs__wrap {
    overflow-x: auto;
  }

  /deep/ .van-tab__text {
    overflow-x: auto;
    white-space: nowrap;
  }

  /deep/ .van-tab {
    padding: 0 16px !important;
    font-family: 'SourceHanSansCN-Normal' !important;
    font-size: 16px !important;
    font-weight: normal !important;
    font-stretch: normal !important;
    letter-spacing: 0px !important;
    color: rgba(0, 0, 0, 0.7) !important;
  }

  /deep/ .van-tab--active {
    // background-color: #fff000;
    font-family: 'SourceHanSansCN-Medium' !important;
    font-size: 19px !important;
    font-weight: normal !important;
    font-stretch: normal !important;
    letter-spacing: 0px !important;
    color: rgba(0, 0, 0, 0.8) !important;
  }
}
</style>
