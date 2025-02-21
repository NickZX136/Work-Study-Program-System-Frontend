import request from '@/utils/request.js'
//提供调用查找接口的函数
export const searchAllJobPostingService = () => {
    return request.get('/jobPosting/searchAll')
}

//提供调用删除接口的函数
export const deleteJobPostingByPostingIdService = (postingId) => {
    console.log(postingId)
    return request.delete('/jobPosting/delete', {params:{postingId:postingId}})
}

//提供调用修改接口的函数
export const updateJobPostingService = (jobPosting) => {
    console.log(jobPosting)
    return request.put('/jobPosting/update', jobPosting)
}

//提供调用增加接口的函数
export const addJobPostingService = (jobPosting) => {
    console.log("jobPosting",jobPosting)
    return request.post('/jobPosting/add', jobPosting)
}

//提供调用查找接口的函数
export const searchByCompanyIdJobPostingService = (companyId) => {
    return request.get('/jobPosting/searchByCompanyId',{params:{companyId:companyId}})
}

//提供调用查找接口的函数
export const searchByCategoryNameJobPostingService = (categoryName) => {
    return request.get('/jobPosting/searchByCategoryName',{params:{categoryName:categoryName}})
}