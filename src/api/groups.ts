import { GroupCreateReq, GroupCreateRes, GroupListRes } from '@/interfaces/api/group'
import Vue from 'vue'
import { endpoints } from './endpoints'

export const groups = {
  async list (): Promise<GroupListRes> {
    const res = await Vue.axios.get(endpoints.groups.list)
    return res.data
  },

  async create (payload: GroupCreateReq): Promise<GroupCreateRes> {
    const res = await Vue.axios.post(endpoints.groups.create, payload)
    return res.data
  }
}
