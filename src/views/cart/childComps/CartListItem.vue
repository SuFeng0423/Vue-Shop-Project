<template>
  <div id="shop-item">
    <!-- <div class="item_selector">
      <Check-Button :is-checked="itemInfo.checked" @click.native="checkClick"></Check-Button>
    </div> -->
    <div class="item-img">
      <img :src="itemInfo.imgURL" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.newPrice}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  // import CheckButton from "./CheckButton.vue"

  export default {
    name: "ShopCartItem",
    components: {
      // CheckButton
    },
    props: {
      itemInfo: Object,
      default(){
        return {}
      }
    },
    
    methods: {
      checkClick() {
        this.itemInfo.checked = !this.itemInfo.checked;
      }
    },

  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px 0;
    border-bottom: 1px solid #ccc;
  }

  #shop-item .item_selector {
    width: 100px;
    display: flex; 
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px 0;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 70px;
    height: 90px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 14px;
    color: #333;
    /* padding: 5px 2px 5px 0; */
    margin-top:7px;
    position: relative;
    overflow: hidden;
    font-weight: bold;
  }
.item-info .item-title{
  margin:0 0 0 7px;
}
  .item-info .item-desc {
    font-size: 10px;
    color: #666;
    margin:16px 0 0 7px;
  }

  .info-bottom {
    /* margin-top: 10px; */
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    top:74px;
  }

  .info-bottom .item-price {
    color: orangered;
    margin-bottom: 7px;
  }
  #shop-item .item-info .info-bottom .left{
    float:left;
  }
  #shop-item .item-info .info-bottom .right{
    float:right;
    margin-right:14px;
  }
</style>
