<!--
需求定制 和 网红邀约公用头部
libx@inke 2017-06-13

-->
<template>
	<div class="p-promote-title-wrapper" >
		<router-link v-for="(item, index) in routes" :key="index" class="p-promote-title-link" :to="{path: item.path}">{{item.text}}</router-link>

		<div class="searchname">
			<span>
				<input type="text" placeholder="搜索网红ID/昵称" name="">
				<a :style="{backgroundImage: `url(${bg})`}"></a>
			</span>
		</div>
	</div>
</template>
<script>

import { personalRouteSpace } from '@/router/routes/config'

const bg = require('assets/images/public/search.png');


export default {
	// 写name可使组件查看更严谨
	name: 'PPromoteTitle',

	mixins: [],

	props: {

	},

	components: {

	},

	data () {
		return {
			bg,
			routes: [{
				path: personalRouteSpace + '/promote/invitation',
				text: '网红邀约'
			}, {
				path: personalRouteSpace + '/promote/customize',
				text: '需求定制'
			}]
		}
	}
}

</script>


<style lang="less" scoped>
@import '~common/less/variable';


@component-prefix: ~'p-promote-title';

.@{component-prefix} {
	&-wrapper {
		line-height: 0;
		padding-bottom: 30px;
	}

	&-link {
		font-size: 16px;
		line-height: 22px;
		padding-bottom: 8px;
		margin-right: 24px;
		display: inline-block;

		&.router-link-active {
			color: @var-theme-color;
			border-bottom: 2px solid @var-theme-color;
		}
	}

}

.searchname{
	float: right;

	span{
		display: block;
		width: 280px;
		height: 36px;
		border-radius: 4px;
		border: 1px solid #b5b5b5;
		padding:  0 8px;
		position: relative;
		input{ 
			background: transparent;
			line-height: 36px;
			width: 100%;
			height: 100%;
		}
		input:placeholder{
			font-size: 14px;
			color: #a0a0a0;
		}

		a{
			position: absolute;
			height: 14px;
			width: 14px;
			right: 8px;
			top: 9px;
		}
	}
}

</style>