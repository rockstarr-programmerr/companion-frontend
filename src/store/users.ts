import { Api } from '@/api'
import { LoginReq, RegisterReq } from '@/interfaces/api/user'
import { User } from '@/interfaces/user'
import { loadAccessToken, loadRefreshToken, setAccessToken, setRefreshToken } from '@/utils/auth'
import { Module } from 'vuex'
import { RootState } from './index'

declare interface UsersState {
  loggedInUser?: User;
  accessToken: string;
  refreshToken: string;
}

export const users: Module<UsersState, RootState> = {
  namespaced: true,

  state: {
    loggedInUser: undefined,
    accessToken: loadAccessToken(),
    refreshToken: loadRefreshToken()
  },

  getters: {
    loggedInUser: state => state.loggedInUser,
    hasUserInfo: state => state.loggedInUser !== undefined,
    accessToken: state => state.accessToken,
    refreshToken: state => state.refreshToken
  },

  mutations: {
    SET_LOGGED_IN_USER (state, payload: User | undefined) {
      state.loggedInUser = payload
    },

    SET_ACCESS_TOKEN (state, token: string) {
      state.accessToken = token
      setAccessToken(token)
    },

    SET_REFRESH_TOKEN (state, token: string) {
      state.refreshToken = token
      setRefreshToken(token)
    }
  },

  actions: {
    async register ({ commit }, payload: RegisterReq): Promise<void> {
      const data = await Api.register(payload)
      commit('SET_LOGGED_IN_USER', data)
    },

    async login ({ commit }, payload: LoginReq): Promise<void> {
      const data = await Api.login(payload)
      commit('SET_ACCESS_TOKEN', data.access)
      commit('SET_REFRESH_TOKEN', data.refresh)
    },

    async logout ({ commit }): Promise<void> {
      commit('SET_ACCESS_TOKEN', '')
      commit('SET_REFRESH_TOKEN', '')
      commit('SET_LOGGED_IN_USER', undefined)
    },

    async refreshToken ({ commit }): Promise<void> {
      const payload = {
        refresh: loadRefreshToken()
      }
      const data = await Api.tokenRefresh(payload)
      commit('SET_ACCESS_TOKEN', data.access)
      commit('SET_REFRESH_TOKEN', data.refresh)
    },

    async getInfo ({ commit }): Promise<void> {
      const data = await Api.getInfo()
      commit('SET_LOGGED_IN_USER', data)
    }
  }
}
