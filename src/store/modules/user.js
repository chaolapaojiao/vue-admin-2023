import { getToken, setToken } from "@/utils/auth"
import { login } from "@/api/user"
const state = {
  token: getToken()
}
const actions = {
  // 登录请求
  async login({ commit }, data) {
    const res = await login(data)
    if (res.data.success) {
      commit('setToken', res.data.data)
    }
  }

}
const mutations = {
  // 设置token
  setToken(state, token) {
    setToken(token)
    state.token = token

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}