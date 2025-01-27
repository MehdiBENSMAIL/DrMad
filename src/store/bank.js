import BankAccountService from '../services/bankaccount.service'

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
            state.accountAmount = amount
        },
        updateAccountTransactions(state, transactions) {
            state.accountTransactions = transactions
        },
        updateAccountNumberError(state, error) {
            state.accountNumberError = error
        },
        updateAccount(state, number) {
            state.account = number;
        }
    },
    actions: {
        async getAccountAmount({commit}, number) {
            console.log('get account amount');
            let response = await BankAccountService.getAccountAmount(number)
            if (response.error === 0) {
                commit('updateAccountAmount', response.data.amount)
                commit('updateAccountNumberError', 1)
            } else {
                console.log(response.data)
                commit('updateAccountNumberError', -1)
            }
        },
        async getAccountTransactions({commit}, number) {
            console.log('get account transactions');
            let response = await BankAccountService.getAccountTransactions(number)
            if (response.error === 0) {
                commit('updateAccountTransactions', response.data.transactions)
                commit('updateAccountNumberError', 1)
            } else {
                console.log(response.data)
                commit('updateAccountNumberError', -1)
            }
        },
        async getAccount({commit}, number) {
            console.log('get account transactions');
            let response = await BankAccountService.getAccountTransactions(number)
            if (response.error === 0) {
                commit('updateAccountTransactions', response.data.transactions)
                commit('updateAccountNumberError', 1)
            } else {
                console.log(response.data)
                commit('updateAccountNumberError', -1)
            }
        },
        async createWithdraw({commit}, number) {
            console.log('create withdraw');
            let response = await BankAccountService.createWithdraw(number);
            if (response.error === 0) {
                commit('updateAccountTransactions', response.data.transaction);
                commit('updateAccountAmount', response.accountAmount - response.data.amount);
            } else {
                console.log(response.data)
                commit('createWithdrawError', -1)
            }
        },
    }
}
