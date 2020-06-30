<template>
  <div class="list-box">
    <ul
      v-for="(titleItem, index) in classHours"
      :key="`${titleItem.courseId}-${titleItem.index}`"
    >
      <div class="list-item-title">
        <span>第{{ titleItem.index }}课时</span>
        <span><i v-if="titleItem.newLearning">新学{{ titleItem.newLearning }}首</i><i v-if="titleItem.newLearning && titleItem.review">
            <rec-radius></rec-radius>
          </i><i v-if="titleItem.review">复习{{ titleItem.review }}首</i>
        </span>
      </div>
      <li
        v-for="listItem in titleItem.audios"
        :key="listItem.name"
      >
        <p class="item-name">{{ listItem.name }}</p>
        <div class="item-time">
          <p>
            <img
              src="@/assets/image/course/home_search_time@2x.png"
              alt=""
            />
            {{ timeCycle(listItem.timeLength) }}
          </p>
          <p>
            <img
              src="@/assets/image/course/home_search_listen@2x.png"
              alt=""
            />
            {{ tranNumber(listItem.browseCount, 1) }}
          </p>
        </div>
      </li>
      <div class="list-box-divider"></div>
    </ul>
  </div>
</template>
<script>
import RecRadius from '@/components/RecRadius'
export default {
  props: {
    classHours: {
      type: Array,
      default: () => [],
    },
  },
  components: { RecRadius },
  data () {
    return {}
  },
  computed: {},
  mounted () { },
  filters: {},
  watch: {},
  methods: {
    tranNumber (num, point) {
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
    timeCycle (val) {
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
  },
}
</script>

<style lang="less" scoped>
.list-box {
  background-color: #ffffff;
  box-shadow: 0px 0px 8px 3px rgba(76, 76, 76, 0.06);
  border-radius: 8px;
  padding: 23px 0;
  ul {
    width: 100%;
    padding: 18px 12px;
    padding-bottom: 0;
    .list-item-title {
      width: 100%;
      padding-left: 4px;
      display: flex;
      align-items: center;
      span {
        &:nth-of-type(1) {
          font-family: "SourceHanSansCN-Medium";
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
          }
        }
      }
    }
    li {
      padding-left: 4px;
      padding-right: 4px;
      margin-top: 19px;
      .item-name {
        font-family: "SourceHanSansCN-Normal";
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: rgba(0, 0, 0, 0.8);
      }
      .item-time {
        margin-top: 4px;
        display: flex;
        align-items: center;
        p {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.4);
          &:nth-of-type(2) {
            padding-left: 16px;
          }
          img {
            width: 18px;
            height: 18px;
            margin-top: -1px;
          }
        }
      }
    }
  }
  & > ul:first-of-type {
    padding-top: 0px;
  }
  & > ul:last-of-type {
    & > div:last-of-type {
      display: none;
    }
  }
}
.list-box-divider {
  width: 100%;
  height: 1px;
  margin-top: 18px;
  background-color: #f3f3f3;
  transform: scaleY(0.5);
  transform-origin: 50% 100%;
}
</style>
