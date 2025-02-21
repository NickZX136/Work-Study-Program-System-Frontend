import request from '@/utils/request.js'
//提供调用查找接口的函数
export const searchAllEvaluationService = () => {
    return request.get('/evaluation/searchAll')
}

//提供调用删除接口的函数
export const deleteEvaluationByEvaluationIdService = (evaluationId) => {
    console.log(evaluationId)
    return request.delete('/evaluation/delete', {params:{evaluationId:evaluationId}})
}

//提供调用修改接口的函数
export const updateEvaluationService = (evaluation) => {
    console.log(evaluation)
    return request.put('/evaluation/update', evaluation)
}

//提供调用增加接口的函数
export const addEvaluationService = (evaluation) => {
    console.log("evaluation",evaluation)
    return request.post('/evaluation/add', evaluation)
}

//提供按companyId调用查找接口的函数
export const searchByCompanyIdEvaluationService = (companyId) => {
    return request.get('/evaluation/searchByCompanyId', {params:{companyId:companyId}})
}

//提供按studentId调用查找接口的函数
export const searchByStudentIdEvaluationService = (studentId) => {
    console.log("studentId",studentId)
    return request.get('/evaluation/searchByStudentId', {params:{studentId:studentId}})
}