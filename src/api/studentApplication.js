import request from '@/utils/request.js'
//提供调用查找接口的函数
export const searchAllStudentApplicationService = () => {
    return request.get('/stuApp/searchAll')
}

//提供调用删除接口的函数
export const deleteStudentApplicationByApplicationIdService = (applicationId) => {
    console.log(applicationId)
    return request.delete('/stuApp/delete', {params:{applicationId:applicationId}})
}

//提供调用修改接口的函数
export const updateStudentApplicationService = (studentApplication) => {
    console.log("studentApplication",studentApplication)
    return request.put('/stuApp/update', studentApplication)
}

//提供调用增加接口的函数
export const addStudentApplicationService = (studentApplication) => {
    console.log("studentApplication",studentApplication)
    return request.post('/stuApp/add', studentApplication)
}

//提供调用查找接口的函数
export const searchStudentApplicationByCompanyIdService = (companyId) => {
    return request.get('/stuApp/searchByCompanyId', {params:{companyId:companyId}})
}

//提供调用查找接口的函数
export const searchStudentApplicationByStudentIdService = (studentId) => {
    return request.get('/stuApp/searchByStudentId', {params:{studentId:studentId}})
}