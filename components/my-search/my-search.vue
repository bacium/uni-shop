<template>
	<view class="search-box" @click="onClick">
		<view class="search-border">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			onClick(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.search-box {
	height: 50px;
	padding: 0 10px;
	background-color: #c00000;
	display: flex;
  align-items: center;
	.search-border {
		height: 36px;
		background-color: #ffffff;
		border-radius: 15px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		 .placeholder {
		    font-size: 15px;
		    margin-left: 5px;
		  }
	}
}
</style>