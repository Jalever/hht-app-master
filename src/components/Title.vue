<template>
  <div
    class="title"
    :style="{ 'margin-top': `${top}px`, 'margin-bottom': `${bottom}px` }"
  >
    <p>
      {{ title }}
      <span v-if="age">{{ age }}</span>
      <span v-if="courseCount">共<i>{{ courseCount }}</i>课时</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    age: {
      type: String,
    },
    top: {
      type: [String, Number],
      default: '36',
    },
    bottom: {
      type: [String, Number],
      default: '20',
    },
    courseCount: [String, Number],
  },
}
</script>

<style lang="less" scoped>
.title {
  position: relative;
  &::after {
    content: "";
    width: 4px;
    height: 14px;
    border-radius: 2px;
    position: absolute;
    top: 50%;
    left: 0;
    background: #ff6666;
    transform: translateY(-50%);
  }
  p {
    padding-left: 10px;
    line-height: 15px;
    font-family: "SourceHanSansCN-Medium";
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    position: relative;

    & > span {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.3);
      padding-left: 12px;
    }

    & > span:last-of-type {
      margin-left: auto;
      line-height: 13px;
      font-family: "SourceHanSansCN-Normal";
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.6);

      & > i {
        font-style: normal;
        line-height: 15px;
        font-family: "SourceHanSansCN-Medium";
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
}
</style>
