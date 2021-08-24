import { GroupCreateReq, GroupCreateRes, GroupListRes, GroupUpdateReq, GroupUpdateRes } from '@/interfaces/api/group'
import { Group } from '@/interfaces/group'
import Vue from 'vue'
import { endpoints, replacePk } from './endpoints'

export const groups = {
  async list (): Promise<GroupListRes> {
    const res = await Vue.axios.get(endpoints.groups.list)
    return res.data
  },

  async create (payload: GroupCreateReq): Promise<GroupCreateRes> {
    const res = await Vue.axios.post(endpoints.groups.create, payload)
    return res.data
  },

  async update (pk: Group['pk'], payload: GroupUpdateReq): Promise<GroupUpdateRes> {
    const endpoint = replacePk(endpoints.groups.update, pk)
    const res = await Vue.axios.patch(endpoint, payload)
    return res.data
  },

  async delete (pk: Group['pk']): Promise<void> {
    const endpoint = replacePk(endpoints.groups.delete, pk)
    await Vue.axios.delete(endpoint)
  }
}
