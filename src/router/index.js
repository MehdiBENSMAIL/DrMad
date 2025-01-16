import Vue from 'vue'
import VueRouter from 'vue-router'


// Shop
import VirusesView from '../views/VirusesView.vue'
import ShopView from '../views/ShopView.vue'
import ShopHome from '../views/ShopHome.vue'
// import ShopLogin from '../views/ShopLogin.vue'
import ShopBuy from '../views/ShopBuy.vue'
import ShopPay from '../views/ShopPay.vue'
import ShopOrders from '../views/ShopOrders.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/shop',
    component: ShopView,
    children: [
      { path: 'home', redirect: '/shop' },
      { path: '', name: 'shophome', component: ShopHome, alias: '/shop' },
        // FIXME : a remplacer
      { path: 'login', name: 'shoplogin', component: () => import('../views/ShopLoginView.vue') },
      { path: 'buy', name: 'shopbuy', component: ShopBuy },
      { path: 'pay/:orderId?', name: 'shoppay', component: ShopPay, props: true },
      { path: 'orders', name: 'ShopOrders', component: ShopOrders },
      { path: 'items', name: 'shopitems', component: VirusesView },
    ] },
  { path: '/shop/login', name: 'shoplogin', component: () => import('../views/ShopLoginView.vue') },
  { path: '/bank/account', name: 'bankaccount', component: () => import('../views/BankAccountView.vue') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Found this solution to prevent redundant navigation : https://stackoverflow.com/a/64480426/23296835
const originalPush = router.push
router.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router