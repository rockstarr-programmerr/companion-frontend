import { Api } from '@/api'
import { GroupCreateReq, GroupUpdateReq } from '@/interfaces/api/group'
import { Group } from '@/interfaces/group'
import { GroupsState, GroupWithState } from '@/interfaces/store/groups'
import { Module } from 'vuex'
import { RootState } from './index'

function addDefaultState (group: Group): GroupWithState {
  return {
    ...group,
    editing: false,
    loading: false,
    nameErrs: []
  }
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
      state.groups = payload.map(group => addDefaultState(group))
    },

    SET_CURRENT_GROUP (state, payload: Group | undefined): void {
      if (payload !== undefined) {
        state.currentGroup = addDefaultState(payload)
      } else {
        state.currentGroup = payload
      }
    },

    ADD_GROUP (state, payload: Group): void {
      const group = addDefaultState(payload)
      state.groups.push(group)
    },

    EDIT_GROUP (state, payload: Group): void {
      let index = 0
      let groupToEdit: GroupWithState | undefined

      for (const group of state.groups) {
        if (group.pk === payload.pk) {
          groupToEdit = { ...group, ...payload }
          break
        }
        index++
      }

      if (groupToEdit !== undefined) {
        state.groups.splice(index, 1, groupToEdit)
      }
    },

    REMOVE_GROUP (state, pk: Group['pk']): void {
      let index = 0
      let groupToRemove: Group | undefined

      for (const group of state.groups) {
        if (group.pk === pk) {
          groupToRemove = group
          break
        }
        index++
      }

      if (groupToRemove !== undefined) {
        state.groups.splice(index, 1)
      }
    },

    SET_EDITING (state, { pk, editing }: { pk: Group['pk'], editing: boolean }): void {
      const group = state.groups.find(group => group.pk === pk)
      if (group !== undefined) {
        group.editing = editing
      }
    },

    SET_LOADING (state, { pk, loading }: { pk: Group['pk'], loading: boolean }): void {
      const group = state.groups.find(group => group.pk === pk)
      if (group !== undefined) {
        group.loading = loading
      }
    },

    SET_NAME_ERRS (state, { pk, errs }: { pk: Group['pk'], errs: string[] }): void {
      const group = state.groups.find(group => group.pk === pk)
      if (group !== undefined) {
        group.nameErrs = errs
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
    },

    async update ({ commit }, { pk, payload }: { pk: number; payload: GroupUpdateReq }): Promise<void> {
      const data = await Api.groups.update(pk, payload)
      commit('EDIT_GROUP', data)
    },

    async delete ({ commit }, pk: Group['pk']): Promise<void> {
      await Api.groups.delete(pk)
      commit('REMOVE_GROUP', pk)
    }
  }
}
