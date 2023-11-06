<template>
	<view class="scroll-view-content">
		<!-- 左侧 -->
		<scroll-view scroll-y="true" :style="{height:screenHeight+'px'}" class="scroll-view-left" >
			<block v-for="item,index in cateList" :key="index" >
				<view :class="['scroll-content',index===activeIndex?'active':'']" @click="toggleActive(index)">{{item.cat_name}}</view>
			</block>
		</scroll-view>
		
		<!-- 右侧 -->
		<scroll-view :scroll-top="scrollTop" scroll-y="true"  :style="{height:screenHeight+'px'}" class="scroll-view-right" >
			<view class="cate-lv2-list" v-for="item2,index2 in cateLeval2" :key="index2">
				<view class="cate-lv2-title">
					/{{item2.cat_name}}/
				</view>
				<view class="cate-lv3-detail" >
					<view class="cate-lv3-item" v-for="(item3,index3) in item2.children" :key="index3" @click="gotoGoodsDetail(item3)">
						<image :src="item3.cat_icon"></image>
						<text>{{item3.cat_name}}</text>
					</view>
				</view>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight:0,
				cateList:[], //一级分类
				cateLeval2:[], // 二级分类
				activeIndex:0,
				scrollTop:0
			};
		},
		async onLoad() {
			const sysInfo=await uni.getSystemInfoAsync()
			this.screenHeight=sysInfo[1].windowHeight
			this.getCateList()
		},
		methods:{
		async	getCateList(){
				const {data}=await uni.$http.get("/api/public/v1/categories")
				if(data.meta.status!==200) {
					return uni.$showMsg("数据请求失败")
				}
				// 一级分类赋值
				this.cateList=data.message
				// 二级分类赋值
				this.cateLeval2=data.message[0].children
			},
			// 切换二级分类
			toggleActive(index) {
				this.activeIndex=index
				this.cateLeval2=this.cateList[index].children
				this.scrollTop=this.scrollTop===0?1:0
			},
			// 点击跳转到商品详情页
			gotoGoodsDetail(item) {
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-view-content {
	display: flex;
	.scroll-view-left {
	width: 120px;
		.scroll-content {
			line-height: 60px;
			background-color: #f7f7f7;
			text-align: center;
			&.active {
			 background-color: #ffffff;
			 position: relative;
				&::before {
				  content: ' ';
				  display: block;
				  width: 3px;
					height: 30px;        
					background-color: #c00000;
					position: absolute;
				  left: 0;
				  top: 50%;
				  transform: translateY(-50%);
				}
			}
		}
	}
	.scroll-view-right {
		.cate-lv2-list {
			.cate-lv2-title {
				 font-size: 12px;
				  font-weight: bold;
				  text-align: center;
				  padding: 15px 0;
			}
			.cate-lv3-detail {
				display: flex;
				flex-wrap: wrap;
				.cate-lv3-item {
					width: 33.33%;
				    margin-bottom: 10px;
				    display: flex;
				    flex-direction: column;
				    align-items: center;
					image{
						width: 60px;
						height: 60px;
					}
					text {
						 font-size: 12px;
					}
				}
			}
			
			
		}
	
	}
}


</style>
