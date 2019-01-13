import * as types from './mutationTypes'
import server from '@/libs/server'
/** 获取收货人列表 */
export const getDriverList = ({ commit }) => {
  commit(types.GET_DRIVER_LIST)
  return server({
    url: '',
    method: 'get'
  }).then((res) => {
    commit(types.GET_DRIVER_LIST, res.data.data)
  })
}
