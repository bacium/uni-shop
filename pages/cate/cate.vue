<template>
	<view class="scroll-view-content">
		<!-- 左侧 -->
		<scroll-view scroll-y="true" :style="{height:screenHeight+'px'}" class="scroll-view-left" >
			<view class="scroll-content active">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
			<view class="scroll-content">请问番茄</view>
		</scroll-view>
		
		<!-- 右侧 -->
		<scroll-view scroll-y="true"  :style="{height:screenHeight+'px'}" class="scroll-view-right">
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
			<view>阿斯顿发送到</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight:0
			};
		},
		async onLoad() {
			const sysInfo=await uni.getSystemInfoAsync()
			console.log(sysInfo,'123');
			this.screenHeight=sysInfo[1].windowHeight
		}
	}
</script>

<style lang="scss">
.scroll-view-content {
	display: flex;
	.scroll-view-left {
		width: 120px;
		
		.scroll-content {
			line-height: 60px;
			background-color: #ccc;
			&.active {
				background-color: #fff;
				color: red;
				position: relative;
				&::before {
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					content:'';
					height: 30px;
					width: 4px;
					background-color: #C00000;
				}
			}
		}
	}
}
</style>
