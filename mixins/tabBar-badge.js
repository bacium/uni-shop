import {mapGetters} from 'vuex'
	export default {
		computed:{
			...mapGetters('cart',['goodsTotal'])
		},
		onShow() {
			this.setBadge()
		},
		methods:{
			setBadge(){
				uni.setTabBarBadge({
					index:2,
					text:this.goodsTotal+''
				})
			}
		}
	}