import { Api } from '@/api'
import { GroupCreateReq } from '@/interfaces/api/group'
import { Group } from '@/interfaces/group'
import { Module } from 'vuex'
import { RootState } from './index'

declare interface GroupsState {
  groups: Group[];
  currentGroup?: Group;
}

export const groups: Module<GroupsState, RootState> = {
  namespaced: true,

  state: {
    groups: [],
    currentGroup: undefined
  },

  getters: {
    groups: state => state.groups,
    currentGroup: state => state.currentGroup
  },

  mutations: {
    SET_GROUPS (state, payload: Group[]): void {
      state.groups = payload
    },

    SET_CURRENT_GROUP (state, payload: Group | undefined): void {
      state.currentGroup = payload
    },

    ADD_GROUP (state, payload: Group): void {
      state.groups.push(payload)
    },

    EDIT_GROUP (state, payload: Group): void {
      let index = 0
      let groupToEdit: Group | undefined

      for (const group of state.groups) {
        index++
        if (group.pk === payload.pk) {
          groupToEdit = group
          break
        }
      }

      if (groupToEdit !== undefined) {
        state.groups.splice(index, 1, groupToEdit)
      }
    },

    REMOVE_GROUP (state, groupPk: Group['pk']): void {
      let index = 0
      let groupToRemove: Group | undefined

      for (const group of state.groups) {
        index++
        if (group.pk === groupPk) {
          groupToRemove = group
          break
        }
      }

      if (groupToRemove !== undefined) {
        state.groups.splice(index, 1)
      }
    }
  },

  actions: {
    async list ({ commit }): Promise<void> {
      const data = await Api.groups.list()
      commit('SET_GROUPS', data)
    },

    async create ({ commit }, payload: GroupCreateReq): Promise<void> {
      const data = await Api.groups.create(payload)
      commit('ADD_GROUP', data)
    }
  }
}
