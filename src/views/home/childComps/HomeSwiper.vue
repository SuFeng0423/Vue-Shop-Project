<template>
  <swiper class="home_swiper" ref="swiper" v-if="banners.length" >
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" @load="homeImgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import Swiper from 'components/common/swiper/Swiper.vue'
  import SwiperItem from 'components/common/swiper/SwiperItem.vue'
	export default {
		name: "HomeSwiper",
    components: {
		  Swiper,
      SwiperItem
    },
    props: {
		  banners: {
		    type: Array,
        default: []
      }
    },
    data(){
      return {
        isload:false
      }
    },
    methods: {
      homeImgLoad(){
        if(!this.isload){
          this.$emit("homeImgLoad")
          this.isload=true;
        }
      },
		  // stopTimer() {
		  //   this.$refs.swiper.stopTimer()
      // },
      // startTimer() {
		  //   if (this.$refs.swiper) {
      //     this.$refs.swiper.startTimer()
      //   }
      // }
    }
	}
</script>

<style scoped>
.home_swiper{
  margin-top:40px;
}
</style>
