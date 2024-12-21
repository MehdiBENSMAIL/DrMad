import ShopService from '../services/shop.service'

export default {
    namespaced: true,
    state: () => ({
        viruses: [],
        shopUser: null,
        basket: [],
    }),
    mutations: {
        updateViruses(state, viruses) {
            state.viruses = viruses
        },
        updateShopUser(state, user) {
            state.shopUser = user
        },
        updateBasket(state, basket) {
            state.basket = basket
        },
        addItemBasket(state, item) {
            // TODO : à faire
        }
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
        async setBasket({commit}, userId) {
            console.log('récupération du panier déjà existant');
            let response = await ShopService.getUserBasket(userId)
            if (response.error === 0) {
                commit('updateBasket', response.data)
            }
            else {
                console.log(response.data)
            }
        },
        async clearBasket({commit}, userId) {
            console.log('suppression du panier');

            let clearBasket = {items: []};
            let response = await ShopService.setUserBasket(userId, clearBasket);
            if (response.error === 0) {
                commit('updateBasket', clearBasket)
            }
            else {
                console.log(response.data)
            }
        },
        // FIXME : à vérifier
        async addItemBasket({commit, state}, userId, data) {
            console.log('ajout d\'item dans le panier');
            commit('addItemBasket', data);

            let response = await ShopService.setUserBasket(userId, state.basket);
            if (response.error !== 0) {
                console.log(response.data)
            }
        }
    }
}
