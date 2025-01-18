import store from "@/store";
import router from "@/router/index";

const routeControllers = {
    '/shop/logout': {
        handler: async (to, from, next) => {
            await store.dispatch('shop/shopLogout');
            await next();
            await router.push('/shop/login');
        }
    },
}

export {
    routeControllers,
}