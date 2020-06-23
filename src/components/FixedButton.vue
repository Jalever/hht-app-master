<template>
  <van-row class="fixed-button-wrapper" @click="handleClick">
    <div>
      <p></p>
      <span>{{ text }}</span>
    </div>
  </van-row>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  components: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  filters: {},
  watch: {},
  methods: {
    handleClick() {
      this.$emit('clk')
    },
  },
}
</script>

<style lang="less" scoped>
@import './../assets/css/constants.less';

.fixed-button-wrapper {
  width: 100%;
  height: @fixed-bottom-bar;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  background-color: #fff;
  & > div:first-child {
    width: 100%;
    height: 100%;
    position: relative;
    & > p {
      width: 345px;
      height: 48px;
      border-radius: 24px;
      border: solid 1px rgba(0, 0, 0, 0.4);
      opacity: 0.5;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    & > span {
      font-family: 'SourceHanSansCN-Medium';
      font-size: 17px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.6);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  // & > p {
  //   width: 345px;
  //   height: 48px;
  //   line-height: 48px;
  //   margin: 14px 15px;
  //   // font-family: 'SourceHanSansCN-Medium';
  //   font-weight: normal;
  //   font-stretch: normal;
  //   letter-spacing: 0px;
  //   border-radius: 24px;
  //   border: solid 1px rgba(0, 0, 0, 0.4);
  //   opacity: 0.5;
  //   // font-family: 'SourceHanSansCN-Medium';
  //   // font-size: 17px;
  //   // color: rgba(0, 0, 0, 0.6);
  //   & > span {
  //     font-family: 'SourceHanSansCN-Medium';
  //     font-size: 17px;
  //     font-weight: normal;
  //     font-stretch: normal;
  //     letter-spacing: 0px;
  //     color: rgba(0, 0, 0, 0.6);
  //     opacity: 1;
  //   }
  // }
}
</style>
