<!--
整体情况
开发人名字 时间

-->
<template>
	<div id="overall">
		<div class="yu-e">
			<ul>
				<li>
					<h3>可用余额</h3>
					<span>2,000,000元</span>
				</li>
				<li>
					<h4>冻结余额</h4>
					<span>2,000元</span>
				</li>
				<li>
					<h5>交易余额</h5>
					<span>2,000元</span>
				</li>
				<li>
					<a>充值</a>
				</li>
			</ul>
		</div>
		<div class="total">
			<h3>投放订单总览</h3>
			<div class="state">
				<label><span>审核中：121</span><a>查看</a></label>
				<label><span>审核中：100</span><a>查看</a></label>
				<label><span>审核中：0</span><a>查看</a></label>
				<label><span>审核中：0</span><a>查看</a></label>
				<label><span>审核中：0</span><a>查看</a></label>
				<label><span>审核中：0</span><a>查看</a></label>
				<label><span>审核中：0</span><a>查看</a></label>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'POverviewOverall',

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

#overall{padding-top: 10px; }

.yu-e{
	padding: 20px;  
	background: #fff;
	border-radius: 4px;
	height: 100px;
	width: 100%;

	li{
		float: left;
		height: 60px;
		width: 296px;


		&:nth-child(1){
			h3{
				color: #282828;
				font-size: 16px;
				line-height: 22px;
				font-weight: bold;
				padding-bottom: 16px;
			}
			span{
				font-size: 20px;
				color: #282828;
				line-height: 20px;
			}
		}

		&:nth-child(2){
			h4{
				font-size: 14px;
				color: #282828;
				line-height: 20px;
				padding-bottom: 16px;
			}
			span{

				font-size: 20px;
				color: #C8C8C8;
				line-height: 20px;
			}
		}

		&:nth-child(3){
			width: 150px;
			h5{
				font-size: 14px;
				color: #282828;
				line-height: 20px;
				padding-bottom: 16px;
			}
			span{
				font-size: 18px;
				color: #ED704D;
				line-height: 20px;
			}
		}
		&:nth-child(4){
			width: 171px;
			float: right;
			
			padding-left: 35px;
			border-left: 1px solid #ececec;
			text-align: center;
			line-height: 60px;
			padding-right: 16px;

			a{
				display: inline-block;
				height: 40px;
				width: 120px;
				color: #fff;
				font-size: 16px;
				line-height: 40px;
				background: #51BD90;
				border-radius: 4px;
			}
		}
	}
}

.total{
	margin-top: 20px;
	height: 160px;
	background: #fff;
	border-radius: 4px;
	padding: 20px;
	h3{
		font-weight: bold;
		padding: 0 0 36px 0;
		font-size: 16px;
		line-height: 22px;
		color: #282828;
	}
	.state{
		padding-bottom: 10px;
		font-size: 14px;
		line-height: 20px;

		label{
			float: left;
			height: 20px;
			width: 117px;
			margin: 0 180px 12px 0;
				
			a{float: right; color: #508BEC;}

		}

		label:nth-child(4n){
			width: 117px;
			margin-right: 0px;
		}
	}
}


</style>
