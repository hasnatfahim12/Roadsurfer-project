import { Axios } from 'axios'

const axios = new Axios({
    baseURL: '/',
    headers: {
      'Content-Type': 'application/json',
    },
  })


export const get = async (url, params) => {
  return axios({
    method: 'GET',
    url,
    params
  })
}


