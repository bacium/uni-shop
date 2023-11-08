<template>
	<view class="goods-item" >
		<!-- 图片区域 -->
		<view class="goods-left">
			<image :src="goods.goods_small_logo ||defaultPic" class="goods-image"></image>
		</view>
		<!-- 说明文本及价格 -->
		<view class="goods-right">
			<view class="goods-name">
				{{goods.goods_name}}
			</view>
			<text>￥{{goods.goods_price|tofixed}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			goods:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				// 默认图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
			};
		},
		filters:{
			tofixed(value){
				return Number(value).toFixed(2)
			}
		},
	}
</script>

<style lang="scss">
	.goods-item {
			display: flex;
			border-bottom: 1px solid #f0f0f0;
			.goods-left {
				.goods-image{
					height: 100px;
					width: 100px;
					display: block;
				}
			}
			.goods-right { 
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left:5px;
				.goods-name {
					font-size: 13px;
				
				}
				text {
					font-size: 16px;
						color: #c00000;
				}
			}
		}
</style>