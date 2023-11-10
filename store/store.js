import Vue from "vue"
import Vuex from "vuex"
import cart_modules from './cart.js'
import user_modules from './user.js'


Vue.use(Vuex)

const  store=new Vuex.Store({
	 modules: {
		 cart:cart_modules,
		 user:user_modules
	 },
})

export default store