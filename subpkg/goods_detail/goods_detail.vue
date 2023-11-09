<template>
	<view>
		<view class="goods-info" v-if="goods_info.goods_name">
			<!-- 轮播图区域 -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			  <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
			    <image :src="item.pics_big" @click="preview(i)"></image>
			  </swiper-item>
			</swiper>
			
			<!-- 商品信息 -->
			<view class="goods-info-box">
				<view class="goods-price">
					￥{{goods_info.goods_price}}
				</view>
				<view class="goods-detail">
					<view class="goods-detail-name">
						{{goods_info.goods_name}}
					</view>
					<view class="goods-icon">
						<uni-icons type="star" size="18" color="gray"></uni-icons>
						<text>收藏</text>
					</view>
				</view>
				<view class="goods-postFree">
					快递：免运费
				</view>
			</view>
			
			<!-- 商品图片节点区 -->
			<rich-text :nodes="goods_info.goods_introduce"></rich-text>
			
			<!-- 商品导航组件 -->
			<view class="goods_nav">
			  <!-- fill 控制右侧按钮的样式 -->
			  <!-- options 左侧按钮的配置项 -->
			  <!-- buttonGroup 右侧按钮的配置项 -->
			  <!-- click 左侧按钮的点击事件处理函数 -->
			  <!-- buttonClick 右侧按钮的点击事件处理函数 -->
			  <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	
	export default {
		computed:{
		...mapState('cart',[])	,
		...mapGetters('cart',['goodsTotal'])
		},
		watch:{
			goodsTotal:{
				handler(newValue) {
					const targetButton=this.options.find(x=>x.text==="购物车")
					if(targetButton){
						targetButton.info=newValue
					}
				},
				immediate:true
			}
			
		},
		data() {
			return {
				goods_id:'',
				goods_info:{},
				 // 左侧按钮组的配置对象
				    options: [{
				      icon: 'shop',
				      text: '店铺'
				    }, {
				      icon: 'cart',
				      text: '购物车',
				      info: 0
				    }],
				    // 右侧按钮组的配置对象
				    buttonGroup: [{
				        text: '加入购物车',
				        backgroundColor: '#ff0000',
				        color: '#fff'
				      },
				      {
				        text: '立即购买',
				        backgroundColor: '#ffa200',
				        color: '#fff'
				      }
				    ]
			};
		},
		onLoad(payload) {
			// console.log(payload);
			this.goods_id=payload.goods_id
			this.getGoodsDetail(this.goods_id)
		},
		methods:{
			...mapMutations('cart',['addToCart']),
			async getGoodsDetail(id){
				const {data}=await uni.$http.get('/api/public/v1/goods/detail',{goods_id:Number(id)})
				// console.log(data,'2222');
				if(data.meta.status!==200) return uni.$showMsg('商品信息获取失败')
				data.message.goods_introduce=data.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g,'jpg')
				
				this.goods_info=data.message
			},
			// 图片预览
			preview(index) {
				uni.previewImage({
					current:index,
					urls:this.goods_info.pics.map(x=>x.pics_big)
				})
			},
			onClick(e) {
				// console.log(e);
				if(e.content.text==="购物车") {
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			buttonClick(e){
				// console.log(e,'右侧');
				if(e.content.text==="加入购物车") {
					const goods={
						goods_id:this.goods_info.goods_id, 
						goods_name:this.goods_info.goods_name, 
						goods_price:this.goods_info.goods_price, 
						goods_count:1, 
						goods_small_logo:this.goods_info.goods_small_logo, 
						goods_state:this.goods_info.goods_state
					}
					this.addToCart(goods)
				}
			}
		}
	}
</script>

<style lang="scss">
	.goods-info {
		padding-bottom: 50px;
		}
		swiper {
		  height: 750rpx;
		
		  image {
		    width: 100%;
		    height: 100%;
		  }
		}
		.goods-info-box {
			padding: 10px;
			  padding-right: 0;
			.goods-price {
				color: #c00000;
				    font-size: 18px;
				    margin: 10px 0;
			}
			.goods-detail{
				 display: flex;
				    justify-content: space-between;
				.goods-detail-name {
					font-size: 13px;
					      padding-right: 10px;
				}
				.goods-icon {
					 width: 120px;
					 font-size: 12px;
					 display: flex;
					 flex-direction: column;
					 justify-content: center;
					 align-items: center;
					 border-left: 1px solid #efefef;
					 color: gray;
				}
			}
			.goods-postFree{
				 margin: 10px 0;
				 font-size: 12px;
				 color: gray;
			}
		}
		.goods_nav {
  // 为商品导航组件添加固定定位
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
	

</style>
