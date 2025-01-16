import ShopService from '../services/shop.service'

export default {
    namespaced: true,
    state: () => ({
        viruses: [],
        shopUser: null,
        basket: null,
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
        addItemBasketMutation(state, itemData) {
            // Vérifie si l'item existe déjà dans le panier
            const existingItemIndex = state.basket.items.findIndex(
                basketItem => basketItem.item === itemData.item
            );

            // Si l'item existe déjà
            if (existingItemIndex !== -1) {
                // Met à jour l'amount de l'item existant
                state.basket.items[existingItemIndex]['amount'] += itemData.amount;
                console.log('append')
            } else {
                // Si l'item n'existe pas, l'ajoute au tableau
                state.basket.items.push(itemData);
            }
        },
        removeItemBasketMutation(state, itemId) {
            state.basket.items = state.basket.items.filter(basketItem => basketItem.item !== itemId)
        }
    },
    actions: {
        async shopLogin({ commit }, data) {
            console.log('login');
            let response = await ShopService.shopLogin(data)
            if (response.error === 0) {
                commit('updateShopUser', response.data)
            }
            else {
                console.log(response.data)
            }
            return response;
        },
        async getAllViruses({ commit }) {
            console.log('récupération des viruses');
            let response = await ShopService.getAllViruses()
            if (response.error === 0) {
                commit('updateViruses', response.data)
            }
            else {
                console.log(response.data)
            }
        },
        async setBasket({commit, state}) {
            console.log('récupération du panier déjà existant');
            let response = await ShopService.getUserBasket({userId: state.shopUser._id})

            if (response.error === 0) {
                commit('updateBasket', response.data ?? {items: []})
            }
            else {
                console.log(response.data)
            }
        },
        async clearBasket({commit, state}) {
            console.log('suppression du panier');

            let clearBasket = {items: []};
            let response = await ShopService.setUserBasket({ userId: state.shopUser._id, basket: clearBasket });
            if (response.error === 0) {
                commit('updateBasket', clearBasket)
            }
            else {
                console.log(response.data)
            }
        },
        async addItemBasket({commit, state}, itemData) {
            console.log('ajout d\'item dans le panier');
            commit('addItemBasketMutation', itemData);

            let response = await ShopService.setUserBasket({ userId: state.shopUser._id, basket: state.basket });
            if (response.error !== 0) {
                console.log(response.data)
            }
        },
        async removeItemBasket({commit, state}, itemId) {
            console.log('suppresion d\'un item dans le panier');
            commit('removeItemBasketMutation', itemId);

            let response = await ShopService.setUserBasket({ userId: state.shopUser._id, basket: state.basket });
            if (response.error !== 0) {
                console.log(response.data)
            }
        }
    }
}
