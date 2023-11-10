<template>
	<view class="login-box">
		<uni-icons type="contact-filled" size="100" color="#AFAFAFs"></uni-icons>
		<button class="login-button" open-type="getUserInfo" @getuserinfo="getuserinfo">一键登录</button>
		<view class="login-tips">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('user',['updateUserInfo']),
			getuserinfo(e){
				console.log(e);
				uni.getUserProfile({
					desc:'商城测试',
					lang:'zh_CN'
				})
				// this.updateUserInfo(e.detail)
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