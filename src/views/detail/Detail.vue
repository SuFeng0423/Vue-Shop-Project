<template>
  <div id="detail">
    <detail-nav-bar ref="nav" @titleClick="titleClick" :current-index="currentIndex" 
    id="detail_nav"
    ></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :data="[topImages, goods, shop, detailInfo, paramInfo, commentInfo, recommends]"
            :probe-type="3">
      <div>
        <detail-swiper ref="base" :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
        <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <Goods-List ref="recommend" :goods="recommends"></Goods-List>
      </div>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <Go-To-Top @click.native="backTop" class="back_top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </Go-To-Top>
    
  </div>
</template>

<script>
  import Scroll from 'common/scroll/Scroll'

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import GoodsList from 'components/content/goods/GoodsList'

  import DetailBottomBar from './childComps/DetailBottomBar'
  import GoToTop from 'content/backTop/BackTop'

  import {getDetailData, getRecommendData, GoodsInfo, Shop, GoodsParam} from "network/detail";
  import {itemImgListener,backTopMixin} from "@/common/mixin";
  import {BACKTOP_DISTANCE} from "@/common/const";

  export default {
		name: "Detail",
    components: {
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
		  Scroll,
		  DetailNavBar,
      DetailSwiper,
      GoToTop
    },
    data() {
		  return {
		    iid: null,
		    topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTops: [],
        currentIndex: 0,
        
      }
    },
    mixins:[itemImgListener,backTopMixin],
    created() {
		  this.getDetailData()
      this.getRecommendData()
    },
    updated() {
		  // 获取需要的四个offsetTop
      this.getOffsetTops()
    },
    mounted(){
      
    },
    destroyed(){
      this.$bus.$off("goodsLoad",()=>{
        refresh()
      })
    },
    methods: {
      
		  getOffsetTops() {
		    this.themeTops = []
        this.themeTops.push(this.$refs.base.$el.offsetTop)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        this.themeTops.push(Number.MAX_VALUE)
      },
      contentScroll(position) {
		    // 1.监听backTop的显示
        this.showBackTop = position.y < -BACKTOP_DISTANCE

        // 2.监听滚动到哪一个主题
        this.listenScrollTheme(position)
      },
      listenScrollTheme(position) {
        
        let length = this.themeTops.length;
        for (let i = 0; i < length-1; i++) {
          let iPos = this.themeTops[i];
         if( 
           this.currentIndex!==i 
           && 
           ((-position.y) > this.themeTops[i] 
           && 
           (-position.y) < this.themeTops[i+1]
           )){
            this.currentIndex=i;
            this.$refs.nav.currentIndex=this.currentIndex;
         }
          
        }
      },
      titleClick(index) {
       
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 100)
      },
      addToCart() {
        // 1.创建对象
        const obj = {}
        // 2.对象信息
        // obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.nowPrice;
        obj.iid=this.iid;
        // 3.添加到Store中
        this.$store.dispatch('addCart', obj).then(res=>{
          this.$toast.show(res,2000)
        })
      },
		  getDetailData() {
		    // 1.获取iid
        this.iid = this.$route.query.iid;
        // 2.请求数据
        getDetailData(this.iid).then(res => {
          // 2.1.获取结果
          const data = res.data.result;
          // 2.2.获取顶部信息
          this.topImages = data.itemInfo.topImages;

          // 2.3.获取商品信息
          this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);

          // 2.4.获取店铺信息
          this.shop = new Shop(data.shopInfo);

          // 2.5.获取商品信息
          this.detailInfo = data.detailInfo

          // 2.6.保存参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

          // 2.7.保存评论信息
          if (data.rate.cRate!==0) {
            this.commentInfo = data.rate.list[0];
          }
        })
      },
      getRecommendData() {
        getRecommendData().then((res) => {
          // console.log(res.data.data.list)
          this.recommends = res.data.data.list
        })
      }
    }
	}
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: fixed;
    top:0;
    left:0;
    right:0;
    z-index: 9;
    background-color: #fff;
  }
#detail_nav{
  position: relative;
  background:#F08080;
  z-index: 9;
}
  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }

  .back_top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  }
</style>
