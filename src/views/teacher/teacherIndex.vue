<template>
  <div>
    <!-- 路由显示 -->
    <router-view></router-view>

    <!-- 底部固定标签栏 -->
    <van-tabbar route v-model="active">
      <van-tabbar-item replace to="/teacherHome" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/records" icon="records">任务</van-tabbar-item>
      <van-tabbar-item replace to="/teacherFriends" icon="friends-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      active: "home"
    };
  },

  methods: {}
};
</script>