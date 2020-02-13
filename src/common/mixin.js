import {POP, NEW, SELL} from "./const";
import {debounce} from "./utils"

export const backTopMixin = {
  data: function () {
    return {
      showBackTop: false
    }
  },
  methods: {
    backTop: function () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      // console.log(this.currentType);
    }
  }
}

export const itemImgListener={
  data(){
    return {
        refresh:null
    }
  },
    mounted(){
      this.refresh = debounce(this.$refs.scroll.refresh, 200);
      this.$bus.$on("goodsLoad", () => {
        this.refresh()
      })
    }
}