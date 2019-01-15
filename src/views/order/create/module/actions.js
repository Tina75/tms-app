import Server from '@/libs/server'

export default {
  getOpetator: async () => {
    const { data } = await Server({
      url: '/permission/buttOperator',
      method: 'get'
    })
    return data.data
  }
}
