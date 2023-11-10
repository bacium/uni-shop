<template>
	<view>
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

</style>
