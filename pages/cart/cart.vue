<template>
	<view class="cart-container">
		<view class="cart-address">
			<my-address></my-address>
		</view>
		<!-- 购物车标题 -->
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text>购物车</text>
		</view>
		
		<!-- 商品主体区域 -->
		<view class="cart-body">
			<uni-swipe-action>
				<block v-for="(item,index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="delGoods(item)">
						<my-goods :goods="item" show-radio="true" @radio-change="toggleRadio" :show-num="true" @num-change="numberChangeEvent"></my-goods>
				</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
		</view>
		
		
		<!-- 结算 -->
		<view class="settle-box">
			<my-settle></my-settle>
		</view>
	</view>
</template>

<script>
import badgeMixin from '../../mixins/tabBar-badge.js'
import {mapState,mapMutations} from 'vuex'
	export default {
		mixins:[badgeMixin],
		computed:{
			...mapState('cart',['cart']),
			
		},
		data() {
			return {
				options:[
					{
						text: '删除',
						style: {
						    backgroundColor: '#C00000'
						}
					}
				]
			};
		},
		methods:{
			...mapMutations('cart',['toggleRadioState','updateGoodsCount','deleteGoods']),
		toggleRadio(e){
			// console.log(e);
			this.toggleRadioState(e)
		},
		numberChangeEvent(e){
			console.log(e);
			this.updateGoodsCount(e)
		},
		delGoods(item){
			this.deleteGoods(item.goods_id)
		}
		} 
	}
</script>

<style lang="scss">
	.cart-container{
		padding-bottom: 50px;
	}
.cart-title{
	height: 40px;
	display: flex;
align-items: center;
padding-left: 5px;
 font-size: 14px;
	border-bottom: 1px solid #efefef;
	text {
		 margin-left: 10px;
	}
}
.cart-body {
	.cart-item {
		margin: 5px 0;
	}
}
.settle-box {
	position: fixed;
	height: 50px;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: skyblue;
}
</style>
