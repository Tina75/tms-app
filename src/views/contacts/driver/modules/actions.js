import * as types from './mutationTypes'
import server from '@/libs/server'

/** 获取司机列表 */
export const getDriverList = ({ commit }) => {
  commit(types.GET_DRIVER_LIST)
  return server({
    url: '',
    method: 'get'
  }).then((res) => {
    commit(types.GET_DRIVER_LIST, res.data.data)
  })
}

/** 获取司机详情 */
export const getDriverDetail = ({ commit }) => {
  commit(types.GET_DRIVER_DETAIL)
  return server({
    url: 'carrier/details/for/driver',
    method: 'post'
  }).then((res) => {
    commit(types.GET_DRIVER_DETAIL, res.data.data)
  })
}
