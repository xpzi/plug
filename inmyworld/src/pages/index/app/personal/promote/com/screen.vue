<!--
 
筛选按钮



-->
<template>
	<div class="select-row" :class="data.type === 'other' ? 'boder-solid': ''">
		<h3 class="typebt">{{ data.title }}</h3>
		<template v-if="data.type === 'input'">
			<div class="labs">
				<template v-for="(item, index) in data.labels">
					<a :class="{active: isActive(item.param)}"  @click="choose(item.param)">{{item.text}}</a>
				</template>
			</div>
			<div class="put">
				<span><input type="" v-model="inputData[data.m]" name=""></span><i></i>
				<span><input type="" v-model="inputData[data.x]"  name=""></span>人
				<b @click="inputSubmit">确认</b>
			</div>
		</template>
		<template v-if="data.type === 'ct'">
			<div class="labs">
				<a class="active">不限</a>
				<a>上海</a>
				<a >北京</a>
				<a >广州</a>
				<a >深圳</a>
				<a >成都</a>
				<a >天津</a>
			</div>
			<div class="put">
				<span >
					<div class="selectbox">
						<h4 @click.stop="ctIndex0Show = true">{{ City[ctIndex0].name }}</h4>
						<div v-if="ctIndex0Show" class="selectItembox" >
							<a v-for="(item, index) in City" @click.stop="changeCp(index)"  :class="index === ctIndex0">{{ item.name }}</a>
						</div>
					</div>
				</span><i></i>
				<span>
					<div class="selectbox">
						<h4 @click.stop="ctIndex1Show = true">{{ City[ctIndex0].cityList[ctIndex1].name }}</h4>
						<div v-if="ctIndex1Show"  class="selectItembox">
							<a  v-for="(item, index) in City[ctIndex0].cityList"   @click.stop="changeCt(index)" :class="index === ctIndex1">{{ item.name }}</a>
						</div>
					</div>
				</span>元
				<b>确认</b>
			</div>
		</template>
		<template v-if="data.type === 'other'">
			<div class="selectbox">
				<h4>推广方式</h4>
				<div v-if="ctIndex1Show" class="selectItembox">
					<a>口播+产品露出+产品使用</a>
				</div>
			</div>
			<div class="selectbox">
				<h4>主播性别</h4>
				<div class="selectItembox" v-if="ctIndex1Show">
					<a>其他</a>
					<a>男</a>
					<a>女</a>
				</div>
			</div>
			<div class="selectbox">
				<h4>粉丝属性</h4>
				<div v-if="ctIndex1Show" class="selectItembox">
					<a>其他</a>
					<a>男多</a>
					<a>女多</a>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import City from 'utils/city.js'
console.log('city',City)
// const city;

export default {
	name: 'inviScreen',
	props: {
		type: 'string',
		data: ''
	},
	data(){
		return {
			City,
			ctIndex0:0,
			ctIndex0Show: false,
			ctIndex1Show: false,
			ctIndex1:0,
			isInput: true,
			inputData: { [this.data.m]: '', [this.data.x]: ''}
		}
	},
	watch:{
		data(val, oldVal){
			if(!val.labels) return;
			for( var i =0; i < val.labels.length; i++){
				if( this.isActive(val.labels[i].param)){
					this.inputData = { [this.data.m]: '', [this.data.x]: ''};
					break;
				}
			}
			if( i === val.labels.length){
				this.inputData = Object.assign({}, val.param)
			}
		},
	},
	computed:{

	},
	methods:{
		isActive(itemPar){
			for( let key in this.data.param){
				if( this.data.param[key] !==  itemPar[key]){
					return  false;
					break;
				}
			}
			return true;
		},
		choose(itemPar){
			if( !this.isInput ){
				this.inputData = { [this.data.m]: '', [this.data.x]: ''}
			}
			this.isActive(itemPar) ||  this.$emit('choose', itemPar);
		},
		inputSubmit(){
			//1. 验证两个表单
			if(true){
				// 请求数据
				this.$emit('choose', this.inputData);

			}else{
				// 错误提示

			}
		},
		changeCp(index){
			this.ctIndex0 = index;
			this.ctIndex1 = 0;
			this.ctIndex0Show = false;
		},
		changeCt( index ){
			this.ctIndex1 = index;
			this.ctIndex1Show = false;
		},
		hideSelect: function(){
			var $vm = this;
			return function(){
				console.log('000')
				$vm.ctIndex0Show = false;
				$vm.ctIndex1Show = false;
			}
		}
	},
	mounted(){
		this.hideSelectFunc = this.hideSelect();
		window.document.addEventListener('click', this.hideSelectFunc );
	},
	beforeUpdate(){

	}

}

</script>


<style lang="less" scoped>
	.select-row{
	height: 51px;
	border-bottom: 1px dashed #dcdcdc;
	line-height: 26px;
	padding: 12px 0;
	font-size: 12px;
	color: #505050;

	.selectbox{
		// padding: 0 12px;
		position: relative;
		float: left;


		h4{
			// width: 60px;
			border-radius: 4px;
			padding:  0 8px;
			border:  1px solid #dcdcdc;
			color: #505050;
			font-size: 12px;
		}
		.selectItembox{
			position: absolute;
			background: #fff;
			z-index: 9999;
			max-height: 500px;
			overflow: auto;
			left: 0;
			top: 25px;
			width: 100%;
			border: 1px solid #dcdcdc;
			padding: 8px;
			a{
				display: block;
			}
		}
		.select{
			// width: 170px;
			margin-right: 36px;
			height: 26px;
			border-radius: 4px;
			border: 1px solid #d2d2d2;
			float: left;
			padding: 0 8px;
			margin-left: 8px;
			position: relative;

			i{
				display: inline-block;
				height: 5px;
				width: 9px;
				background: red;
				margin-left: 8px;
			}

			div{
				position: absolute;
				border: 1px solid #d2d2d2;
				border-radius: 4px;
				// border-top: 0;
				// height: 100px;
				width: 170px;
				left: -1px;
				top: 26px;
				background: #fff;
				a{float: left; width: 100%; text-align: center;}
			}
		}
	}

	.typebt{
		float: left;
		color: #282828;
		font-size: 14px;
		font-weight: bold;
		width: 90px;
	}

	.labs{
		float: left;
		a{ 
			float: left; margin-right: 26px; padding: 0 12px;
			color: #505050;
		}
		.active{
			background: #51BD90;
			border-radius: 4px;
			font-size: 12px;
			text-align: center;
			color: #fff;
		}
	}


	

	.put{
		float: right;
		width: 234px;
		// overflow: hidden;
		
		span{
			float: left;
			width: 60px;
			height: 26px;
			margin-right: 8px;
			input{
				padding: 0 8px;
				width: 100%;
				height: 100%;
				border: 1px solid #d2d2d2;
				border-radius: 4px;
			}

			select{
				height: 100%;
			}
		}
		i{
			float: left;
			margin: 13px  8px 0 0;
			height: 1px; 
			width: 10px;
			background: #d2d2d2;
		}
		b{
			float: right;
			height: 26px;
			width: 48px;
			line-height: 24px;
			border-radius: 4px;
			background: #f2f2f2;
			border: 1px solid #d2d2d2;
			text-align: center;
			color: #787878;
		}
		
	}
}
.boder-solid{
	border-bottom: solid 1px #dcdcdc;
}
</style>