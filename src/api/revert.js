import request from '@/utils/request.js'

//提供调用查找接口的函数
export const searchAllRevertService = (messageId) => {
    return request.get('/revert/searchByMessageId', {params:{messageId:messageId}})
}

//提供调用增加接口的函数
export const addRevertService = (revert) => {
    console.log(revert)
    return request.post('/revert/add', revert)
}

//提供调用修改接口的函数
export const updateRevertService = (revert) => {
    console.log(revert)
    return request.put('/revert/update', revert)
}

//提供调用删除接口的函数
export const deleteRevertByRevertIdService = (revertId) => {
    console.log(revertId)
    return request.delete('/revert/delete', {params:{revertId:revertId}})
}