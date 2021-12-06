import { ACTIONS } from './actions.js'

class LocalStorage {

  action(actionType, key = '', value = '') {
    switch (actionType) {
      case ACTIONS.GET:
        return localStorage.getItem(key) || ''
      case ACTIONS.SET:
        localStorage.setItem(key, value)
        return ''
      case ACTIONS.CLEAR:
        localStorage.clear()
        return ''
      default:
        return ''
    }
  }

  setJWT(value) {
    this.action(ACTIONS.SET, 'jwt', value)
  }

  getJWT() {
    return this.action(ACTIONS.GET, 'jwt')
  }

  setUSERID(value) {
    this.action(ACTIONS.SET, 'id', value)
  }

  getUSERID(){
    return this.action(ACTIONS.GET, 'id')
  }
  clear(){
    this.action(ACTIONS.CLEAR)
  }

}

export default new LocalStorage()
