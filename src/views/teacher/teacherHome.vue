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

      <!-- 查询指导过的专业群年级 -->
      <van-cell title="查询指导过的专业群年级" is-link to="/professionalGrade" />
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
    };
  },
  methods: {}
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
/* .van-nav-bar {
  background-color: #2392a0;
  color: #ffffff;
}
.van-nav-bar title{
  color: #ffffff;
} */
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
  border: #2392a0#2392a0 1px solid;
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
</style>