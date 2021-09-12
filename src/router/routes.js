import Home from '../views/Home.vue'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/login',
      name: 'NoAuthLogin',
      component: () => import(/* webpackChunkName: "login" */ '../views/member/Login.vue')
    },
    {
      path: '/join',
      name: 'NoAuthJoin',
      component: () => import(/* webpackChunkName: "join" */ '../views/member/Join.vue')
    },
    {
      path: '/modifyPassword/:hash',
      name: 'NoAuthModifyPassword',
      component: () => import(/* webpackChunkName: "modifyPassword" */ '../views/member/modifyPassword.vue')
    },
    {
      path: '*',
      name: 'Error',
      component: () => import(/* webpackChunkName: "error" */ '../views/Error.vue')
    }
  ]

  export default routes;