<template>
<div id="cart">
  <scroll class="content" ref="scroll">
    <div>
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
     
    </div>
  </scroll>
  </div>
</template>

<script>
  import Scroll from 'common/scroll/Scroll'
  import CartListItem from './CartListItem'

  import {mapGetters} from "vuex"

	export default {
		name: "CartList",
    components: {
		  Scroll, CartListItem
    },
    props: {
		  cartListData: {
		    type: Array,
        default() {
		      return []
        }
      }
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated(){
      this.$refs.scroll.refresh()
    }
	}
</script>

<style scoped>
#cart{
    height:calc(100% - 44px - 49px - 40px);
}
.content{
  height: 100%;
  overflow: hidden;
}
</style>
