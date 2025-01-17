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
            state.viruses = viruses;
        },
        updateShopUser(state, user) {
            user.orders = user.orders ?? [];
            state.shopUser = user;
        },
        updateBasket(state, basket) {
            state.basket = basket;
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
                console.log('append');
            } else {
                // Si l'item n'existe pas, l'ajoute au tableau
                state.basket.items.push(itemData);
            }
        },
        removeItemBasketMutation(state, itemId) {
            state.basket.items = state.basket.items.filter(basketItem => basketItem.item !== itemId);
        },
        updateOrders(state, orders) {
            state.shopUser.orders = orders;
        },
        cancelOrder(state, orderId) {
            const order = state.shopUser.orders.find(order => order._id === orderId) ?? false;
            if(!order) return;
            order.status = 'cancelled';
        }
    },
    actions: {
        async shopLogin({ commit }, data) {
            console.log('login');
            let response = await ShopService.shopLogin(data);
            if (response.error === 0) {
                commit('updateShopUser', response.data.user);
            } else {
                console.log(response.data);
            }
            return response;
        },
        async getAllViruses({ commit }) {
            console.log('récupération des viruses');
            let response = await ShopService.getAllViruses();
            if (response.error === 0) {
                commit('updateViruses', response.data.items);
            } else {
                console.log(response.data);
            }
        },
        async getBasket({commit, state}) {
            console.log('récupération du panier déjà existant');

            let response = await ShopService.getUserBasket({ userId: state.shopUser?._id });
            if (response.error === 0) {
                commit('updateBasket', response.data.basket);
            } else {
                console.log(response.data);
            }
        },
        async clearBasket({commit, state}) {
            console.log('suppression du panier');

            let clearBasket = {items: []};
            let response = await ShopService.setUserBasket({ userId: state.shopUser?._id, basket: clearBasket });
            if (response.error === 0) {
                commit('updateBasket', clearBasket);
            } else {
                console.log(response.data);
            }
        },
        async addItemBasket({commit, state}, itemData) {
            console.log('ajout d\'item dans le panier');

            let response = await ShopService.setUserBasket({ userId: state.shopUser?._id, basket: state.basket });
            if (response.error === 0) {
                commit('addItemBasketMutation', itemData);
            } else {
                console.log(response.data);
            }
        },
        async removeItemBasket({commit, state}, itemId) {
            console.log('suppresion d\'un item dans le panier');

            let response = await ShopService.setUserBasket({ userId: state.shopUser?._id, basket: state.basket });
            if (response.error === 0) {
                commit('removeItemBasketMutation', itemId);
            } else {
                console.log(response.data);
            }
        },
        async getOrders({ commit, state }) {
            console.log('récuperation des commandes');

            let response = await ShopService.getAllOrders({ userId: state.shopUser?._id });
            if (response.error === 0) {
                commit('updateOrders', response.data.orders);
            } else {
                console.log(response.data);
            }
        },
        async cancelOrder({ commit, state }, data) {
            console.log('annulation d\'une commande');

            let response = await ShopService.cancelOrder({ userId: state.shopUser?._id, orderId: data.orderId });
            if (response.error === 0) {
                commit('cancelOrder', data.orderId);
            } else {
                console.log(response.data);
            }
        }
    }
}
