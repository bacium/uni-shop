<template>
	<view>
		<view class="goods-box" v-for="(item,idx) in goods_list" :key="idx" @click="gotoGoodsDetail(item)">
		<my-goods :goods="item"></my-goods>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:15
				},
				total:0,
				goods_list:[],
				
				// 节流阀
				isLoading:false
			};
		},
	
		onLoad(payload) {
			// console.log(payload,'payload');
			this.queryObj.query=payload.query||''
			this.queryObj.cid=payload.cid||''
			this.getGoodsList()
		},
		methods:{
		async	getGoodsList(cb){
			this.isLoading=true
				const {data}=await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				// console.log(data,'goodslist数据i');
				
				if(data.meta.status!==200) {
					return uni.$showMsg("数据获取失败")
				}
				cb&&cb()
				this.isLoading=false
				this.goods_list=[...this.goods_list,...data.message.goods]
				this.total=data.message.total
			},
			gotoGoodsDetail(goods_info){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+goods_info.goods_id
				})
			}
		},
		onReachBottom(){
			if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total) return uni.$showMsg('数据已加载完毕')
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			// 下来刷新
			this.queryObj.pagenum=1
			this.total=0
			this.isLoading=false
			this.goods_list=[]
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
	.goods-box {
		padding: 10px 5px;
		
	
	}
</style>
