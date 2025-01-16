import Vue from 'vue'
import VueRouter from 'vue-router'
<<<<<<< HEAD

// Shop
import VirusesView from '../views/VirusesView.vue'
import ShopView from '../views/ShopView.vue'
import ShopHome from '../views/ShopHome.vue'
import ShopLogin from '../views/ShopLogin.vue'
import ShopBuy from '../views/ShopBuy.vue'
import ShopPay from '../views/ShopPay.vue'
import ShopOrders from '../views/ShopOrders.vue'
=======
import ShopBuy from "@/views/ShopBuy.vue";
>>>>>>> TP4-Flo

Vue.use(VueRouter)

const routes = [
<<<<<<< HEAD
  { path: '/shop',
    component: ShopView,
    children: [
      { path: 'home', redirect: '/shop' },
      { path: '', name: 'shophome', component: ShopHome, alias: '/shop' },
      { path: 'login', name: 'shoplogin', component: ShopLogin },
      { path: 'buy', name: 'shopbuy', component: ShopBuy },
      { path: 'pay/:orderId?', name: 'shoppay',
        component: { shopmain: ShopPay },
        props: { shopmain: true } },
      { path: 'orders', name: 'ShopOrders', component: ShopOrders },
      { path: 'items', name: 'shopitems', component: VirusesView },
    ] },
  { path: '/shop/login', name: 'shoplogin', component: () => import('../views/ShopLoginView.vue') },
  { path: '/bank/account', name: 'bankaccount', component: () => import('../views/BankAccountView.vue') }
=======
  {
    path: '/shop/items',
    name: 'shopitems',
    component: ShopBuy
  },
  {
    path: '/shop/login',
    name: 'shoplogin',
    // import dynamique du composant, plutôt qu'en début de fichier, comme la route prédécente.
    component: () => import('../views/ShopLoginView.vue')
  },
  {
    path: '/bank/account',
    name: 'bankaccount',
    // import dynamique du composant, plutôt qu'en début de fichier, comme la route prédécente.
    component: () => import('../views/BankAccountView.vue')
  }
>>>>>>> TP4-Flo
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