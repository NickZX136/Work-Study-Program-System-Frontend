import request from '@/utils/request.js'
//与后端连接的部分
//提供调用注册接口的函数
export const administratorRegisterService = (registerData)=>{
    const params = new URLSearchParams()
    for(let key in registerData){
        params.append(key, registerData[key]);
    }
    return request.post('/admin/register',params);
}

//提供调用登录接口的函数
export const administratorLoginService = (loginData)=>{
    const params = new URLSearchParams()
    for(let key in loginData){
        params.append(key, loginData[key]);
    }
    return request.post('/admin/login',params);
}

//提供调用基本信息接口的函数
export const administratorInfoService = () => {
    return request.get('/admin/adminInfo')
}

//提供调用修改个人信息接口的函数
export const updateAdminInfoService = (adminInfoData) => {
    console.log("adminInfoData：", adminInfoData);
    return request.put('/admin/updateName',adminInfoData)
}

//提供调用修改个人密码接口的函数
export const updateAdminPasswordService = (adminPasswordData) => {
    console.log("adminPasswordData：", adminPasswordData);
    return request.patch('/admin/updatePassword',adminPasswordData)
}