import axios from '@/libs/server'
import * as types from './mutationTypes'

/* 承运商列表（和熟车司机公用） */
export const queryCarrier = ({ commit }, params) => {
  return axios({
    url: '/carrier/list',
    method: 'get',
    params
  })
    .then(res => commit(types.CARRIER, res.data.data))
}

/* 承运商详情 */
export const getCarrier = ({ commit }, carrierId) => {
  return axios({
    url: '/carrier/details/for/company',
    method: 'get',
    params: { carrierId }
  })
}

/* 添加承运商 */
export const createCarrier = ({ commit }, data) => {
  return axios({
    url: '/carrier/add/for/company',
    method: 'post',
    data
  })
}

/* 修改承运商 */
export const updateCarrier = ({ commit }, data) => {
  return axios({
    url: '/carrier/for/company/update',
    method: 'delete',
    data
  })
}

/* 删除承运商 */
export const deleteCarrier = ({ commit }, carrierId) => {
  return axios({
    url: '/carrier/delete'
  })
    .then(res => commit(types.CARRIER_DETAIL, res.data.data))
}
