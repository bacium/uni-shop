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
		<button>结算({{allSelect_count}})</button>
	</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('cart',['allSelect_count','goodsTotal','selected_All_Price']),
			allChecked(){
				return this.goodsTotal===this.allSelect_count
			}
		},
		methods:{
			...mapMutations('cart',['allCheckToggle']),
			allCheckChange(){
				this.allCheckToggle(!this.allChecked)
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