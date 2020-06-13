<template>
  <div class="course-login-wrapper">
    <!-- <v-header title="学习计划"></v-header> -->
    <img src="@/assets/image/course/my_loginguide.png" />
    <!-- src="../../assets/image/course/icon_popup_close@2x.png" -->
    <p>{{ CONSTANTS.LABEL_LOGIN_TEXT }}</p>
    <button @click="onRedirect">{{ CONSTANTS.LABEL_LOGIN_BTN_TEXT }}</button>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import CONSTANTS from '@/constants/index'
export default {
  props: {},
  components: {
    'v-header': Header,
  },
  data() {
    // let CONSTANTS = Object.freeze(CONSTANTS)
    return {
      CONSTANTS,
    }
  },
  computed: {},
  mounted() {},
  filters: {},
  watch: {},
  methods: {
    onRedirect() {
      alert(1)
      window.webkit.messageHandlers.web_login.postMessage(null)
    },
  },
}
</script>

<style lang="less" scoped>
.course-login-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > img {
    width: 227px;
    height: 227px;
    margin: 0 auto;
    margin-top: 63px;
  }

  & > p {
    text-align: center;
    font-family: 'SourceHanSansCN-Regular';
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.5);
  }
  & > button {
    width: 311px;
    height: 48px;
    margin: 0 auto;
    margin-top: 54px;
    border: 0;
    outline: 0;
    background-image: linear-gradient(90deg, #ff9043 0%, #ff6666 100%);
    border-radius: 24px;

    font-family: SourceHanSansCN-Medium;
    font-size: 17px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }
}
</style>
