import {mapGetters} from 'vuex'
	export default {
		computed:{
			...mapGetters('cart',['goodsTotal'])
		},
		watch:{
			goodsTotal(){
				this.setBadge()
			}
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