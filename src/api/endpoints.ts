export const endpoints = {
  users: {
    register: '/users/register/',
    login: '/users/login/',
    tokenRefresh: '/users/token-refresh/',
    getInfo: '/users/get-my-info/'
  },
  groups: {
    list: '/split-the-bill/groups/',
    detail: '/split-the-bill/groups/<pk>/',
    create: '/split-the-bill/groups/',
    update: '/split-the-bill/groups/<pk>/',
    delete: '/split-the-bill/groups/<pk>/'
  }
}
