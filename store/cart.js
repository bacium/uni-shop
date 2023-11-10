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
			
		},
		// 更新商品数量
		updateGoodsCount(state,goods) {
			const goods_info=state.cart.find(x=>x.goods_id===goods.goods_id)
			
			if(goods_info) {
				goods_info.goods_count=goods.goods_count
				this.commit('cart/saveStorage')
			}
		},
		// 删除购物车商品
		deleteGoods(state,goods_id){
			state.cart=state.cart.filter(x=>x.goods_id!==goods_id)
			this.commit('cart/saveStorage')
		},
		// 全选或者反选状态
		allCheckToggle(state,newState){
			state.cart.forEach(x=>x.goods_state=newState)
				this.commit('cart/saveStorage')
		}
	},
	getters:{
		// 商品总数
		goodsTotal(state){
			let count=0
			state.cart.forEach(x=>count+=x.goods_count)
			// console.log(count);
			return count
		},
		// 选中的商品总数
		allSelect_count(state) {
		return	state.cart.filter(x=>x.goods_state===true).reduce((total,item)=>total+=item.goods_count,0)
		},
		// 计算选中的总价
		selected_All_Price(state) {
			return state.cart.filter(x=>x.goods_state===true).reduce((allPrice,item)=>allPrice+=item.goods_count*item.goods_price,0).toFixed(2)
		}
	}
}