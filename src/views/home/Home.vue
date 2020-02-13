<template>
  <div id="home" >
     <Nav-Bar class="home_nav">
       <div slot="center">购物天地</div>
     </Nav-Bar>
     <Tab-Control 
              :titles='["流行","新款","精选"]' 
              @tabClick="tabClick"
              ref="tabcontrol1"
              class="tab_control"
              v-show="isTabFixed"
          />
     <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" @pullingUp="loadMore" :pull-up-load="true">
          <home-swiper :banners="banners" @homeImgLoad="homeImgLoad" ref="hSwiper"></home-swiper>
          <Recommend-View :recommends="recommends"></Recommend-View>
          <Feature-View/>
          <Tab-Control 
              :titles='["流行","新款","精选"]' 
              @tabClick="tabClick"
              ref="tabcontrol2"
              
          />
          <Goods-List :goods="showGoods"/>
     </scroll>
     <Go-To-Top @click.native="backTop" v-show="showBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import scroll from "components/common/scroll/Scroll"
  import GoToTop from "components/content/backTop/BackTop"

  import {debounce} from "../../common/utils"
  import {getBannerData, getHomeGoods} from "network/home";

  import {itemImgListener,backTopMixin} from "../../common/mixin";
  

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      scroll,
      GoToTop
    },
    mixins:[
      itemImgListener,
      backTopMixin
      ],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        
        offsetTop:300,
        isTabFixed:false,
        saveY:0
      }
    },
    
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
      },
    created() {
      // 1.请求多个数据
      this.getBannerData()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      
    },
    activated: function () {
      this.$refs.scroll.refresh()//避免回到顶部
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      
    },
    deactivated: function () {
      this.saveY=this.$refs.scroll.getScrollY();

      this.$bus.$off("goodsLoad",()=>{
        refresh()})
    },
    mounted(){
      
    },
    
    methods: {
      // 事件监听相关的方法
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabcontrol1.currentIndex=index;
        this.$refs.tabcontrol2.currentIndex=index;
      },
      
      contentScroll(position) {
        this.showBackTop= (-position.y) > 800
        this.isTabFixed = (-position.y-44) > this.offsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        //刷新滚动区域，图片存在异步加载
        this.$refs.scroll.scroll.refresh();
      },
      homeImgLoad(){
        // console.log(this.$refs.tabControl.$el.offsetTop)
        this.offsetTop=this.$refs.tabcontrol2.$el.offsetTop
      },

      //  网络请求相关的方法 
      getBannerData() {
        getBannerData().then(res => {
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(page,type ).then(res => {
          // console.log(res.data.data.list)
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /* width:100vw; */
    height: 100vh;
    position: relative;
  }

  .home_nav {
    background-color: yellowgreen;
    color: #fff;
    font-weight: bold;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
.fixed{
  position: fixed;
  left:0;
  right:0;
  top:44px;
  
}
.tab_control{
  position: relative;
  z-index: 9;
}
  .content {
    position: absolute;
    top:44px;
    bottom:49px;
    left:0;
    right:0;
    overflow: hidden;
  }
</style>
