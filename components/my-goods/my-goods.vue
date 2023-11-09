<template>
	<view class="goods-item" >
		<!-- 图片区域 -->
		<view class="goods-left">
			<radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClick"></radio>
			<image :src="goods.goods_small_logo ||defaultPic" class="goods-image"></image>
		</view>
		<!-- 说明文本及价格 -->
		<view class="goods-right">
			<view class="goods-name">
				{{goods.goods_name}}
			</view>
			<view class="goods-price-num">
				<text>￥{{goods.goods_price|tofixed}}</text>
				<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChange"></uni-number-box>
			</view>
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
			},
			showRadio:{
				type:Boolean,
				default:false
			},
			showNum:{
				type:Boolean,
				default:false
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
		methods:{
			radioClick(){
				this.$emit('radioChange',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			numChange(value) {
				this.$emit('numChange',{
					goods_id:this.goods.goods_id,
					goods_count:value
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
			display: flex;
			padding: 10px 5px;
			border-bottom: 1px solid #f0f0f0;
			.goods-left {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.goods-image{
					height: 100px;
					width: 100px;
					display: block;
				}
			}
			.goods-right { 
				display: flex;
					flex: 1;
				flex-direction: column;
				justify-content: space-between;
				margin-left:5px;
				.goods-name {
					font-size: 13px;
				}
				.goods-price-num {
					display: flex;
				
					justify-content: space-between;
					align-items: center;
					text {
						font-size: 16px;
							color: #c00000;
					}
				}
			}
		}
</style>