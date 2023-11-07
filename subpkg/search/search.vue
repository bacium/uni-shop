<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<uni-search-bar :radius="100" :focus="true"  cancelButton="none" @input="oninput"/>
		</view>
		
		
		<!-- 搜索建议 -->
		<view class="suggest-box" v-if="searchResult.length!==0">
			<view class="suggest-item" v-for="(item,index) in searchResult" :key="index"
			@click="gotoGoodDetail(item)">
				<view class="suggest-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="right" size="16"></uni-icons>
			</view>
		</view>
		
		
		<!-- 苏索历史 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				 <uni-icons type="trash" size="17" @click="clearSearch"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag v-for="(item,inddx) in histories" :key="index" :text="item" type="primary" @click="gotoGoods_list(item)" ></uni-tag>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeId:null,
				value:'',
				searchResult:[],
				historyList:[]
			};
		},
		computed:{
			histories(){
				// 翻转数组，历史记录排在最前面
			return	[...this.historyList].reverse();
			}
		},
		onLoad() {
			// 页面加载时读取本地的搜索记录
			this.historyList=JSON.parse(uni.getStorageSync("searchValue")||"[]")
		},
		methods:{
			oninput(e){
				clearTimeout(this.timeId)
				this.timeId=setTimeout(()=>{
				// console.log(e,'e');
					this.value=e
					this.getSearchResult()
					
				},500)
			},
			// 获取搜索结果
			async getSearchResult(){
				if(this.value) {
				const {data}=await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.value})
					this.searchResult=data.message
					this.saveSearchHistory()
				}else {
					this.searchResult=[]
				}
			},
			// 跳转到详情页
			gotoGoodDetail(item){
			// console.log(item,'item');	
			uni.navigateTo({
				url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
			})
			},
			// 保存搜索历史记录
			saveSearchHistory(){
				/* 
				1、最新的搜索记录排在最前面，调用数组的reverse()方法
				2、搜索的记录去重			调用集合的set方法	 
				 */
				const set=new Set(this.historyList)
				// 先删除重复项
				set.delete(this.value)
				// 在进行添加重复项
				set.add(this.value)
				// 把转化后的对象还原回数组,赋值到原数组中
				this.historyList=Array.from(set)
				
				// 数据持久存储到本地，页面加载时调用
				uni.setStorageSync('searchValue',JSON.stringify(this.historyList))
			},
			// 清空搜索记录
			clearSearch(){
				this.historyList=[]
				uni.setStorageSync('searchValue',"[]")
			},
			gotoGoods_list(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+item
				})
			}
		}
		
	}
	
</script>

<style lang="scss">
.search-box{ 
	position: sticky;
	top: 0;
	z-index: 999;
}
.suggest-box {
	padding: 0 5px;
	.suggest-item {
		display: flex;
		align-items:center;
		justify-content: space-between;
		font-size: 12px;
		padding: 13px 0;
		border-bottom: 1px solid #efefef;
		.suggest-name {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
.history-box{
	padding: 0 5px;
	.history-title {
		display: flex;
		height: 40px;
		justify-content: space-between;
		align-items: center;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
	}
	.history-list {
		display: flex;
		flex-wrap: wrap;
		.uni-tag  {
		 margin-top: 5px;
		margin-right: 5px;
		}
	}
}
</style>
