import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import ShopService from '../services/shop.service'
import BankAccountService from '../services/bankaccount.service'

export default new Vuex.Store({
    modules: {
        shop,
        bank
    }
})
