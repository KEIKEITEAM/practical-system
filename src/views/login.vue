<template>
  <div>
    <div class="login">
      <van-image width="100%" height="15rem" :src="require('@/assets/login.png')" />

      <!-- 根据身份判断显示那个登录   学生登录-->
      <template v-if="identity=='student'">
        <van-form v-model="studentform">
          <van-field
            v-model="studentform.studentNumber"
            name="学号"
            type="number"
            label="学号"
            placeholder="学号"
            :rules="studentNumberRules"
            clearable
          />
          <van-field
            v-model="studentform.password"
            name="密码"
            label="密码"
            placeholder="密码"
            type="password"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div class="identityradio">
            <van-radio-group v-model="identity" direction="horizontal">
              <van-radio name="student">学生</van-radio>
              <van-radio name="teacher">老师</van-radio>
            </van-radio-group>
          </div>
          <div style="margin: 16px;">
            <van-button round block type="info" color="#7a99d9" @click="submitStudentForm()">登录</van-button>
          </div>
        </van-form>
      </template>
      <!-- 学生登录 end -->

      <!-- 根据身份判断显示那个登录   教师登录-->
      <template v-if="identity=='teacher'">
        <van-form v-model="teacherform">
          <van-field
            v-model="teacherform.teacherNumber"
            name="工号"
            type="number"
            label="工号"
            placeholder="工号"
            :rules="teacherNumberRules"
            clearable
          />
          <van-field
            v-model="teacherform.password"
            name="密码"
            label="密码"
            type="password"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div class="identityradio">
            <van-radio-group v-model="identity" direction="horizontal">
              <van-radio name="student">学生</van-radio>
              <van-radio name="teacher">老师</van-radio>
            </van-radio-group>
          </div>
          <div style="margin: 16px;">
            <van-button
              round
              block
              type="info"
              color="#7a99d9"
              native-type="submit"
              @click="submitTeacherForm()"
            >登录</van-button>
          </div>
        </van-form>
      </template>
      <!-- 教师登录 end -->
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    this.teacherNumberRules = [{ required: true, message: "请输入工号" }];
    this.studentNumberRules = [{ required: true, message: "请输入学号" }];

    return {
      identity: "student",//默认身份是学生
      studentform: {
        studentNumber: "",//学号
        password: ""//密码
      },
      teacherform: {
        teacherNumber: "",//工号
        password: ""//密码
      }
    };
  },
  methods: {
    //执行学生登录事件
    submitStudentForm() {
      //将更新后的值传到服务端保存
      let validate = true;
      let _this = this;
      if (validate) {
        //如果验证通过

        //提交表单事件
        this.$axios
          .get("/student/login", {
            params: {
              studentNumber: this.studentform.studentNumber,
              password: this.studentform.password
            }
          })
          .then(response => {
            //获取返回数据
            let msg = response.data;
            console.log(response.data);
            if (msg.code == 0) {
              _this.$store.commit(
                "save_student",
                this.studentform.studentNumber
              );

              //如果登录成功
              _this.$dialog
                .alert({
                  title: "系统提示",
                  message: "登录成功！"
                })
                .then(() => {
                  _this.$router.push("/home");
                });
            } else {
              //如果登录失败
              this.$toast(msg.msg);
            }
          });
      }
    },
        //执行教师登录事件
    submitTeacherForm() {
      //将更新后的值传到服务端保存
      let validate = true;

      if (validate) {
        //如果验证通过

        //提交表单事件
        this.$axios
          .get("/teacher/login", {
            params: {
              teacherNumber: this.teacherform.teacherNumber,
              password: this.teacherform.password
            }
          })
          .then(response => {
            //获取返回数据
            let msg = response.data;
            console.log(response.data);
            if (msg.code == 0) {
              this.$store.commit(
                "save_teacher",
                this.teacherform.teacherNumber
              );
              // sessionStorage.setItem("teacher", this.teacherform.teacherNumber);
              //如果登录成功
              this.$dialog
                .alert({
                  title: "系统提示",
                  message: "登录成功！"
                })
                .then(() => {
                  this.$router.push("/teacherHome");
                });
            } else {
              //如果登录失败
              this.$toast(msg.msg);
            }
          });
      }
    }
  }
};
</script>  
<style scoped>
.identityradio {
  display: flex;
  justify-content: center;
  padding-top: 3%;
  padding-bottom: 1.5%;
}
</style>