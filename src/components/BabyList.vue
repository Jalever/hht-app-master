<template>
  <div class="content">
    <van-popup
      v-model="show"
      round
      closeable
      :style="{ height: '60%', 'overflow-y': 'hidden' }"
      @close="babyBox"
      class="baby-box"
    >
      <div class="baby-list">
        <p class="baby-titel">请选择要报名的宝宝</p>
        <div>
          <van-radio-group v-model="radio">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in babyList"
                :key="item.id"
                :title="item.nickName"
                @click="radio = index"
              >
                <template #right-icon>
                  <van-radio :name="index" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <div class="baby-btn" @click="cloneBaby"><p>确定</p></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import * as CONSTANTS from '@/constants/index'
export default {
  data() {
    return {
      show: true,
      radio: 0,
      babyList: [],
    }
  },
  async created() {
    await this.getBabyList()
  },
  methods: {
    async getBabyList() {
      try {
        const curUserId = window.localStorage.getItem(
          CONSTANTS.LOCALSTORAGE_COURSEBABY
        )
        const { data } = await this.$axios.getBabyList()
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        this.radio = resData.findIndex((item) => item.id * 1 === curUserId * 1)
        this.babyList = resData
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },
    cloneBaby() {
      let data = this.babyList[this.radio]
      this.$emit('setBabyId', data)
    },
    babyBox() {
      this.$emit('cloneBox', false)
    },
  },
  components: {},
}
</script>

<style lang="less" scoped>
.baby-box {
  width: 300px;

  .baby-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    // title
    .baby-titel {
      width: 100%;
      text-align: center;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.4);
      padding: 15px 0;
    }

    & > div:first-of-type {
      overflow-y: auto;

      flex-grow: 1 !important;
      & > div:first-of-type {
        height: 100%;
        // overflow-y: auto;
      }
    }
  }
}

// bottom button
.baby-btn {
  width: 100%;
  height: 36px;
  min-height: 36px;
  text-align: center;
  display: flex;
  align-items: center;
  // background-color: #ff0000;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  p {
    width: 100%;
    font-size: 16px;
    color: #0088cc;
  }
}
</style>
