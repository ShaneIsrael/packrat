import Api from './Api'

const service = {}

service.get = () => {
  return Api.get(`/someRoute`)
}

export default service