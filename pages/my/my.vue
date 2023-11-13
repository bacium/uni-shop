<template>
	<view class="my-content">
		<my-login v-if="!token"></my-login>
		<my-userInfo v-else></my-userInfo>
	</view>
</template>

<script>
	import badgeMixin from '../../mixins/tabBar-badge.js'
	import {mapState} from 'vuex'
	export default {
		mixins:[badgeMixin],
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('user',['token'])
		}
	}
</script>

<style lang="scss">
page, .my-content {
	height: 100%;
	background-color: #f4f4f4;
}
</style>
