<template>
  <div id="nv">
    <div class="userbox">
      <van-image round width="10rem" height="10rem" :src="require('@/assets/headimg.jpg')" />
      <div class="userbox-1">
        <!-- 学生个人信息 -->
        <van-cell size="large" title="学号：" icon="user-o">{{studentData.studentNumber}}</van-cell>
        <van-cell size="large" title="姓名：" icon="user-o">{{studentData.name}}</van-cell>
        <van-cell size="large" title="年级：" icon="flower-o">{{studentData.classes.grades.name}}</van-cell>
        <!-- <van-cell size="large" title="专业：" icon="cashier-o">{{studentData.classes.major.name}}</van-cell> -->
        <van-cell size="large" title="班级：" icon="friends-o">{{studentData.classes.name}}</van-cell>
        <van-cell size="large" title="电话号码：" icon="phone-o">{{studentData.tel}}</van-cell>
        <van-cell size="large" title="qq:" icon="user-circle-o">{{studentData.qq}}</van-cell>
        <!-- 学生个人信息 end-->

        <!-- 修改学生个人信息 -->
        <div>
          <van-cell is-link @click="showUpdatexx">修改信息</van-cell>
          <van-popup closeable v-model="showUpdate" position="bottom" :style="{ height: '100%' }">
            <h3>修改信息</h3>
            <van-form v-model="updatexxform">
              <van-field
                v-model="updatexxform.tel"
                name="电话号码"
                label="电话号码"
                placeholder="电话号码"
                type="number"
              />
              <van-field
                v-model="updatexxform.qq"
                name="qq"
                label="qq"
                placeholder="qq"
                type="number"
              />
              <van-button round block type="info" native-type="submit" @click="submitUpdatexx()">提交</van-button>
            </van-form>
          </van-popup>
        </div>
        <!-- 修改学生个人信息 end-->

        <!-- 修改密码  -->
        <div>
          <van-cell is-link @click="showUpdatePassword">修改密码</van-cell>
          <van-popup closeable v-model="show" position="bottom" :style="{ height: '100%' }">
            <h3>修改密码</h3>
            <van-form v-model="updateform">
              <van-field
                v-model="updateform.password"
                name="原密码"
                label="原密码"
                placeholder="原密码"
                type="password"
                :rules="[{ required: true, message: '请填写原密码' }]"
              />
              <van-field
                v-model="updateform.newPassword"
                name="新密码"
                label="新密码"
                placeholder="新密码"
                type="password"
                :rules="[{ required: true, message: '请填写新密码' }]"
              />
              <van-field
                v-model="updateform.confirmPassword"
                name="确认密码"
                label="确认密码"
                placeholder="确认密码"
                type="password"
                :rules="[{ required: true, message: '请填写确认密码' }]"
              />

              <van-button
                round
                block
                type="info"
                native-type="submit"
                @click="submitUpdateForm()"
              >提交</van-button>
            </van-form>
          </van-popup>
        </div>
        <!-- 修改密码  end-->

        <van-button plain hairline type="info" @click="logout">退出当前用户</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      studentData: [], //获取学生个人信息
      show: false, //默认修改密码为未显示状态
      showUpdate: false, //默认修改信息为未显示状态
      updateform: {
        password: "", //原密码
        newPassword: "", //新密码
        confirmPassword: "" //确认密码
      },
      updatexxform: {
        tel: "", //电话号码
        qq: "" //QQ号
      }
    };
  },

  created() {
    this.getStudentInformation();
  },
  methods: {
    //获取学生个人信息
    getStudentInformation() {
      this.$axios.get("/student/").then(response => {
        //获取返回数据
        let msg = response.data;
        console.log(response.data);
        if (msg.code == 0) {
          this.studentData = msg.data;
        } else {
          this.$toast(msg.msg);
        }
      });
    },
    // 退出登录
    logout() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要退出当前用户吗？"
        })
        .then(() => {
          //选择确认按钮后执行
          this.logo();
        })
        .catch(error => {
          //选择取消按钮后执行
        });
    },
    logo() {
      this.$axios.get("/student/logout").then(response => {
        let msg = response.data;
        if (msg.code == 0) {
          this.$router.push("/login");
        } else {
          this.$toast(msg.msg);
        }
      });
    },
    //   显示修改密码
    showUpdatePassword() {
      this.show = true;
    },
    submitUpdateForm() {
      //将更新后的值传到服务端保存
      let validate = true;
      let _this = this;
      if (validate) {
        //如果验证通过

        //提交表单事件
        this.$axios
          .put("/student/updatePassword", JSON.stringify(this.updateform))
          .then(response => {
            //获取返回数据
            let msg = response.data;
            console.log(response.data);
            if (msg.code == 0) {
              //如果修改密码成功
              _this.$dialog
                .alert({
                  title: "系统提示",
                  message: "修改密码成功！"
                })
                .then(() => {
                  _this.$router.push("/login");
                });
            } else {
              //如果修改密码失败
              this.$toast(msg.msg);
            }
          });
      }
    },
    // 显示修改信息
    showUpdatexx() {
      this.showUpdate = true;
    },
    // 执行修改信息
    submitUpdatexx() {
      this.$axios
        .put("/student", JSON.stringify(this.updatexxform))
        .then(response => {
          let msg = response.data;
          if (msg.code == 0) {
            //如果修改信息成功
            this.$dialog
              .alert({
                title: "系统提示",
                message: "修改信息成功！"
              })
              .then(() => {
                this.showUpdate = false;
              });
          } else {
            this.$toast(msg.msg);
          }
        });
    }
  }
};
</script>
<style scoped>
.userbox-1 {
  margin-top: 6%;
}
.userbox {
  height: 82ch;
  width: 100%;
  background: url("../../assets/bg2.jpg") no-repeat;
  background-size: cover;
}
.van-image {
  margin-top: 8%;
}
</style>
