import Api from './Api'

const service = {}

service.get = async () => {
  return Api.get(`/someRoute`)
}

export default service