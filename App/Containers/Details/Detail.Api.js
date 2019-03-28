import apisauce from 'apisauce'
import Config from 'react-native-config'

const create = (baseURL = Config.API_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    timeout: 30000
  })
  const onFetchUserApi = (body) => {
    return api.get('search/users', {q: body.username})
  }
  const  onChangePasswordApi =(body)=> {
    return api.get('/district/districts', {page: body.page, pageSize: body.pageSize,
      data: encodeURIComponent(JSON.stringify(body.data))
      })
  }
  return {
    onFetchUserApi,
    onChangePasswordApi
  }
}
export default {create}
