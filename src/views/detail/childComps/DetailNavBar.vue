<template>
    <div id="detailwrapper">
        <Nav-Bar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="" >
            </div>
            <div slot="center" class="title">
                <div v-for="(item,index) in titles" :key="index" class="title_item"
                :class='{active:index===currentIndex}'
                @click="titleClick(index)"
                >
                    {{item}}
                </div>
        </div>
        </Nav-Bar>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
    name:"DetailNavBar",
    components:{
        NavBar
    },
    data(){
        return {
            titles:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    created(){
      
    },
    methods:{
        titleClick(index){
            this.currentIndex=index;
            this.$emit("titleClick",index)
        },
        backClick(){
            this.$router.back()
        }
    }
}
</script>

<style scoped>
#detailwrapper{
background:#DAA520;
}
.title{
    display:flex;
    font-size: 13px;
    font-weight: bolder;
}
.title_item{
    flex: 1;
}
.active{
    color:#fff;
    font-weight: bold;
}
.back img{
    margin-bottom:10px;
}
</style>

