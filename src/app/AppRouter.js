import VueRouter from 'vue-router'

import { PostDetail, PostForm, PostList } from './entities'
import { Home, NotFound } from './components'

const routes = [
  { path: '/', component: Home },
  { name: 'PostCreate', path: '/posts/new', component: PostForm },
  { name: 'PostDetail', path: '/posts/:id', component: PostDetail },
  { name: 'PostUpdate', path: '/posts/:id/edit', component: PostForm },
  { name: 'PostList', path: '/posts', component: PostList },
  { path: '*', component: NotFound }
]

export default new VueRouter({
  routes
})
