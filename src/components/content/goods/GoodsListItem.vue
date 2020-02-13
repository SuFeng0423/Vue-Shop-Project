<template>
  <div class="goods_item" @click="itemClick">
      <img v-lazy="showImage"  @load="imgLoad"/>
      <div class="goods_info">
        <p>{{goodslist.title}}</p>
        <span class="price">{{goodslist.price}}</span>
        <span class="collect">{{goodslist.cfav}}</span>
      </div>
  </div>
</template> 

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodslist: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed:{
      showImage(){
        return   this.goodslist.image || this.goodslist.show.img
      }
    },
    methods:{
      imgLoad(){
        this.$bus.$emit("goodsLoad")
      },
      itemClick(){
        // console.log(this.goodslist)
        this.$router.push({
            path:'/detail',
            query:{
              iid:this.goodslist.iid
            }
        }
          
        )
      }
    }
  }
</script>

<style scoped>
  .goods_item {
    padding-bottom: 40px;
    position: relative;
    margin-bottom: 10px;
    width: 48%;
  }

  .goods_item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods_info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods_info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods_info .price {
    color: #FF4500;
    margin-right: 20px;
  }

  .goods_info .collect {
    position: relative;
  }

  .goods_info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
