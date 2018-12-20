import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'

Vue.use(Router)


const router = new Router({
      routes: [{
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/guide',
          name: 'guide',
          component: () => import( /* webpackChunkName: "guide" */ './views/guide.vue')
        },
        {
          path: '/panorama',
          name: 'panorama',
          component: () => import( /* webpackChunkName: "panorama" */ './views/panorama.vue')
        },
        {
          path: '/live',
          name: 'live',
          component: () => import( /* webpackChunkName: "live" */ './views/live.vue')
        },
        {
          path: '/map',
          name: 'map',
          component: () => import( /* webpackChunkName: "map" */ './views/map.vue')
        },
        {
          path: '/scene',
          name: 'scene',
          component: () => import( /* webpackChunkName: "scene" */ './views/scene.vue')
        },
        {
          path: '/news',
          name: 'news',
          component: () => import( /* webpackChunkName: "news" */ './views/news.vue')
        },
        {
          path: '/open',
          name: 'open',
          component: () => import( /* webpackChunkName: "open" */ './views/open.vue')
        },
        {
          path: '/serve',
          name: 'serve',
          component: () => import( /* webpackChunkName: "serve" */ './views/serve.vue')
        },
        {
          path: '/list',
          name: 'list',
          component: () => import( /* webpackChunkName: "serve" */ './views/list.vue')
        },
        {
          path: '/detail',
          name: 'detail',
          component: () => import( /* webpackChunkName: "serve" */ './views/detail.vue')
        },
        {
          path: '/openServe',
          name: 'openServe',
          component: () => import( /* webpackChunkName: "serve" */ './views/open-serve.vue')
        },
        {
          path: '/openInteract',
          name: 'openInteract',
          component: () => import( /* webpackChunkName: "serve" */ './views/open-interact.vue')
        },
        {
          path: '/openInfo',
          name: 'openInfo',
          component: () => import( /* webpackChunkName: "serve" */ './views/open-info.vue')
        },
        {
          path: '/searchList',
          name: 'searchList',
          component: () => import( /* webpackChunkName: "serve" */ './views/search-list.vue')
        },
      ]
})

//路由进入前，页面滚动到顶部
router.beforeEach((to, from, next) => {
  window.scrollTo(0,0)
  next()
})

export default router