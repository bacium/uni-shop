<template>
	<view class="settle-box">
	
	<!-- 全选 -->
	<label class="radio" @click="allCheckChange">
		<radio color="#C00000" :checked="allChecked" /><text>全选</text>
	</label>
	
	<!-- 合计 -->
	
	<view class="settle-total">
		合计：<text class="amount">￥{{selected_All_Price}}</text>
	</view>
	
	
	<!-- 结算按钮 -->
	<view class="settle-bth">
		<button @click="settle">结算({{allSelect_count}})</button>
	</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				second:3,
				timeId:''
			};
		},
		computed:{
			...mapGetters('cart',['allSelect_count','goodsTotal','selected_All_Price']),
			...mapGetters('user',['combineAddress']),
			...mapState('user',['token']),
			...mapState('cart',['cart']),
			allChecked(){
				return this.goodsTotal===this.allSelect_count
			}
		},
		methods:{
			...mapMutations('cart',['allCheckToggle']),
			...mapMutations('user',['updateRedirectInfo']),
			allCheckChange(){
				this.allCheckToggle(!this.allChecked)
			},
			settle(){
				// 判断是否选择了商品
				if(!this.allSelect_count) return uni.$showMsg('请选择要结算的商品！')
				// 判断是否选择了收货地址
				if(!this.combineAddress) return uni.$showMsg('请选择收货地址！')
				// 判断是否登录
				// if(!this.token) {
				// 	uni.$showMsg('请先登录')
				// 	uni.switchTab({
				// 		url:'/pages/my/my'
				// 	})
				// }
				if(!this.token) return this.delayNavicate()
				// 全部验证通过后调用支付接口
				this.payment()
			},
			delayNavicate(){
				this.second=3
				this.showTips(this.second)
				this.timeId=setInterval(()=>{
				this.second--
					if(this.second<=0) {
						clearInterval(this.timeId)
						uni.switchTab({
							url:'/pages/my/my',
							success: () => {
								this.updateRedirectInfo({
									openType:'switchTab',
									from:'/pages/cart/cart'
								})
							}
						})
						return
					}
				this.showTips(this.second)
				},1000)
			},
			showTips(n) {
				uni.showToast({
					icon:'none',
					mask:true,
					duration:1500,
					title:'请登录后再结算！' + n + ' 秒后自动跳转到登录页',
				})
			},
		async	payment(){
				// 1. 创建订单
				// 1.1 组织订单的信息对象
				const orderInfo={
					// 订单价格测试阶段写死0.01
					// order_price:this.selected_All_Price,
					order_price:0.01,
					consignee_addr:this.combineAddress,
					goods:this.cart.filter(x=>x.goods_state===true).map(x=>({
						  goods_id: x.goods_id, 
						  goods_number: x.goods_count, 
						  goods_price: x.goods_price 
					}))
				}
				// 1.2 发起请求创建订单
				const {data}=await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
				// console.log(res);
				// 1.3 得到服务器响应的“订单编号”
				if(data.meta.status!==200) return this.$showMsg('订单编号获取失败')
					const  orderNumber = data.message.order_number
					
					// 参数处理
					const [fail,getProvider]=await uni.getProvider({service:'payment'})
					if(getProvider.errMsg!=='getProvider:ok') return uni.$showMsg('获取Provider失败')
					const provider=getProvider.provider
					// console.log(provider,'payload');
					
					// 2生成预支付订单信息
					const {data:res2}=await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number:orderNumber})
				if(res2.meta.status!==200) return this.$showMsg('预支付订单生成失败')
				 const payInfo = res2.message.pay
				 payInfo.provider=provider[0]
					console.log(payInfo,'res2');
				 // 3发起微信支付
				 const [err,succ]=await uni.requestPayment(payInfo)
				 console.log(succ,'succ');
				 if(err) return uni.$showMsg('订单未支付成功')
				 const {data:res3}=await uni.$http.post('/api/public/v1/my/orders/chkOrder',{order_number:orderNumber})
				 if(res3.meta.status!==200)return uni.$showMsg('订单未支付')
				 console.log(res3,'订单支付回执');
				 uni.showToast({
				 	icon:'success',
					title:'订单支付成功'
				 })
			}
		}
	}
</script>

<style lang="scss">
.settle-box {
	height: 50px;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left:5px;
	font-size: 14px;
	.radio {
		display: flex;
		align-items: center;
	}
	.settle-total{
		.amount {
			color: #c00000;
			font-weight: bold;
		}
	}
	.settle-bth {
		button {
			height: 50px;
			background-color: #c00000;
			min-width: 100px;
			color: #fff;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
		}
	}
}
</style>