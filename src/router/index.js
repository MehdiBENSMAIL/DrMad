import Vue from 'vue'
import VueRouter from 'vue-router'
import ShopView from '../views/ShopView.vue'
import BankView from '../views/BankView.vue'
import {routeControllers} from "@/router/controllers.router";
import AppHome from "@/views/AppHome.vue";

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
        path: '/bank',
        component: BankView,
        children: [
            {
                path: 'home',
                name: 'bankhome',
                components: {
                    bankmain: () => import('../views/BankHome.vue')
                },
                alias: '/bank'
            },
            {
                path: 'account',
                name: 'bankaccount',
                components: {
                    bankmain: () => import('../views/BankAccount.vue')
                }
            },
            {
                path: 'amount',
                name: 'bankamount',
                components: {
                    bankmain: () => import('../views/BankAmount.vue')
                }
            },
            {
                path: 'operation',
                name: 'bankoperation',
                components: {
                    bankmain: () => import('../views/BankOperation.vue')
                }
            },
            {
                path: 'history',
                name: 'bankhistory',
                components: {
                    bankmain: () => import('../views/BankHistory.vue')
                }
            },
            {
                path: 'logout',
                name: 'banklogout',
                components: {
                    bankmain: () => import('../views/BankLogout.vue')
                }
            }
        ]
    },
    {
        path: '/',
        component: AppHome,
        alias: '/home',
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

// Solution trouvée pour supprimer l'alerte de navigation redondante : https://stackoverflow.com/a/64480426/23296835
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