import Vue from 'vue'
import Vuex from 'vuex'
import { users } from './users'

Vue.use(Vuex)

export declare interface RootState {
  dummy?: string; // Just a dummy interface because we don't have root state yet
}

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users
  }
})
