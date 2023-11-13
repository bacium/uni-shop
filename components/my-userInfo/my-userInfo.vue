<template>
	<view class="userInfo-centent">
		<!-- 头像区域 -->
		<view class="userInfo-awater">
			<image :src="userInfo.avatarUrl" class="awater"></image>
			<view class="nickName">
				{{userInfo.nickName}}
			</view>
		</view>
		<view class="pane-list">
			<!-- 面板一 -->
			<view class="pane-one">
				<view class="pane-item" v-for="(item,index) in pane_one_data" :key="index">
					<text>{{item.count}}</text>
					<text>{{item.descript}}</text>
				</view>
			</view>
			<!-- 面板二 -->
			<view class="pane-two">
				<view class="pane-title">
					我的订单
				</view>
				<view class="pane-two-list">
					<view class="pane-two-item" v-for="(order,idx) in pane_two_data" :key="idx">
						<image :src="order.icon" class="pane-two-image"></image>
						<text>{{order.tips}}</text>
					</view>
				</view>
			</view>
			<!-- 面板三 -->
			<view class="pane-three">
				<view class="pane-three-list">
					<view class="pane-three-item" v-for="(desc,id) in pane_three_data" :key="id" @click="onClick(desc)">
						<text>{{desc.desc}}</text>
						<uni-icons type="right" size="16"></uni-icons>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		name:"my-userInfo",
		computed:{
			...mapState('user',['userInfo'])
		},
		data() {
			return {
				pane_one_data:[{
					count:8,
					descript:'收藏的店铺'
				},
				{
					count:14,
					descript:'收藏的商品'
				},
				{
					count:18,
					descript:'关注的商品'
				},
				{
					count:84,
					descript:'足迹'
				},
				],
				pane_two_data:[{
					icon:'/static/my-icons/icon1.png',
					tips:"待付款"
				},
				{
					icon:'/static/my-icons/icon2.png',
					tips:"待收货"
				},
				{
					icon:'/static/my-icons/icon3.png',
					tips:"退款/退货"
				},
				{
					icon:'/static/my-icons/icon4.png',
					tips:"全部订单"
				},
				],
				pane_three_data:[
					{desc:"收货地址"},
					{desc:"联系客服"},
					{desc:"退出登录"},
				]
			};
		},
		methods:{
			...mapMutations('user',['updateAddress','updateUserInfo','undateToken']),
			async onClick(info) {
				// console.log(info);
				if(info.desc==="退出登录") {
				const [err,succ]=await	uni.showModal({
						title:'提示',
						content:"确定要退出登录吗？"
					}).catch(err=>err)
				if(succ&&succ.confirm) {
					this.updateAddress({})
					this.updateUserInfo({})
					this.undateToken('')
				}
				}
			}
		}
	}
</script>

<style lang="scss">
.userInfo-centent{
	.userInfo-awater{
		height: 400rpx;
		background-color: #c00000;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.awater {
			  display: block;
			  width: 90px;
			  height: 90px;
			  border-radius: 45px;
			  border: 2px solid white;
			  box-shadow: 0 1px 5px black;
		}
		.nickName {
			color: white;
			font-weight: bold;
			font-size: 16px;
			margin-top: 10px;
		}
	}
	.pane-list{
		padding: 0 10px;
		position: relative;
		top: -10px;
		.pane-one{
			 background-color: white;
			 border-radius: 3px;
			 margin-bottom: 8px;
			 display: flex;
			 justify-content: space-around;
			 .pane-item {
				 display: flex;
				 flex-direction: column;
				 justify-content: space-around;
				 align-items: center;
				 padding: 10px 0;
				 font-size: 13px;
			 }
		}
		.pane-two {
			  background-color: white;
			  border-radius: 3px;
			  margin-bottom: 8px;
					.pane-title{
						 line-height: 45px;
						 padding-left: 10px;
						 font-size: 15px;
						 border-bottom: 1px solid #f4f4f4;
					}
					.pane-two-list{
						display: flex;
						justify-content: space-around;
						padding: 8px 0;
						.pane-two-item {
							display: flex;
							flex-direction: column;
							align-items: center;
							.pane-two-image {
								 width: 35px;
								 height: 35px;
							}
						}
					}
		}
		.pane-three {
			background-color: white;
			border-radius: 3px;
			margin-bottom: 8px;
			.pane-three-list {
				display: flex;
				flex-direction: column;
				.pane-three-item{
					// height: 45px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 10px 5px;
					font-size: 15px;
				}
			}
		}
	}
	
}
</style>