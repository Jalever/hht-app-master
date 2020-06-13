<template>
  <div class="content">
    <van-popup
      v-model="show"
      round
      closeable
      :style="{ height: '60%' }"
      @close="babyBox"
      class="baby-box"
    >
      <div class="baby-list">
        <p class="baby-titel">添加宝宝信息</p>
        <p class="baby-titel">创建宝贝信息，以生成适合宝贝成长的智慧早教计划</p>

        <div class="baby-btn" @click="closeModal"><p>确定</p></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      radio: 0,
      babyList: [],
    }
  },
  created() {
    // this.getBabyList()
  },
  methods: {
    // getBabyList() {
    //   this.$axios
    //     .getBabyList()
    //     .then((res) => {
    //       this.babyList = res.data.data
    //     })
    //     .catch((err) => console.error(err))
    // },
    closeModal() {
      // console.log('radio===', this.radio)
      // let data = this.babyList[this.radio]
      // console.log('data===', data)
      // this.$emit('setBabyId', data)
    },
    babyBox() {
      this.$emit('closeModal', false)
    },
  },
  components: {},
}
</script>

<style lang="less" scoped>
.baby-box {
  width: 300px;
  height: 600px;
  .baby-list {
    width: 100%;
    .baby-titel {
      width: 100%;
      text-align: center;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.4);
      padding: 15px 0;
    }
    li {
      width: 95%;
      margin: 0 auto;
      display: flex;
      padding: 5px 0;
      .list-img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .list-name {
        padding-left: 10px;
        display: flex;
        align-items: center;
        p {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.7);
        }
      }
    }
  }
}
.baby-btn {
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 0;
  padding: 10px 0;
  p {
    width: 100%;
    font-size: 16px;
    color: #0088cc;
  }
}
</style>
