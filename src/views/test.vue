<template>
  <div id="app">
    <template>
      <table class="tab" id="productTable">
        <tr>
          <th>产品图片</th>
          <th>名称</th>
          <th>所属栏目</th>
          <th>优先级</th>
          <th>预览图</th>
          <th>现价</th>
          <th>原价</th>
          <th>库存</th>
          <th>人气</th>
          <th>推荐指数</th>
          <th>操作</th>
        </tr>

        <tr v-for="(product,index) in productArray" :key="index">
          <td>
            <img :src="product.picUrl" width="80" height="60" />
          </td>
          <td>{{product.name}}</td>
          <td>{{product.productType.name}}</td>
          <td>{{product.orderNum}}</td>
          <td>{{product.previewPictures.length}}</td>
          <td>{{product.price}}</td>
          <td>{{product.originalPrice}}</td>
          <td>{{product.repository}}</td>
          <td>{{product.click}}</td>
          <td>{{product.recommendation}}</td>
          <td>
            <button @click="remove(product.id,index)">删除</button>
            <button>购买</button>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>
<style scoped>
.tab {
  border: thistle 1px solid;
  width: 100%;

  font-size: 14px;
}
table,
th,
td {
  border: thistle 1px solid;
  border-collapse: collapse;
}
</style>
<script>
export default {
  data() {
    return {
      productArray: []
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.$axios
        .get("/api/shop/product/hitProducts")
        .then(repsonse => {
          let msg = repsonse.data;
          if (msg.code == 0) {
            this.productArray = msg.data;
          }
        })
        .catch(error => {
          alert("获取数据失败！");
        });
    },
    remove(prodevtId, index) {
      this.productArray.splice(index, 1);
    }
  }
};
</script>