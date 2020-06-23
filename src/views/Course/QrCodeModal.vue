<template>
  <van-popup
    v-bind="$attrs"
    get-container="body"
    :close-on-click-overlay="true"
    :style="popupStyle"
    @click-overlay="onClose"
  >
    <div class="qrcode-modal-wrapper">
      <van-image width="200" height="200" :src="qrcodeSrc" />
    </div>
  </van-popup>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      popupStyle: {
        'background-color': 'transparent',
      },
      qrcodeSrc: require('./../../assets/image/course/group_join.jpg'),
    }
  },
  computed: {},
  mounted() {},
  filters: {},
  watch: {},
  methods: {
    onClose() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="less" scoped>
.qrcode-modal-wrapper {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
