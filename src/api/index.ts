import Vue from 'vue'
import { endpoints } from './endpoints'
import {
  UserLoginReq, UserLoginRes
} from '@/interfaces/api'

export const Api = {
  async login (reqBody: UserLoginReq): Promise<UserLoginRes> {
    const res = await Vue.axios.post(endpoints.users.login, reqBody)
    return {
      pk: res.data.pk,
      name: res.data.username
    }
  }
}
