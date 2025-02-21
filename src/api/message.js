import request from '@/utils/request.js'

//提供调用查找接口的函数
export const searchAllMessageService = () => {
    return request.get('/message/searchAll')
}

//提供调用删除接口的函数
export const deleteMessageByMessageIdService = (messageId) => {
    console.log(messageId)
    return request.delete('/message/delete', {params:{messageId:messageId}})
}

//提供调用增加接口的函数
export const addMessageService = (message) => {
    console.log(message)
    return request.post('/message/add', message)
}

//提供调用修改接口的函数
export const updateMessageService = (message) => {
    console.log(message)
    return request.put('/message/update', message)
}

export const searchMessageByMessageIdService = (messageId) => {
    return request.get('/message/searchByMessageId', {params:{messageId:messageId}})
}
