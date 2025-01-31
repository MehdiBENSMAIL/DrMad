import BankService from "@/services/bank.service";

export default {
    namespaced: true,
    state: () => ({
        accountAmount: 0,
        accountTransactions: [],
        accountNumberError: 0,
        account: null
    }),
    mutations: {
        updateAccountAmount(state, amount) {
            state.accountAmount = amount;
        },
        updateAccountTransactions(state, transactions) {
            state.accountTransactions = transactions;
        },
        updateAccountNumberError(state, error) {
            state.accountNumberError = error;
        },
        updateAccount(state, number) {
            state.account = number;
        }
    },
    actions: {
        async getAccountAmount({ commit }, number) {
            console.log('get account amount');
            let response = await BankService.getAccountAmount(number);
            if (response.error === 0) {
                commit('updateAccountAmount', response.data.amount);
                commit('updateAccountNumberError', 1);
            } else {
                console.log(response.data);
                commit('updateAccountNumberError', -1);
            }
        },
        async getAccountTransactions({ commit }, number) {
            console.log('get account transactions');
            let response = await BankService.getAccountTransactions(number);
            if (response.error === 0) {
                commit('updateAccountTransactions', response.data.transactions);
                commit('updateAccountNumberError', 1);
            } else {
                console.log(response.data);
                commit('updateAccountNumberError', -1);
            }
        },
        async getAccount({ commit }, number) {
            console.log('get account');
            let response = await BankService.getAccount(number);
            if (response.error === 0) {
                commit('updateAccount', response.data);
            } else {
                console.log(response.data);
                commit('updateAccountNumberError', -1);
            }
        },
        async createWithdraw({ commit, state }, data) {
            console.log('create withdraw');
            let response = await BankService.createWithdraw({...data, accountId: state.account._id});
            if (response.error === 0) {
                commit('updateAccountTransactions', [...state.accountTransactions, response.data.transaction]);
                commit('updateAccountAmount', response.data.amount); // Nouveau solde
            } else {
                console.log(response.data);
                commit('updateAccountNumberError', -1);
            }
            return response;
        },
        async createPayment({ commit, state }, data) {
            console.log('create Payment');
            let response = await BankService.createPayment({...data, accountId: state.account._id});
            if (response.error === 0) {
                commit('updateAccountTransactions', [...state.accountTransactions, response.data.transaction]);
                commit('updateAccountAmount', response.data.amount); // Nouveau solde
            } else {
                console.log(response.data);
                commit('updateAccountNumberError', -1);
            }
            return response;
        },
        async bankLogin({ commit, dispatch }, data) {
            console.log('handle login');
            const response = await BankService.bankLogin(data.login);

            if (response.error === 0) {
                commit('updateAccount', response.data.account);
                await dispatch('getAccountAmount', response.data.account.number);
                await dispatch('getAccountTransactions', response.data.account.number);
            } else {
                console.log(response.data);
            }
            return response;
        },
        async bankLogout({ commit }) {
            commit('updateAccount', null);
            commit('updateAccountAmount', 0);
            commit('updateAccountTransactions', []);
        }
    },
    getters: {
        account: (state) => state.account,
        accountAmount: (state) => state.accountAmount,
        accountTransactions: (state) => state.accountTransactions,
    }
};