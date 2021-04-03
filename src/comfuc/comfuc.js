import axios from 'axios'
import {BASE_URL} from './comenv'

const TOKEN_NAME = 'hkzf_token'
const getToken = () => localStorage.getItem(TOKEN_NAME)
const setToken = value => localStorage.setItem(TOKEN_NAME, value)
const removeToken = () => localStorage.removeItem(TOKEN_NAME)
const isAuth = () => !!getToken()

const API = axios.create({
  baseURL: BASE_URL
})
API.interceptors.request.use(config => {
  const { url } = config
  console.log(url)
  if (
    url.startsWith('/user') &&
    !url.startsWith('/user/login') &&
    !url.startsWith('/user/registered')
  ) {
    config.headers.Authorization = getToken()
  }
  return config
})
API.interceptors.response.use(response => {
  const { status } = response.data
  if (status === 400) {
    removeToken()
  }
  return response
})
const TOKEN_NAMEs = 'zfsj'
const getCity = () => JSON.parse(localStorage.getItem(TOKEN_NAMEs)) || {}
const setCity = value => localStorage.setItem(TOKEN_NAMEs, value)
export { getCity, setCity }
export { API,getToken,setToken,isAuth,removeToken}
export function getCurrentCity(){
  // const localcity = JSON.parse(localStorage.getItem('zfsj'))
  let localcity
  try{
    localcity = JSON.parse(localStorage.getItem('zfsj'))
  } catch (err) {
    localcity = null
  }
  if ( !localcity) {

    return new Promise((resove,reject) => {
      const getCity = new window.BMapGL.LocalCity()
      getCity.get(result =>{
      axios.get(BASE_URL + `/area/info?name=${result.name}`)
        .then(result =>{
          localStorage.setItem('zfsj',JSON.stringify(result.data.body))
          resove(result.data.body)
        }).catch(error => reject(error))
      })
    })
  } else {
    return  new Promise((resove) => {
      resove(JSON.parse(localStorage.getItem("zfsj")))
    })
  }
}