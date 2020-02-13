import axios from "axios"

export function request(config){
    //1、注册axios
    const req=axios.create({
        // baseURL: "http://123.207.32.32:8000",
        baseURL: "http://106.54.54.237:8000",
        timeout:5000
    })
    //2、设置网络拦截器
    req.interceptors.request.use(
        res=>{
            //请求成功拦截
            return res
        },
        err=>{

        }
    )
    req.interceptors.response.use(
        res=>{
            //请求成功拦截
            return res
        },
        err=>{

        }
    )
    //3、发送网络请求
    return req(config)
}
