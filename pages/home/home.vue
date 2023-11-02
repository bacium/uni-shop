<template>
	<view>
	home	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList
			};
		},
		onLoad() {
			this.getSwiperList()
		},
		methods:{
		 async	getSwiperList() {
			 debugger;
				const {data}=await uni.$http.get('/api/public/v1/home/swiperdata')
				console.log(data);
				console.log(123);
			}
		}
	}
</script>

<style lang="scss">

</style>
