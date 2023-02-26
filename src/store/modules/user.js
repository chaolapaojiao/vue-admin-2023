import { getToken, setToken, removeToken, setTimeKey } from "@/utils/auth"
import { login, getInfo, getUserDetail } from "@/api/user"
const state = {
  token: getToken(),
  userInfo: {}
}
const actions = {
  // 登录请求
  async login({ commit }, data) {
    const res = await login(data)
    if (res.data.success) {
      commit('setToken', res.data.data)
      setTimeKey()
    }
  },
  // 获取用户资料
  async getUserInfo({ commit }) {
    const { data } = await getInfo()
    const { data: detailData } = await getUserDetail(data.data.userId)
    if (data.success && detailData) {
      const result = { ...data.data, ...detailData.data }
      commit('setUserInfo', result)
      return data
    }
  },
  // 退出登录
  async logout({ commit }) {
    commit('removeToken')
    commit('removeUserInfo')
  }
}
const mutations = {
  // 设置token
  setToken(state, token) {
    setToken(token)
    state.token = token
  },
  // 设置用户资料
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
  // 移除token
  ,
  removeToken(state) {
    state.token = ''
    removeToken()
  },
  // 移除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}