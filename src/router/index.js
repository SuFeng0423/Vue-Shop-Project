import Vue from 'vue'
import Router from 'vue-router'

const Home = ()=>import("../views/home/Home.vue")
const Fenlei = ()=>import("../views/category/Fenlei.vue")
const Cart = ()=>import("../views/cart/Cart.vue")
const User = ()=>import("../views/me/User.vue")
const Detail =()=>import ("../views/detail/Detail.vue")

Vue.use(Router)



const routes=[
  {
    path:"",
    redirect:"/home"
  },{
    path:"/home",
    component:Home
  },{
    path:"/fenlei",
    component:Fenlei
  },{
    path:"/cart",
    component:Cart
  },{
    path:"/me",
    component:User
  }, {
    path: "/detail",
    component: Detail
  },
 
];



const router=new Router({
  routes,
  mode:"history"
})

// 修改路由push方法,阻止重复点击报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// 修改路由replace方法,阻止重复点击报错
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

export default router;
