

export default {
	// 开启命名空间
	namespaced:true,
	
	
	// 定义状态
	state:()=>({
		address:JSON.parse(uni.getStorageSync('address')|| '{}')
	}),
	
	// 修改状态相关的方法
	mutations:{
		updateAddress(state,address_info){
			state.address=address_info
			
			// 本地化存储
			this.commit('user/saveStorage')
		}, 
		saveStorage(state) {
			uni.setStorageSync('address',JSON.stringify(state.address))
		}
	},
	
	
	// 计算属性
	getters:{
		combineAddress(state) {
			if(!state.address.provinceName) return ''
			return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfoNew
		}
	}
}