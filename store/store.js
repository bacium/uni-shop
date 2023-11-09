import Vue from "vue"
import Vuex from "vuex"
import cart_modules from './cart.js'

Vue.use(Vuex)

const  store=new Vuex.Store({
	 modules: {
		 cart:cart_modules
	 },
})

export default store