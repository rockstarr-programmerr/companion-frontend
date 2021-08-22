import Vue from 'vue'
import { endpoints } from './endpoints'
import {
  GetInfoRes,
  LoginReq, LoginRes,
  RegisterReq, RegisterRes, TokenRefreshReq, TokenRefreshRes
} from '@/interfaces/api/user'

export const Api = {
  async register (reqBody: RegisterReq): Promise<RegisterRes> {
    const res = await Vue.axios.post(endpoints.users.register, reqBody)
    return {
      username: res.data.username,
      email: res.data.email
    }
  },

  async login (reqBody: LoginReq): Promise<LoginRes> {
    const res = await Vue.axios.post(endpoints.users.login, reqBody)
    return {
      access: res.data.access,
      refresh: res.data.refresh
    }
  },

  async tokenRefresh (reqBody: TokenRefreshReq): Promise<TokenRefreshRes> {
    const res = await Vue.axios.post(endpoints.users.tokenRefresh, reqBody)
    return {
      access: res.data.access,
      refresh: res.data.refresh
    }
  },

  async getInfo (): Promise<GetInfoRes> {
    const res = await Vue.axios.get(endpoints.users.getInfo)
    return {
      username: res.data.username,
      email: res.data.email
    }
  }
}
