import Vue from 'vue'
import VueRouter from 'vue-router'
import ItemsList from "@/components/ItemsList.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/shop/items',
    name: 'shopitems',
    component: ItemsList
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
