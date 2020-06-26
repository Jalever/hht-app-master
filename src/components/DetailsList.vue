<template>
  <div class="details-list-wrapper">
    <van-tabs
      @click="tabClick"
      class="details-list-tab"
      color="#ff6666"
    >
      <van-tab
        v-for="item in dataWith"
        :key="item.id"
        :title="item.name"
      >
      </van-tab>
    </van-tabs>

    <div class="list-content">
      <p class="list-content-title">
        <span @click="EbbinghausClick">艾宾浩斯曲线学习计划
          <img src="../assets/image/course/icon_tips@2x.png" /></span>
      </p>
      <class-hours-list :class-hours="tabData.classHours"></class-hours-list>
    </div>
  </div>
</template>

<script>
import ClassHoursList from '@/views/Course/ClassHoursList'

export default {
  props: {
    data: '',
  },
  data () {
    return {
      tabData: [],
    }
  },
  computed: {
    dataWith () {
      return this.data.map((item) => {
        const name =
          item.name.length > 5 ? item.name.slice(0, 6) + '...' : item.name
        return {
          ...item,
        }
      })
    },
  },
  created () {
    this.tabData = this.dataWith[0]
  },
  methods: {
    tabClick (index, title) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      this.tabData = this.dataWith[index]
    },


    async EbbinghausClick () {
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
  components: {
    ClassHoursList
  },
}
</script>

<style lang="less" scoped>
@import "./../assets/css/constants.less";
.details-list-wrapper {
  // background-color: #ff0000;
}
.list-content {
  width: 345px;
  margin: 0 auto;
  margin-top: 13px;
  .list-content-title {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;
    font-family: "SourceHanSansCN-Regular";
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
    font-family: "SourceHanSansCN-Normal" !important;
    font-size: 16px !important;
    font-weight: normal !important;
    font-stretch: normal !important;
    letter-spacing: 0px !important;
    color: rgba(0, 0, 0, 0.7) !important;
  }

  /deep/ .van-tab--active {
    font-family: "SourceHanSansCN-Medium" !important;
    font-size: 19px !important;
    font-weight: normal !important;
    font-stretch: normal !important;
    letter-spacing: 0px !important;
    color: rgba(0, 0, 0, 0.8) !important;
  }
}
</style>
