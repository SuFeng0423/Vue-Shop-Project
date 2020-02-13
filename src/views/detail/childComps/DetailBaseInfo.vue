<template>
  <div v-if="Object.keys(goods).length !== 0" class="base_info">
    <div class="info_title">{{goods.title}}</div>
    <div class="info_price">
      <span class="n_price">{{goods.newPrice}}</span>
      <span class="o_price">{{goods.oldPrice}}</span>
      <span :class="{discount:isDiscountShow}">{{goods.discount }}</span>
    </div>
    <div class="info_other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info_service">
      <span class="info_service_item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailBaseInfo",
    props: {
		  goods: {
		    type: Object
      }
    },
    data(){
      return {
        discount:false
      }
    },
    computed:{
      isDiscountShow(){
        if(this.goods.discount==""){
          return this.discount=false
        }else{
          return this.discount=true
        }
      }
    }
	}
</script>

<style scoped>
  .base_info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .info_title {
    color: #222;
    line-height: 1.35;
    font-size:14px;
    text-indent:2em;
  }

  .info_price {
    margin-top: 15px;
  }

  .info_price .n_price {
    font-size: 18px;
    color: #ff5777;
  }

  .info_price .o_price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }

  .info_price .discount {
        font-size: 12px;
    padding: 1.5px 5px;
    color: #fff;
    background-color: #ff5777;
    border-radius: 8px;
    margin-left: 5px;

    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -8px;
  }

  .info_other {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }

  .info_service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }

  .info_service_item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: -23px;
  }

  .info_service_item span {
    font-size: 13px;
    color: #333;
  }
</style>
