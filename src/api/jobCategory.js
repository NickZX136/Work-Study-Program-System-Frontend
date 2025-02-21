import request from '@/utils/request.js'

//提供调用查找接口的函数
export const searchAllJobCategoryService = () => {
    return request.get('/jobCategory/searchAll')
}

//提供调用删除接口的函数
export const deleteJobCategoryByCategoryIdService = (categoryId) => {
    console.log(categoryId)
    return request.delete('/jobCategory/delete', {params:{categoryId:categoryId}})
}

//提供调用修改接口的函数
export const updateJobCategoryService = (category) => {
    console.log(category)
    return request.put('/jobCategory/update', category)
}

//提供调用增加接口的函数
export const addJobCategoryService = (category) => {
    console.log(category)
    return request.post('/jobCategory/add', category)
}

//提供调用查找接口的函数
export const searchJobCategoryByJobCategoryNameService = (categoryName) => {
    return request.get('/jobCategory/searchByCategoryName', {params:{categoryName:categoryName}})
}