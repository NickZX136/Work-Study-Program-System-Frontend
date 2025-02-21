import request from '@/utils/request.js'
//提供调用查找接口的函数
export const searchAllEmploymentService = () => {
    return request.get('/employment/searchAll')
}

//提供调用按companyId查找接口的函数
export const searchEmploymentByCompanyIdService = (companyId) => {
    return request.get('/employment/searchByCompanyId', {params:{companyId:companyId}})
}

//提供调用按studentId查找接口的函数
export const searchEmploymentByStudentIdService = (studentId) => {
    return request.get('/employment/searchByStudentId', {params:{studentId:studentId}})
}

//提供调用删除接口的函数
export const deleteEmploymentByEmploymentIdService = (employmentId) => {
    console.log(employmentId)
    return request.delete('/employment/delete', {params:{employmentId:employmentId}})
}

//提供调用修改接口的函数
export const updateEmploymentService = (employment) => {
    console.log(employment)
    return request.put('/employment/update', employment)
}

//提供调用增加接口的函数
export const addEmploymentService = (employment) => {
    console.log("employment",employment)
    return request.post('/employment/add', employment)
}