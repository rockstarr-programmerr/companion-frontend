'use strict'

import Vue from 'vue'
import axios from 'axios'
import Store from '@/store'
import router from '@/router'
import { getAuthorizationHeaderValue } from '@/utils/auth'
import { status } from '@/api/status-codes'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL: process.env.VUE_APP_API_ROOT,
  timeout: 60 * 1000, // Timeout
  headers: {
    common: {
      'Content-Type': 'application/json'
    }
  }
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    setAuthenticationHeader(config.headers.common)
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  handleResponseError
)

// eslint-disable-next-line
Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin

function setAuthenticationHeader (headers) {
  const accessToken = Store.getters['users/accessToken']
  headers.Authorization = getAuthorizationHeaderValue(accessToken)
}

async function handleResponseError (error) {
  if (error.response === undefined) {
    return Promise.reject(error)
  }

  if (isUnauthorized(error)) {
    /* eslint-disable brace-style */
    if (
      refreshTokenNotValid(error) ||
      userInactiveOrNotFound(error)
    ) {
      await Store.dispatch('users/logout')
      directToLogin()
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject()
    }

    else if (isLoginRoute()) {
      return Promise.reject(error)
    }

    else {
      const response = await Store.dispatch('users/refreshToken')
        .then(async () => {
          setAuthenticationHeader(error.config.headers)
          const response = await _axios.request(error.config)
          return response
        })
      return Promise.resolve(response)
    }
  }

  return Promise.reject(error)
}

function isLoginRoute () {
  if (router.options !== undefined && router.options.routes !== undefined) {
    const loginRoute = router.options.routes.find(route => route.name === 'Auth')
    return (
      loginRoute !== undefined &&
      location.pathname === loginRoute.path
    )
  }
  return false
}

function directToLogin () {
  // If user is already at signin page, no need to redirect
  if (isLoginRoute()) {
    return
  }

  // If user is at some other page, redirect them to signin page
  const next = `${window.location.pathname}${window.location.search}`
  router.push({
    name: 'Auth',
    query: {
      next
    }
  })
}

function isUnauthorized (error) {
  return error.response.status === status.HTTP_401_UNAUTHORIZED
}

function refreshTokenNotValid (error) {
  return (
    error.response.data.code === 'token_not_valid' &&
    error.response.data.messages === undefined
  )
}

function userInactiveOrNotFound (error) {
  return (
    error.response.data.code === 'user_inactive' ||
    error.response.data.code === 'user_not_found'
  )
}
