<template>
	<view class="login-box">
		<uni-icons type="contact-filled" size="100" color="#AFAFAFs"></uni-icons>
		<button class="login-button" open-type="getUserInfo" @getuserinfo="getUserProfile">一键登录</button>
		<view class="login-tips">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		name:"my-login",
		computed:{
			...mapState('user',['redirectInfo'])
		},
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('user',['updateUserInfo','undateToken','updateRedirectInfo']),
		async	getUserProfile(e){
				
				// console.log(e.detail);
				 // 判断是否获取用户信息成功
				if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
				// 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
				this.updateUserInfo(e.detail.userInfo)
				this.getToken(e.detail)
			},
		async	getToken(info){
				const [err,success]=await uni.login().catch(err=>err)
				// console.log(info,success);
				if(success.errMsg==="login:ok"){
					const query={
						code:success.code,
						encryptedData:info.encryptedData,
						iv:info.iv,
						rawData:info.rawData,
						signature:info.signature
						
					}
					
					const {data}=await uni.$http.post('/api/public/v1/users/wxlogin',query)
					 console.log(data,'data');
					 // if (data.meta.status !== 200) return uni.$showMsg('登录失败！')
					 // 由于接口问题     默认把code当成token使用
					 let token='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
					 if(data.meta.status === 400) {
					  uni.$showMsg('登录成功')
						 this.undateToken(token)
						this.navicateBack()
					 }
				}
			},
			navicateBack(){
				console.log(this.redirectInfo);
				if(this.redirectInfo&&this.redirectInfo.openType==='switchTab') {
					uni.switchTab({
						url:this.redirectInfo.from,
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.login-box{
	// 登录盒子的样式
	  height: 750rpx;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  background-color: #f8f8f8;
	  position: relative;
	  overflow: hidden;
	
	  // 绘制登录盒子底部的半椭圆造型
	  &::after {
	    content: ' ';
	    display: block;
	    position: absolute;
	    width: 100%;
	    height: 40px;
	    left: 0;
	    bottom: 0;
	    background-color: white;
	    border-radius: 100%;
	    transform: translateY(50%);
	  }
	.login-button{
		width: 90%;
		border-radius: 100px;
		color: white;
		margin: 15px 0;
		background-color: #c00000;
	}
	.login-tips{
		  font-size: 12px;
		    color: gray;
	}
}
</style>