import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)
Vue.prototype.$apiURL = 'http://127.0.0.1:8000/api';
Vue.prototype.$APP_TITLE = "Bali United Store Revamp";
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/product/:slug',
    props: true,
    name: 'Product',
    component: () => import('../views/ProductDetail.vue')
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: () => import('../views/ShoppingCart.vue')
  },
  {
    path: '/success',
    name: 'SuccessPayment',
    component: () => import('../views/SuccessPayment.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/user/LoginView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
