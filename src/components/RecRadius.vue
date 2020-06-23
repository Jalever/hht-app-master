<template>
  <div
    class="rectangle-radius-wrapper"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      'border-radius': `${radius}px`,
    }"
  ></div>
</template>
<script>
export default {
  props: {
    width: {
      type: [String, Number],
      default: 1,
    },
    height: {
      type: [String, Number],
      default: 10,
    },
    radius: {
      type: [String, Number],
      default: 1,
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
  methods: {},
}
</script>

<style lang="less" scoped>
.rectangle-radius-wrapper {
  display: inline-block;
  background-color: #999999;
  margin: 0 4px;
}
</style>
