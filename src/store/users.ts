import { Api } from '@/api'
import { UserLoginReq, UserLoginRes } from '@/interfaces/api'
import { User } from '@/interfaces/user'
import { Module } from 'vuex'
import { RootState } from './index'

declare interface UsersState {
  loggedInUser?: User
}

export const users: Module<UsersState, RootState> = {
  namespaced: true,

  state: {
    loggedInUser: undefined
  },

  getters: {
    loggedInUser: state => state.loggedInUser,
    isLoggedIn: state => state.loggedInUser !== undefined
  },

  mutations: {
    SET_LOGGED_IN_USER (state, payload: UserLoginRes) {
      state.loggedInUser = payload
    }
  },

  actions: {
    async login ({ commit }, payload: UserLoginReq) {
      const data = await Api.login(payload)
      commit('SET_LOGGED_IN_USER', data)
    }
  }
}
