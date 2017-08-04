<!--
账户设置
开发人名字 时间

-->
<template>
	<div id="settingInfo">
		<div class="row">
			<label class="tr">姓名：</label>
			<span class="input">
				<input  type="text" name="" placeholder="请设置姓名，以便我们联系您">
			</span>
		</div>
		<div class="row">
			<label class="tr">原手机号：</label>
			<span class="input">
				<input  type="text" name="" value="123-1234-1245" placeholder="">
			</span>
		</div>
		<div class="row">
			<label class="tr">新手机号：</label>
			<span class="input">
				<input  type="text" name="" placeholder="请输入新手机号">
			</span>
		</div>
		<div class="row">
			<label class="tr">验证码：</label>
			<span class="vercode">
				<span>
					<input  type="text" name="" placeholder="请输入验证码">
				</span>
				<a>获取验证码</a>
			</span>
		</div>
		<div class="row">
			<label class="tr">邮箱：</label>
			<span class="input">
				<input  type="text" name="" placeholder="请输入您的邮箱">
			</span>
		</div>
		<div class="row"></div>
		<div class="row"><label class="tr"></label><a  class="submit">提交</a></div>
	</div>
</template>

<script>

export default {
	name: 'PSetting',

	mixins: [],

	props: {

	},

	components: {

	},

	data () {
	return {

	}
	},

	watch: {

	},

	computed: {

	},

	methods: {

	},

	filters: {

	},

	created () {

	},

	mounted () {

	},

	render (h) {

	}
}

</script>


<style lang="less" scoped>

#settingInfo{
	padding: 80px 0 0;
}

.row{
	height: 40px;
	margin-bottom: 14px;
	line-height: 40px;
	font-size: 12px;
	
	.vercode{
		float: left;
		height: 40px;
		width: 324px;
		span{
			float: left;
			border: 1px solid #e9edee;
			height: 40px;
			width: 234px;
			padding:  0 10px;
		}
		a{
			float: right;
			height: 40px;
			width: 80px;
			background: #51BF91;
			border-radius: 4px;
			text-align: center;
			color: #fff;
		}
	}

	.tr{
		float: left;height: 40px;
		width: 338px;
		text-align: right;
		color: #505050;
		padding-right: 8px;
	}
	.input{
		float: left;
		border: 1px solid #e9edee;
		height: 40px;
		width: 324px;
		padding: 0 10px;
	}
	.submit{
		float: left;
		text-align: center;
		background: #51BF91;
		border-radius: 4px;
		width: 256px;
		color: #fff;
	}

	input{
		background: transparent;
		width: 100%;
		height: 100%;
	}

	input:placeholder{
		font-size: 12px;
		color: #a0a0a0;
	}
}

</style>