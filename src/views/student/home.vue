<template>
  <div>
    <div class="nar">
      <span>实习系统</span>
      <van-icon class="nav-icon" name="search" size="18" />
    </div>
    <div>
      <!-- 轮播图 -->
      <div class="swipe">
        <!-- <van-image width="100%" height="15rem" :src="require('@/assets/banner4.jpg')" /> -->
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="welcome">
        <h2>欢迎来到实习系统!</h2>
        <p>Welcome to the internship system.</p>
      </div>
      <!-- 查询可供自己选择的实习老师 -->
      <div>
        <van-cell size="large" is-link @click="showTeacherPopup">查询可供自己选择的实习老师</van-cell>
        <van-popup closeable v-model="show" position="bottom" :style="{ height: '50%' }">
          <h3>可以选择的实习老师</h3>
          <table class="tab">
            <tr>
              <th>教师姓名</th>
              <th>专业群</th>
              <th>操作</th>
            </tr>
            <tr
              v-for="(teacher,index) in availableTeacherData"
              :key="index"
              @click="getDataId(teacher.teacher.teacherNumber)"
            >
              <td>{{teacher.teacher.name}}</td>
              <td>{{teacher.teacher.professional.name}}</td>
              <td>
                <button plain hairline type="info" @click="chooseTeacher(teacher.teacher.name)">选择</button>
              </td>
            </tr>
          </table>
        </van-popup>
      </div>

      <!-- 查询选择的实习老师 -->
      <div>
        <van-cell is-link @click="showChooseTeacher">查询选择的实习老师</van-cell>
        <van-popup closeable v-model="showTeacher" position="bottom" :style="{ height: '50%' }">
          <h3>已选择了的实习老师</h3>
          <template v-if="chooseTeacherData==null">
            <p>你还未选择实习老师！</p>
          </template>
          <template v-else>
            <van-cell size="large" title="教师姓名：" icon="flower-o">{{chooseTeacherData.name}}</van-cell>
          </template>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
// 导入轮播图
import swipe1 from "@/assets/swipe/banner1.jpg";
import swipe2 from "@/assets/swipe/banner2.jpg";

export default {
  
  data() {
    return {
        images: [swipe1, swipe2], //轮播图
      show: false, //默认可供自己选择的实习老师为未显示状态
      showTeacher: false, //默认选择的实习老师为未显示状态
      checked: "", //默认复选框为未选中状态
      // disabled: true, //当复选框被选中时，选择按钮变为可用状态
      availableTeacherData: [], //获取可供自己选择的实习老师
      chooseTeacherData: [], //选择的实习老师信息
      teacherNumber: "", //教师号
      multpleSelection: [] //复选框选择的记录row
    };
  },
  methods: {
    //   显示可供自己选择的实习老师
    showTeacherPopup() {
      this.show = true;
      this.getAvailableTeacher();
    },
    // 获取可供自己选择的实习老师的信息
    getAvailableTeacher() {
      this.$axios.get("/student/getAvailableTeacher").then(response => {
        let msg = response.data;
        console.log(response.data);
        if (msg.code == 0) {
          this.availableTeacherData = msg.data;
        } else {
          this.$toast(msg.msg);
        }
      });
    },

    getDataId(id) {
      this.teacherNumber = id;
    },
    // 选择实习老师
    chooseTeacher(name) {
      let studentname=name;
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定选择"+studentname+"实习老师吗？"
        })
        .then(() => {
          //选择确认按钮后执行
          let ids = this.teacherNumber;
          this.$axios
            .post("/student/choose/" + ids.toString())
            .then(response => {
              // console.log('当前点击的id='+ids);
              //获取返回数据
              let msg = response.data;
              if (msg.code === 0) {
                this.$toast.success("选择成功");
                this.show = false;
              } else {
                this.$toast(msg.msg);
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          //选择取消按钮后执行
          // console.log(error);
        });
    },
    // 显示查询选择的实习老师
    showChooseTeacher() {
      this.showTeacher = true;
      this.getChooseTeacher();
    },
    // 查询选择的实习老师
    getChooseTeacher() {
      this.$axios.get("/student/getTeacher").then(response => {
        let msg = response.data;
        console.log(response.data);
        if (msg.code == 0) {
          this.chooseTeacherData = msg.data;
        } else {
          this.$toast(msg.msg);
        }
      });
    }
  }
};
</script>
<style scoped>
.nar {
  width: 100%;
  height: 46px;
  color: #ffffff;
  background-color: #2392a0;
  line-height: 45px;
}
.nar span {
  text-align: center;
  padding-left: 45px;
}
.nav-icon {
  float: right;
  line-height: 45px;
  padding-right: 15px;
}

.swipe img {
  width: 100%;
  height: 35vh;
}
.welcome {
  margin-top: -6.5%;
  width: 100%;
  height: 14vh;
  background-color: #345f8a38;
}
.welcome h2 {
  color: #2197d0;
  padding-top: 2%;
}
.welcome p {
  color: #a4aaad;
}
.tab {
  border: #2392a0 1px solid;
  width: 100%;
  font-size: 14px;
}
table,
th,
td {
  border: #2392a0 1px solid;
  border-collapse: collapse;
}
</style>