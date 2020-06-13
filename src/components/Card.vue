<template>
  <div class="app">
    <div class="course-card" @click="goEducation()">
      <div class="course-card-box">
        <div class="course-img"><img src="../assets/image/2.png" alt="" /></div>
        <div class="card-name"><p>智慧早教课程</p></div>
        <div class="card-name-subhead">
          <p>
            智慧早教
          </p>
        </div>

        <div class="course-state">
          <p class="course-state-btn2" v-if="eduData">已添加</p>
          <p class="course-state-btn1" v-else>会员免费</p>
        </div>
      </div>
    </div>
    <div
      class="course-card"
      v-for="item in list"
      :key="item.id"
      @click="detailsRouter(item.id)"
    >
      <div class="course-card-box">
        <div class="course-img"><img :src="item.coverImage" alt="" /></div>
        <div class="card-name">
          <p>{{ item.name }}</p>
        </div>
        <div class="card-name-subhead">
          <p>{{ item.description || '暂无描述' }}</p>
        </div>
        <!-- <div class="card-lable">
					<span v-for="opt in item.labels">{{ opt.name }}</span>
				</div> -->
        <div class="card-time">
          <p>
            <img src="../assets/image/course/icon_time@2x.png" alt="" />
            共{{ item.classHour }}课时
          </p>
          <p>
            <img src="../assets/image/home_conner_iconalbum@2x.png" alt="" />
            <span>{{ item.particiPants }}人</span>正在上课
          </p>
        </div>
        <div class="course-state">
          <p class="course-state-btn2" v-if="item.learningState == 20">
            已添加
          </p>
          <p class="course-state-btn1" v-else>会员免费</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: '',
    eduData: false,
  },
  data() {
    return {
      userId: null,
    }
  },
  created() {
    this.userId = localStorage.getItem('courseBaby')
  },
  methods: {
    detailsRouter(id) {
      // if(this.userId == null){
      // 	this.$toast('请登录火火兔APP');
      // 	return
      // }
      this.$router.push({ name: 'course/details', query: { id: id } })
    },
    goEducation() {
      if (this.userId == null) {
        this.$toast('请登录火火兔APP')
        return
      }
      this.$router.push({ name: 'education', query: { header: 1 } })
    },
  },
  components: {},
}
</script>

<style lang="less" scoped>
.course-card {
  width: 349px;
  background-color: #fff;
  // box-shadow: 0px 0px 8px 3px rgba(76, 76, 76, 0.06);
  // border-radius: 8px;
  margin: 0 auto;
  margin-top: 20px;
  // margin-bottom: 20px;
  // background-color: #ff0000;

  border-radius: 8px;
  background-color: '#ffffff';
  box-shadow: 0 2px 4px 4px rgba(76, 76, 76, 0.03);
  // shadowOffset: {
  // 	width: 0,
  // 	height: 1
  // };
  // shadow-radius: 2;
  // shadow-opacity: 1;
}

.course-card:first-child {
  margin-top: 16px;
}

.course-card-box {
  width: 321px;
  margin: 0 auto;
  padding: 10px 0;
  // background-color: #ff0000;
  .course-img {
    width: 100%;
    height: 146px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
  }
  .card-name {
    font-size: 20px;
    // color: rgba(0, 0, 0, 0.8);
    color: #333;
    font-weight: bold;
    // padding-top: 10px;
    margin-top: 14px;
    // background-color: #ff0000;
  }
  .card-name-subhead {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 9px;
    & > p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-left: 3px;
      // background-color: #fff000;
    }
  }
  .card-lable {
    display: flex;
    margin-top: 10px;
    span {
      display: inline-block;
      background-color: rgba(255, 138, 102, 0.08);
      border-radius: 12px;
      color: #ff8a66;
      font-size: 13px;
      padding: 4px 8px;
      margin-right: 11px;
    }
  }
  .card-time {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 11px;
    p {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      img {
        width: 16px;
        height: 16px;
        margin-top: -2px;
      }
      &:nth-of-type(2) {
        margin-left: auto;
        span {
          color: #ff6666;
        }
      }
    }
  }
  .course-state {
    margin-top: 20px;
    p {
      width: 104px;
      height: 30px;
      border-radius: 15px;
      text-align: center;
      line-height: 30px;
      font-size: 16px;
    }
    .course-state-btn1 {
      background-color: #f9c003;
      color: #fff;
    }
    .course-state-btn2 {
      color: rgba(0, 0, 0, 0.3);
      background: #fff;
      border: solid 1px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
