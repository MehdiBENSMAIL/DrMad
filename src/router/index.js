import Vue from 'vue'
import VueRouter from 'vue-router'
import ShopView from '../views/ShopView.vue'
import {routeControllers} from "@/router/controllers.router";

Vue.use(VueRouter)

const routes = [
    {
        path: '/shop',
        component: ShopView,
        children: [
            {
                path: 'home',
                name: 'shophome',
                components: {
                    shopmain: () => import('../views/ShopHome.vue')
                },
                alias: '/shop'
            },
            {
                path: 'login',
                name: 'shoplogin',
                components: {
                    shopmain: () => import('../views/ShopLogin.vue')
                }
            },
            {
                path: 'buy',
                name: 'shopbuy',
                components: {
                    shopmain: () => import('../views/ShopBuy.vue')
                }
            },
            {
                path: 'pay/:orderId?',
                name: 'shoppay',
                components: {
                    shopmain: () => import('../views/ShopPay.vue')
                },
                props: {
                    shopmain: true
                }
            },
            {
                path: 'orders',
                name: 'shoporders',
                components: {
                    shopmain: () => import('../views/ShopOrders.vue')
                }
            }
        ]
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
    routes,
})

// Solution trouvée pour supprimer la navigation redondante : https://stackoverflow.com/a/64480426/23296835
const originalPush = router.push
router.push = function push(location) {
    return originalPush.call(this, location).catch(err => {
        if (err.name !== 'NavigationDuplicated') throw err;
    })
}

// guard, permet d'intercepter des chemins pour faire des actions spécifiques
router.beforeEach((to, from, next) => {
    const controller = routeControllers[to.path];
    if (controller) {
        controller.handler(to, from, next);
    } else {
        next();
    }
});

export default router