<!--
网红邀约
开发人名字 时间

-->
<template>
	<div>
		<!-- label -->
		<iScreen v-for="(item, index) in screenDate" :key="index" :data="item" @choose="chooseScreen"></iScreen>
		
		<!-- 邀约数量 -->
		<div class="yaoyue-info">
			<span>您邀约了<i class="wh">380</i>个网红</span>
			<span>粉丝合计<i class="fs">493920</i>人</span>
			<span>预计总观看人数<i class="yj">3050792</i>人</span>
			<router-link :to="{name:'/login'}">立即邀约</router-link>
		</div>
		
		
		<template v-if="tableData.data">	
			<!-- table -->
			<itable :columns="tableHead" :data="tableData.data"></itable>

			<!-- page -->
			<div class="pagebox">
				<ipage :total="tableData.count" :page-size="tableData.size" show-elevator	></ipage>
			</div>
		</template>
		<template v-else>
			<div>加载中</div>
		</template>
		
		

	</div>
</template>

<script>
	import { personalRouteSpace } from '@/router/routes/config'
	import itable from 'iview-ui/table'
	import ipage from 'iview-ui/page'
	import iScreen from '../com/screen.vue'

	import S from 'service'
	import * as apis from './apis'
	S.$extend(apis)

	const icon =  require('assets/images/public/iconbg.png');
	const iconbg = `url(${icon})`;

	const cankao = ['', '', '口播+产品露出+产品使用', '', '产品露出+产品使用'];

export default {
	name: 'PPromoteCelebrity',

	mixins: [],

	props: {

	},

	components: {
		itable, ipage, iScreen
	},

	
	watch: {

	},

	computed: {
		getParams(){
			return this.tableData.parms;
		},
		screenDate(){
			var params = this.tableData.parms;
			if(!params) return [];

			var {fn_m, fn_x, p_m, p_x,g_m,g_x} = params;
			return [
				{ 
					type:'input', 
					m: 'fn_m',
					x: 'fn_x',
					title: '粉丝数',
					param: {fn_m, fn_x},
					labels: [{
						text:'不限',
						param:{fn_m: '', fn_x: ''}
					},{
						text: '1000-5000',
						param:{fn_m: '1000', fn_x: '5000'}
					},{
						text: '5000-1万',
						param:{fn_m: '5000', fn_x: '10000'}
					},{
						text: '1万-2万',
						param:{fn_m: '10000', fn_x: '20000'}
					},{
						text: '5万-10万',
						param:{fn_m: '50000', fn_x: '100000'}
					},{
						text: '10万以上',
						param:{fn_m: '100000', fn_x: ''}
					}]
				},
				{ 
					type:'input', 
					m: 'p_m',
					x: 'p_x',
					title: '地区',
					param: {p_m, p_x},
					labels: [{
						text:'不限',
						param:{p_m: '', p_x: ''}
					},{
						text: '500元以下',
						param:{p_m: '', p_x: '500'}
					},{
						text: '500-1000',
						param:{p_m: '500', p_x: '1000'}
					},{
						text: '1000-5000',
						param:{p_m: '1000', p_x: '5000'}
					},{
						text: '5000-1万',
						param:{p_m: '5000', p_x: '10000'}
					},{
						text: '1万-5万',
						param:{p_m: '10000', p_x: '50000'}
					}]
				},
				{ 
					type:'input', 
					m: 'g_m',
					x: 'g_x',
					title: '等级',
					param: {g_m, g_x},
					labels: [{
						text:'不限',
						param:{g_m: '', g_x: ''}
					},{
						text: '1-10级',
						param:{g_m: '1', g_x: '10'}
					},{
						text: '10-20级',
						param:{g_m: '10', g_x: '20'}
					},{
						text: '20-40级',
						param:{g_m: '20', g_x: '40'}
					},{
						text: '40-60级',
						param:{g_m: '40', g_x: '60'}
					},{
						text: '60-80级',
						param:{g_m: '60', g_x: '80'}
					}]
				},
				{
					type: 'ct',
					title: '城市',
				},
				{
					type: 'other',
					title: '其他',
				}
			]
		}
	},

	methods: {
		chooseScreen( param ){
			var params = Object.assign({}, this.tableData.parms, param);
			this.refreshTableData(params);
		},
		refreshTableData(params){
			params = params || this.getParams;
			this.$S.SEARCH( params ).then( data => {
				// console.log('data', data);
				this.tableData = data;
			})
		}
	},

	filters: {

	},

	beforeCreate () {

	},

	created () {

	},

	mounted () {
		// console.log( this.getParams  );
		this.refreshTableData();
	},

	render (h) {

	},
	data () {
		return {
			

			personalRouteSpace,
			tableData:  { size: 10, count: 0, data: null, parms: {"fn":"0","fn_m":"","fn_x":"","g":"0","g_m":"","g_x":"","t":"3","pr":"0","p_m":"","p_x":"","ps":"0","sp":"","sc":"","sex":"","f":"","tag":"","p":1,"name":""}},
			tableHead: [
				{ title: '网红昵称', key:'nick', width: 220, render: (h, params) => {
					return (<div class="tb-nick">
						<div class="che">
							<input type="checkbox" id={'che'+params.row.uid} />
							<label for={'che'+params.row.uid} style={{backgroundImage: iconbg}}></label>
						</div>
						<a href={'/#/celebrity-library/detail?uid=' + params.row.uid} class="head_pic">
							<img src={params.row.head_pic}/>
						</a>
						<div class="basisinfo">
							<h3>{params.row.nick}<i class={['sex', params.row.sex ? 'nv' : 'nan']} style={{backgroundImage: iconbg}}></i></h3>
							<span><i class="location" style={{backgroundImage: iconbg}}></i>{params.row.location}</span>
						</div>
					</div>)
				}},
				{ title:'粉丝数量', key: 'fans_num'},
				{ title:'平均观看人数', key: 'active_count'},
				{ title:'等级', width: 120, key: 'level'},
				{ title:'参考邀约费', key: 'cpt_price3', width: 250, render: ( h, params) => {
					return (
						<div class="cankao">
							{ cankao.map( (item,index) => {
								let price = params.row['cpt_price'+(index+1)];
								if( price > 0){
									return (<span>{item}: ¥{price}</span>)
								}
							})
							}
						</div>
					)
				}},
				{ title:'操作', key: 'uid', render: (h, params) => (<a href={'/#/celebrity-library/detail?uid=' + params.row.uid}>查看网红详情</a>) },
			],
		}
	}
}

