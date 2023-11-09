<template>
	<view>
		<view class="search">
			<my-search @click="gotoSearch"></my-search> 
		</view>
		<view>
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<view  class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
						<image :src="item.image_src" ></image>
					</view >
				</swiper-item>
			</swiper>
			<!-- 分类 -->
			<view class="goods-cate">
				<view class="cate-item" v-for="(item,idx) in navList" :key="idx" @click="cate_click(item)">
					<image :src="item.image_src" class="uni-card__content"></image>
				</view>
			</view>
			
			<!-- 楼层数据 -->
			<view class="floor-content">
				<view class="floor-item" v-for="(item,index) in floorList" :key="index">
						<image :src="item.floor_title.image_src" class="floor-title"></image>
			
				<view class="image-box"  >
					<!-- 左侧图片 -->
					<navigator class="left-box" :url="item.product_list[0].url" >
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧图片 -->
					<view class="right-box">
						<navigator :url="item_R.url"  class="right-box-item" v-for="(item_R,index_r) in item.product_list" :key="index_r" v-if="index_r!==0">
							<image :src="item_R.image_src" :style="{width:item_R.image_width+'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>

</template>

<script>
	import badgeMixin from '../../mixins/tabBar-badge.js'
	export default {
		mixins:[badgeMixin],
		data() {
			return {
				swiperList:[],
				navList:[],
				floorList:[]
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
		 async	getSwiperList() {
				const {data}=await uni.$http.get('/api/public/v1/home/swiperdata')
				// console.log(data);
				if(data.meta.status!==200) {
					return uni.showToast({
						title:"数据请求失败！",
						duration:2000,
						icon:none
					})
				}
				this.swiperList=data.message
				uni.$showMsg("数据请求成功")
				// console.log(this.swiperList,'000000');
			},
			async	getNavList(){
				const {data}=await uni.$http.get("/api/public/v1/home/catitems")
				// console.log(data,"分类数据");
				if(data.meta.status!==200){
					uni.$showMsg("数据获取失败")
				}
				uni.$showMsg("数据获取成功")
				this.navList=data.message
			},
			cate_click(item) {
				if(item.name==="分类") {
					uni.switchTab({
						url:"/pages/cate/cate"
					})
				}
			},
			async getFloorList(){
				const {data}=await uni.$http.get("/api/public/v1/home/floordata")
				// console.log(data,"楼层数据");
				if(data.meta.status!==200){
					uni.$showMsg("数据获取失败")
				}
				uni.$showMsg("数据获取成功")
				data.message.forEach(floor=>{
					floor.product_list.forEach(product=>{
						product.url="/subpkg/goods_list/goods_list?"+product.navigator_url.split("?")[1]
					})
				})
				this.floorList=data.message
			},
			gotoSearch(){
				uni.navigateTo({
					url:"/subpkg/search/search"
				})
			}
		}, 
	}
</script>

<style lang="scss">
	.search{
		position: sticky;
		top: 0;
		z-index: 999;
	}
	swiper {
		height: 330rpx;
		.swiper-item,
		image {
			height: 100%;
			width: 100%;
		}
	}
	.goods-cate {
		display: flex;
		justify-content: space-between;
		margin: 15px 0;
		.uni-card__content{
			 width: 128rpx;
			    height: 140rpx;
		}
	}
	.floor-title {
		 height: 60rpx;
		  width: 100%;
		  display: flex;
	}
	.floor-content {
		padding: 0px  10rpx;
		.image-box {
			display: flex;
			.right-box {
				display: flex;
				margin-left: 10rpx;
				flex-wrap: wrap;
				justify-content: space-between;
			}
		}
	}
	
</style>
