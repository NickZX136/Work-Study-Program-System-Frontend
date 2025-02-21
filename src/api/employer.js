import request from '@/utils/request.js'

//提供调用注册接口的函数
export const employerRegisterService = (registerData)=>{
    const params = new URLSearchParams()
    for(let key in registerData){
        params.append(key, registerData[key]);
    }
    return request.post('/employer/register',params);
}

//提供调用登录接口的函数
export const employerLoginService = (loginData)=>{
    const params = new URLSearchParams()
    for(let key in loginData){
        params.append(key, loginData[key]);
    }
    return request.post('/employer/login',params);
}

//提供调用基本信息接口的函数
export const employerInfoService = () => {
    return request.get('/employer/employerInfo')
}

//提供调用修改个人信息接口的函数
export const updateEmployerInfoService = (employerInfoData) => {
    console.log("employerInfoData：", employerInfoData);
    return request.put('/employer/updateInfo',employerInfoData)
}

//提供调用查找接口的函数
export const searchAllEmployerService = () => {
    return request.get('/employer/searchAll')
}

//提供调用删除接口的函数
export const deleteEmployerByCompanyIdService = (companyId) => {
    console.log(companyId)
    return request.delete('/employer/delete', {params:{companyId:companyId}})
}

//提供调用修改接口的函数
export const updateEmployerService = (employer) => {
    console.log(employer)
    return request.put('/employer/update', employer)
}

//提供调用修改个人密码接口的函数
export const updateEmployerPasswordService = (passwordData) => {
    console.log("PasswordData：", passwordData);
    return request.patch('/employer/updatePassword',passwordData)
}