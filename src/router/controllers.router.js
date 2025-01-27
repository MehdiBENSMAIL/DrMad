import store from "@/store";
import router from "@/router/index";

const routeControllers = {
    '/shop/logout': {
        handler: async () => {
            await store.dispatch('shop/shopLogout');
            await router.push('/shop/login');
        }
    },
}

export {
    routeControllers,
}