export default {
	namespaced:true,
	state:()=>({
		 // 购物车的数组，用来存储购物车中每个商品的信息对象
		 // 每个商品的信息对象，都包含如下 6 个属性：
		 // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart:JSON.parse(uni.getStorageSync('cart')||'[]')
	}),
	mutations:{
		addToCart (state,goodsinfo) {
			// 判断商品是否在购物车内
			const findResult=state.cart.find(x=>x.goods_id===goodsinfo.goods_id)
			
			if(findResult) {
				// 在购物车里面，让数量++
				findResult.goods_count++
			}else {
				// 不在进行添加即可
				state.cart.push(goodsinfo)
			}
				this.commit('cart/formatGoodsRadio')
				this.commit('cart/saveStorage')
		},
		saveStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		// 把goods_state转化成布尔值
		formatGoodsRadio(state){
			state.cart.forEach(item=>{
				if(item.goods_state===2){
					item.goods_state=false
				} else  {
					item.goods_state=true
				}
			})
		},
		toggleRadioState(state,payload) {
			const goods_info=state.cart.find(x=>x.goods_id===payload.goods_id)
			
			if(goods_info) {
				goods_info.goods_state=payload.goods_state
				this.commit('cart/saveStorage')
			}
			
		}
	},
	getters:{
		goodsTotal(state){
			let count=0
			state.cart.forEach(x=>count+=x.goods_count)
			console.log(count);
			return count
		}
	}
}