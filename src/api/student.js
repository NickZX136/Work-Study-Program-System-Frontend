import request from '@/utils/request.js'

//提供调用注册接口的函数
export const studentRegisterService = (registerData)=>{
    const params = new URLSearchParams()
    for(let key in registerData){
        params.append(key, registerData[key]);
    }
    return request.post('/stu/register',params);
}

//提供调用登录接口的函数
export const studentLoginService = (loginData)=>{
    const params = new URLSearchParams()
    for(let key in loginData){
        params.append(key, loginData[key]);
    }
    return request.post('/stu/login',params);
}

//提供调用查找接口的函数
export const searchAllStudentService = () => {
    return request.get('/stu/searchAll')
}

//提供调用删除接口的函数
export const deleteStudentByStudentIdService = (studentId) => {
    console.log(studentId)
    return request.delete('/stu/delete', {params:{studentId:studentId}})
}

//提供调用修改接口的函数
export const updateStudentService = (student) => {
    console.log(student)
    return request.put('/stu/update', student)
}

//提供调用基本信息接口的函数
export const studentInfoService = () => {
    return request.get('/stu/stuInfo')
}

//提供调用修改个人密码接口的函数
export const updateStuPasswordService = (stuPasswordData) => {
    console.log("stuPasswordData：", stuPasswordData);
    return request.patch('/stu/updatePassword',stuPasswordData)
}