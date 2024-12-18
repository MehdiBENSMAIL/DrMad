import Vue from 'vue'
import Vuex from 'vuex'
import shop from './shop'
import bank from './bank'
import order from './order'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        shop,
        bank,
        order
    }
})
