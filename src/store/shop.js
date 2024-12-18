import ShopService from '../services/shop.service'

export default {
    namespaced: true,
    state: () => ({
        viruses: [],
        shopUser: null,
    }),
    mutations: {
        updateViruses(state, viruses) {
            state.viruses = viruses
        },
        updateShopUser(state, user) {
            state.shopUser = user
        },
    },
    actions: {
        async shopLogin({commit}, data) {
            console.log('login');
            let response = await ShopService.shopLogin(data)
            if (response.error === 0) {
                commit('updateShopUser', response.data)
            }
            else {
                console.log(response.data)
            }
        },
        async getAllViruses({commit}) {
            console.log('récupération des viruses');
            let response = await ShopService.getAllViruses()
            if (response.error === 0) {
                commit('updateViruses', response.data)
            }
            else {
                console.log(response.data)
            }
        },
    }
}
