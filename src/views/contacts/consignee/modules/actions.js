import * as types from './mutationTypes'
import server from '@/libs/server'
/** 获取收货人列表 */
export const getConsigneeList = ({ commit }) => {
  commit(types.GET_CONSIGNEE_LIST)
  return server({
    url: 'consigner/consignee/list',
    method: 'get'
  }).then((res) => {
    commit(types.GET_CONSIGNEE_LIST, res.data.data)
  })
}
/** 获取发货人列表 */
export const getConsignerList = ({ commit }) => {
  commit(types.GET_CONSIGNER_LIST)
  return server({
    url: 'consigner/list',
    method: 'get'
  }).then((res) => {
    commit(types.GET_CONSIGNER_LIST, res.data.data)
  })
}
/** 获取收货人详情 */
export const getConsigneeDetail = ({ commit }, id) => {
  commit(types.GET_CONSIGNEE_DETAIL)
  return server({
    url: 'consigner/consignee/list',
    method: 'get',
    data: {
      id: id
    }
  }).then((res) => {
    commit(types.GET_CONSIGNEE_DETAIL, res.data.data)
  })
}

/** 新增收货人 */
export const addConsignee = ({ commit }, data) => {
  return server({
    url: 'consigner/consignee/add',
    method: 'post',
    data: data
  })
}

/** 删除收货人 */
export const delConsignee = ({ commit }, id) => {
  return server({
    url: 'consigner/consignee/delete',
    method: 'delete',
    data: {
      id: id
    }
  })
}

/** 修改收货人 */
export const updateConsignee = ({ commit }, data) => {
  return server({
    url: 'consigner/consignee/update',
    method: 'post',
    data: data
  })
}

/** 存储选择的发货方 */
export const saveConsignerInfo = ({ commit }, data) => {
  commit(types.SAVE_CONSIGNER, data)
}
