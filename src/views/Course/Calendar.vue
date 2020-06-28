<template>
  <div class="calendar-comp-wrapper">
    <div class="calender-btn">
      <img
        src="@/assets/image/vip_smartedu_premonthwht@3x.png"
        @click="prevMonth"
      />
      <i>{{ month }}月</i>
      <img
        src="@/assets/image/vip_smartedu_nextmonthwht@3x.png"
        @click="nextMonth"
      />
    </div>

    <div class="table-block">
      <table
        border="0px"
        cellpadding="0px"
        cellspacing="0px"
      >
        <thead>
          <tr>
            <th
              v-for="item in theadList"
              :key="item"
            >{{ item }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in dateArr"
            v-if="contains(item, index)"
          >
            <td v-for="data in item">
              <span :class="{
                  over: data == '' && month == currentMouth,
                  cur_day: data == date && month == currentMouth,
                }">
                {{ data }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="showTime"
      @click="showClick"
    >
      <img
        v-if="!isUnfold"
        src="@/assets/image/vip_smartedu_spreadoutwht@3x.png"
        alt=""
      />
      <img
        v-else
        src="@/assets/image/vip_smartedu_gatherwht@3x.png"
        alt=""
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data () {
    return {
      today: new Date(),
      year: '',
      month: '',
      day: '',
      date: '',
      dateArr: [],
      checkin: [],
      ShowTime: 1,
      currentMouth: null,
      defaultIndex: -1,
      isUnfold: false,
      isMonth: false,
      theadList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    }
  },
  created () {
    this.year = this.today.getFullYear() //年
    this.month = this.today.getMonth() + 1 //月
    this.currentMouth = this.today.getMonth() + 1 //月
    this.day = this.today.getDay()
    this.date = this.today.getDate() //日
    this.getCalendar()
  },
  methods: {
    showClick () {
      this.isUnfold = !this.isUnfold
    },
    isLeap () {
      const year = this.year
      if (year % 4 == 0 && year % 100 > 0) {
        return true
      } else if (year % 400 == 0 && year % 3200 > 0) {
        return true
      } else {
        return false
      }
    },
    getMonthDays () {
      const month = this.month
      if (month * 1 === 2) return this.isLeap ? 29 : 28
      if (month * 1 < 8) return (month * 1) % 2 > 0 ? 31 : 30
      return (month * 1) % 2 > 0 ? 30 : 31
    },
    getCalendar () {
      const monthDays = this.getMonthDays()
      const firstDayOfMonth = new Date(this.year, this.month - 1, 1)
      const dayOfWeek = firstDayOfMonth.getDay()
      const arr = new Array()
      const maxWeekCount = 6
      const week = 7
      let tem = 1

      for (let i = 0; i < maxWeekCount; i++) {
        arr[i] = new Array()
        for (let j = 0; j < week; j++) {
          if (i === 0 && dayOfWeek * 1 === 0) {
            arr[i][j] = ''
            if (j === week - 1) arr[i][j] = 1;
            continue;
          }
          tem++
          if (tem - dayOfWeek > 0 && tem - dayOfWeek <= monthDays) {
            arr[i][j] = tem - dayOfWeek
            if (
              this.date == tem - dayOfWeek &&
              this.month == this.currentMouth
            ) {
              this.defaultIndex = i
              this.isMonth = true
            }
          } else {
            arr[i][j] = ''
          }
        }
      }

      this.dateArr = arr
    },
    nextMonth () {
      if (this.month == 12) {
        this.year++
        this.month = 1
      } else {
        this.month++
      }
      this.defaultIndex = 0
      this.isMonth = false
      this.getCalendar()
    },
    prevMonth () {
      if (this.month == 1) {
        this.year--
        this.month = 12
      } else {
        this.month--
      }
      this.defaultIndex = 0
      this.isMonth = false
      this.getCalendar()
    },
    contains (arr, index) {
      if (!this.isUnfold) {
        if (index != this.defaultIndex) {
          return
        } else {
          if (
            arr[0] == '' &&
            arr[1] == '' &&
            arr[2] == '' &&
            arr[3] == '' &&
            arr[4] == '' &&
            arr[5] == '' &&
            arr[6] == ''
          ) {
            return false
          } else {
            return true
          }
        }
      } else {
        if (
          arr[0] == '' &&
          arr[1] == '' &&
          arr[2] == '' &&
          arr[3] == '' &&
          arr[4] == '' &&
          arr[5] == '' &&
          arr[6] == ''
        ) {
          return false
        } else {
          return true
        }
      }
    },
  },
}
</script>

<style type="text/css" lang="less">
.calendar-comp-wrapper {
  width: 100%;
  background-color: #ff9f80;
  background: url(../../assets/image/rli@2x.png) no-repeat;
  background-size: contain;
}
.calender-btn {
  padding-left: 18px;
  padding-top: 65px;
  background: transparent;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & > img {
    width: 9px;
    height: 10px;
  }

  & > i {
    margin: 0px 6px;
    font-style: normal;
    line-height: 15px;
    font-family: "SourceHanSansCN-Medium";
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }
}

// table part - start
.table-block {
  background-color: #ff9f80;
  & > table {
    width: calc(100% - 16px);
    margin: 0 auto;
    margin-top: 15px;
    border-collapse: collapse;
    border-top: 0;
    table-layout: fixed;
    color: #fff;

    & > thead {
      width: 100%;
      & > tr {
        width: 100%;
        & > th {
          line-height: 14px;
          font-family: "SourceHanSansCN-Regular";
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }

    & > tbody::before {
      content: "";
      height: 12px;
      display: block;
    }

    & > tbody {
      & > tr {
        height: 32px;
        line-height: 32px;
        & > td {
          text-align: center;
          line-height: 17px;
          font-family: "SourceHanSansCN-Regular";
          font-size: 17px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;

          & > span {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}

.over {
  border-left: 0;
  border-right: 0;
}

.cur_day {
  width: 32px !important;
  height: 32px;
  line-height: 32px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0px 0px 3px 2px rgba(255, 102, 102, 0.09);
  font-family: "SourceHanSansCN-Regular";
  font-size: 17px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff8a66;
}

.showTime {
  display: block;
  width: 100%;
  text-align: center;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff9f80;
  margin: 0 auto;
  img {
    width: 20px;
    height: 20px;
    margin: 0 auto;
  }
}
</style>
