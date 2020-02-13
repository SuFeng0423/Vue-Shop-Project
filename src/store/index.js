import vue from "vue"
import vuex from "vuex" //引用 vuex

vue.use(vuex); //注册vuex

//声明vuex
const store=new vuex.Store({
    state:{
        cartList:[]
    },
    mutations:{ 
      addCounter(state,payload){
        payload.count++
      },
      addToCart(state,payload){
        state.cartList.push(payload)
      }     
    },
    actions:{
      addCart(context, payload) {
       return new Promise((resolve,reject)=>{
          // 1.查看是否添加过
          const oldInfo = context.state.cartList.find(item => item.iid === payload.iid)
          // 2.+1或者新添加
          if (oldInfo) {
            context.commit("addCounter", oldInfo)
            resolve("添加当前商品成功")
          } else {
            payload.count = 1
            // payload.checked = true
            context.commit("addToCart", payload)
            resolve("商品已添加至购物车")
          }
       })
      }
    },
    getters:{
         cartLength(state) {
             return state.cartList.length
           },
        cartList(state) {
             return state.cartList
           }
    },
    modules:{
       
    }
})


//导出vuex
export default store;
