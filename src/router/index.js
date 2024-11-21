import Vue from 'vue'
import VueRouter from 'vue-router'
import VirusesView from '../views/VirusesView.vue'
import ShopView from '../views/ShopView.vue'
import ShopHome from '../views/ShopHome.vue'
import ShopLogin from '../views/ShopLogin.vue'
import ShopBuy from '../views/ShopBuy.vue'
import ShopPay from '../views/ShopPay.vue'
import ShopOrders from '../views/ShopOrders.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/shop',
    component: ShopView,
    children: [
      {
        path: '',
        name: 'shophome',
        component: ShopHome,
        alias: '/shop'
      },
      {
        path: 'login',
        name: 'shoplogin',
        component: ShopLogin
      },
      {
        path: 'buy',
        name: 'shopbuy',
        component: ShopBuy
      },
      {
        path: 'pay/:orderId',
        name: 'shoppay',
        component: ShopPay,
        props: true
      },
      {
        path: 'orders',
        name: 'shoporders',
        component: ShopOrders
      }
    ]
  },
  {
    path: '/shop/items',
    name: 'shopitems',
    component: VirusesView
  },
  {
    path: '/bank/account',
    name: 'bankaccount',
    component: () => import('../views/BankAccountView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