</script>



<style lang="less">

.ivu-table-cell{
	padding: 14px;
}

.cankao{
	span{
		display: block;
		padding: 4px 0;
	}
}
.tb-nick{
	height: 100%;
	display: table-cell;
	vertical-align: middle;
	
	.che{
		display: inline-block;
		vertical-align: middle;
		height: 14px;
		width: 28px;
	
		label{
			position: absolute;
			height: 14px;
			width: 14px;
			background-position: -108px -49px;
		}
		input:checked + label{
			    background-position: -108px -74px;
		}
	}
	.head_pic{
		display: inline-block;
		vertical-align: middle;
		margin-right: 12px;
		height: 48px;
		width: 48px;
		img{height: 100%;width: 100%; border-radius: 100%; vertical-align: middle;}
	}
	.basisinfo{
		display: inline-block;
		vertical-align: middle;
		overflow: hidden;
		

		h3{
			font-size: 14px;
			color: #282828;
			position: relative;
			max-width: 100px;
			height: 20px;
			line-height: 20px;
			padding-right:20px;
			word-wrap: break-word;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			.sex{
				position: absolute;
				right: 0;
				height: 20px;
				width: 20px;
			}
			.nv{ background-position: -42px -46px;}
			.nan{ background-position: -42px -71px; }
		}
		span{
			font-size: 12px;
			color: #a0a0a0;
			i{
				display: inline-block;
				height: 20px;
				width: 13px;
				background-position: -47px -94px;
				margin-bottom: -4px;
			}
		}
	}
}
.ivu-page{
	display: inline-block;
}
</style>

<style lang="less" scoped>



.yaoyue-info{
	line-height: 36px;
	font-size: 14px; 
	padding: 36px 0 8px;

	span{
		color: #505050;
		padding-right: 36px;

		.wh{ color: #ed714e;}
		.fs{ color: #a15ae7;}
		.yj{ color: #51bd90;}
	}
	a{
		float: right;
		height: 36px;
		width: 160px;
		text-align: center;
		background: #51BD90;
		border-radius: 4px;
		color: #fff;
	}
}




.pagebox{
	margin: 0 auto;
	padding: 32px 0;
	text-align:center;
}

</style>
