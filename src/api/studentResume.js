import request from '@/utils/request.js'
//提供调用查找接口的函数
export const searchStudentResumeByStudentIdService = (studentId) => {
    return request.get('/stuRes/searchByStudentId',{params:{studentId:studentId}})
}

//提供调用删除接口的函数
export const deleteStudentResumeByResumeIdService = (resumeId) => {
    console.log(resumeId)
    return request.delete('/stuRes/delete', {params:{resumeId:resumeId}})
}

//提供调用修改接口的函数
export const updateStudentResumeApplicationService = (studentResume) => {
    console.log(studentResume)
    return request.put('/stuRes/update', studentResume)
}

//提供调用增加接口的函数
export const addStudentResumeService = (studentResume) => {
    console.log("studentResume",studentResume)
    return request.post('/stuRes/add', studentResume)
}
