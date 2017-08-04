<!--
账户设置
开发人名字 时间

-->
<template>
	<div id="settingInfo">
		<div class="row">
			<label class="tr">旧密码：</label>
			<span class="input">
				<input  type="text" name="" placeholder="请输入旧密码">
			</span>
		</div>
		<div class="row">
			<label class="tr">新密码：</label>
			<span class="input">
				<input  type="text" name=""  placeholder="请设置新密码">
			</span>
		</div>
		<div class="row">
			<label class="tr">确认密码：</label>
			<span class="input">
				<input  type="text" name="" placeholder="请确认新密码">
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
	.submit{
		float: left;
		text-align: center;
		background: #51BF91;
		border-radius: 4px;
		width: 256px;
		color: #fff;
	}
}

</style>