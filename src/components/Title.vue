<template>
  <div class="title">
    <p>
      <span>{{ title }}</span>
      <span>{{ age }}</span>
      <span v-if="isShowCourseCount">共{{ courseCount }}课时</span>
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
    isShowCourseCount: {
      type: Boolean,
      default: false,
    },
    courseCount: [Number, String],
  },
}
</script>

<style lang="less" scoped>
.title {
  width: 345px;
  margin: 0 auto;
  margin-top: 36px;
  margin-bottom: 20px;
  position: relative;
  // box-shadow:-4px 0px 0 0 #ff6666;
  // box-shadow:inset 4px 0 0 0 #ff6666;
  &::after {
    content: '';
    width: 4px;
    height: 22px;
    border-radius: 2px;
    position: absolute;
    top: 0;
    left: 0;
    background: #ff6666;
  }
  p {
    & > span:first-child {
      font-size: 15px;
      padding-left: 12px;
      color: rgba(0, 0, 0, 0.8);
      // background-color: #fff000;
    }

    & > span:last-child {
      margin-left: auto;
    }
    display: flex;
    align-items: center;
  }
  span {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.3);
    padding-left: 12px;
  }
}
</style>
