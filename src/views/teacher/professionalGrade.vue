<template>
  <div>
    <!-- <van-cell title="查询指导过的专业群年级" is-link to="/professionalGrade" /> -->

    <div class="nar">
      <span>
        <router-link to="/teacherHome" style="float:left;color:#ffffff">
          <van-icon name="arrow-left" />
        </router-link>指导过的专业群年级
      </span>
    </div>
    <!-- <h3> <router-link to="/teacherHome" style="float:left;color:black;font-size:16px"><van-icon name="arrow-left" /></router-link>指导过的专业群年级</h3> -->
    <template v-if="professionalData==null">
      <p>你还未指导过专业群年级！</p>
    </template>
    <template v-else>
      <div
        @click="getStudent(grade.id)"
        v-for="(grade,index) in professionalData"
        :key="index"
      >
        <van-cell
          is-link
          @click="showStudentPopup"
        >{{grade.grades.name}}{{grade.professional.name}}实习生信息</van-cell>
        <van-popup closeable v-model="showStudent" position="bottom" :style="{ height: '100%' }">
          <h3>实习学生</h3>
          <template v-if="studentData==null">
            <p>你还未选择实习老师！</p>
          </template>
          <template v-else>
            <table class="tab">
              <tr>
                <th>学号</th>
                <th>学生姓名</th>
                <th>班级</th>
              </tr>
              <tr v-for="(student,index) in studentData" :key="index">
                <td>{{student.student.studentNumber}}</td>
                <td>{{student.student.name}}</td>
                <td>{{student.student.classes.grades.name}}&nbsp;{{student.student.classes.major.name}}&nbsp;{{student.student.classes.name}}</td>
              </tr>
            </table>

            <p>学生总数：{{studentdata.totalRecords}}</p>
            <!-- <van-pagination
              v-model="page"
              :show-page-size="5"
              :total-items="totalRecords"
              :items-per-page="limit"
            /> -->
  <!-- 分页的点击事件-->
   <div class="page_area">
     <span class="horizon" @click="primaryPage">首页</span>
    <span class="horizon"  @click="prePage">上一页</span>
    <span class="horizon">第{{page}}页,共{{Math.ceil(studentdata.totalRecords/limit)}}页</span>
    <span class="horizon" @click="nextPage"> 下一页</span>
    <span class="horizon" @click="lastPage"> 尾页</span>

   </div>


          </template>
        </van-popup>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      professionalData: [],
      showStudent: false, //默认指导过的专业群年级为未显示状态
      studentData: [],
      studentdata: [],
      page: 1, //当前页
      limit: 5, //每页显示多少条
      maxPage: "", //最大页数
      totalRecords: "" //总数
      
    };
  },
  mounted() {
    this.getProfessional();
  },
  methods: {
    // 显示选择的实习学生
    showStudentPopup() {
      this.showStudent = true;
    },
    // 首页 
     primaryPage(){
      this.page = 1
    },
    // 下一页 
   nextPage(){
      if(this.page == Math.ceil(this.studentdata.totalRecords/this.limit)){
        return
      }
      this.page = this.page+1;
    },
    // 上一页 
    prePage(){
      if(this.page == 1){
        return
      }
      this.page = this.page-1;
    },
    // 尾页 
    lastPage(){
      this.page = Math.ceil(this.studentdata.totalRecords/this.limit)
    },
    // 获取已选择的实习学生的信息
    getStudent(id) {
        //  console.log(id)
      this.$axios
        .get("/teacher/getStudent", {
          params: {
            professionalGradeId: id,
            page: this.page,
            limit: this.limit
          }
        })
        .then(response => {
          let msg = response.data;
            // console.log(response.data);
          if (msg.code == 0) {
            this.studentData = msg.data.list;
            this.studentdata = msg.data;
            this.page=msg.data.page;
            this.limit=msg.data.limit;
         
          } else {
            this.$toast(msg.msg);
          }
        });
    },
    
    // 获取指导过的专业群年级的信息
    getProfessional() {
      this.$axios.get("/teacher/getProfessionalGrade").then(response => {
        let msg = response.data;
        if (msg.code == 0) {
          this.professionalData = msg.data;
          // console.log(msg.data);
        } else {
          this.$toast(msg.msg);
        }
      });
    }
  },
};
</script>
<style scoped>
.tab {
  border: #2392a0 1px solid;
  width: 100%;

  font-size: 14px;
  /* margin-top: 11%; */
}
table,
th,
td {
  border: #2392a0 1px solid;
  border-collapse: collapse;
}
.nar {
  width: 100%;
  height: 46px;
  color: #ffffff;
  background-color: #2392a0;
  line-height: 45px;
}
.nar span {
  text-align: center;
  /* padding-left: 35px; */
}

/* .page_area{
	margin-left:380px;
	margin-top:340px;
} */
</style>