import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './action'
// import getters from './getters'

Vue.use(Vuex)

let state = {
    userInfo:''
}

export default new Vuex.Store({
    state,
    // getters,
    actions,
    mutations
})