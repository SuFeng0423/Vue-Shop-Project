import {request} from "./request";

export function getBannerData(){
    return request({
        url:"/home/multidata"
    })
}

export function getHomeGoods(page,type){
    return request({
        url:"/api/hy/home/data",
        params:{
            type,
            page
        }
    })
}