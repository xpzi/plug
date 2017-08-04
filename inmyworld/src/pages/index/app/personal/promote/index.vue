<!--
我要推广
libx@inke.cn 2017-06-14

-->
<template>
	<div id="promote">
		<p-promote-title></p-promote-title>
		<router-view></router-view>
	</div>
</template>

<script>
import pPromoteTitle from './com/title'

export default {
	name: 'PPromote',

	mixins: [],

	props: {

	},

	components: {
		pPromoteTitle
	},

	data () {
		return {

		}
	},

	created () {

	}
}

</script>


<style lang="less" scoped>
#promote{
	background: #fff;
	border-radius: 4px;
	padding: 24px;
}


</style>