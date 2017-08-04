<!--
  组件功能
  开发人名字 时间

-->
<template>
    <div v-title="'映天下 | 网红详情'" class="white_bj" >
        <div  :class="[`${classPrefix}-content`, 'base-1200']">
            <div :class="[`${classPrefix}-content-introduction`]">
                <img :src="baseinfo && baseinfo.head_pic">
                <p><span><b>{{ baseinfo && baseinfo.nick  }}</b><a v-if="baseinfo && baseinfo.status == 1" @click="_host">工作邀约</a></span>粉丝 {{ baseinfo && baseinfo.fans_num  }}</p>
                <p>
                    <span>映客ID：<b>{{ baseinfo && baseinfo.uid  }}</b></span>
                    <span>年龄：<b>{{ baseinfo && (baseinfo.age != '' && baseinfo.age != '0') ? baseinfo.age +'岁' :'保密' }}</b></span>
                    <span>身高：<b>{{ baseinfo && (baseinfo.height != '' && baseinfo.height != '0') ? baseinfo.height +'cm' :'保密' }}</b></span>
                    <span>体重：<b>{{ baseinfo && (baseinfo.weight != '' && baseinfo.weight != '0') ? baseinfo.weight +'KG' :'保密' }}</b></span>
                    <span>性别：<b>{{ baseinfo && baseinfo.sex ? '男' :'女' }}</b></span>
                    <span>城市：<b>{{ baseinfo && baseinfo.location ? baseinfo.location :'未知' }}</b></span>
                    <span>等级：<b>{{ baseinfo && baseinfo.level ? baseinfo.level + '级' :'未知' }}</b></span>
                    <span>粉丝数：<b>{{ baseinfo && baseinfo.fans_num ? numberFans(baseinfo.fans_num) :'未知' }}</b></span>
                </p>
            </div>
            <transition>
                <div v-if="baseinfo && baseinfo.pic " :class="[`${classPrefix}-content-photo`]"  style="overflow: visible; height:234px;">
                    <img v-for=" (item, index) in baseinfo.pic"  :src="item" class="img-tow" @click="clickImg(index)">
                    <big-img v-if="showImg" :picindex="picIndex" :pics="baseinfo.pic"  @clickit="viewImg"></big-img>
                </div>
            </transition>


            <div :class="[`${classPrefix}-content-experience`]">
                <b class="refer-yaoyue">工作经验</b>
                <p><pre>{{ baseinfo && baseinfo.workinfo ? baseinfo.workinfo :'网红暂未上传' }}</pre></p>
                <b class="refer-yaoyue">个人信息</b>
                <ul >
                    <li>
                        <b >语言能力</b>
                        <template v-if="baseinfo && baseinfo.language ">
                            <span v-for="(item, index) in baseinfo.language">{{ item }}</span>
                        </template>
                    </li>
                   <!--  <li>
                        <b>爱好兴趣</b>
                        <template v-if="baseinfo && baseinfo.favor ">
                            <span v-for="(item, index) in baseinfo.favor" :key="index">{{ item }}</span>
                        </template>
                    </li> -->
                    <li>
                        <b>个人标签</b>
                        <template v-if="baseinfo && baseinfo.tag ">
                            <span v-for=" (item, index) in baseinfo.tag">{{ item}}</span>
                        </template>
                    </li>
                   <!--  <li>
                        <b>特长</b>
                        <template v-if="baseinfo && baseinfo.speciality ">
                            <span v-for=" (item, index) in baseinfo.speciality">{{ item }}</span>
                        </template>
                    </li> -->
                </ul>
                <b class="refer-yaoyue" > <span>参考邀约费</span><Tooltip placement="top" content="">
                         <i>?</i>
                         <div slot="content">
                            <p>该报价只是网红的参考价格，最终价<br/>格需要根据您的推广产品，推广时间<br/>来决定</p>
                        </div>
                    </Tooltip>
                </b>
                <p>
                    <template v-if="!isLogin">
                        <span class=" det-land">
                            <router-link :to="{ name: '/login/login', params:{nextPath: '/celebrity-library/detail?uid='+uid }}" >查看邀约费</router-link>
                            只有登录后，才能查看邀约费
                        </span>
                    </template>
                    <template v-if="isLogin && baseinfo && baseinfo.bustype">
                        <span v-for="(item, index) in baseinfo.bustype" v-if="baseinfo['cpt_price'+index] > 0">
                            <strong >{{baseinfo['cpt_price'+index]}}</strong>{{item}}
                        </span>
                        <span>
                            <strong >面议</strong>线下价格
                        </span>
                    </template>
                </p>
            </div>
            <div :class="[`${classPrefix}-content-echar`]">
                <div :class="[`${classPrefix}-content-echar-fn-chart`]">
                    <p :class="[`${classPrefix}-content-echar-fans`]">粉丝性别分布</p>
                    <div :class="[`${classPrefix}-content-echar-fn-demo`]" style="width: 560px;">
                        <div id="myChart-sex" :style="{width:'100%', height:'360px'}"></div>
                    </div>
                </div>
                <div :class="[`${classPrefix}-content-echar-fn-chart`]">
                    <p :class="[`${classPrefix}-content-echar-fans`]">粉丝地域分布</p>
                    <div :class="[`${classPrefix}-content-echar-fn-demo`]" style="width: 620px">
                        <div id="myChart-scxterrain" :style="{width:'100%', height:'360px'}"></div>
                    </div>
                </div>
            </div>
            <div :class="[`${classPrefix}-content-echar`, 'tab-detail']">
                <p :class="[`${classPrefix}-content-echar-fans`]">近30天粉丝、映票增长趋势图</p>
                <template>
        
                        <div class="zeLine">  <span  :class="zeLine == 'days_fans' ? 'action' : ''" @click="checkoutLine('days_fans')">粉丝数</span>  <span :class="zeLine == 'days_income' ? 'action' : ''" @click="checkoutLine('days_income')">映票数</span></div>
                        <div  id="myChart-cross-tow" ></div>
                </template>
            </div>
            <div :class="[`${classPrefix}-content-echar`,'c-detail-content-tow']">
                <div :class="[`${classPrefix}-content-echar-fn-chart`]">
                    <p :class="[`${classPrefix}-content-echar-fans`]">上周直播时长统计</p>
                    <div :class="[`${classPrefix}-content-echar-fn-demo`]" style="width:560px;">
                        <div id="myChart-garden" :style="{width:'560px', height:'360px'}" ></div>
                    </div>
                    <p :class="[`${classPrefix}-content-echar-tim`]">直播时长统计</p>
                </div>
                <div :class="[`${classPrefix}-content-echar-fn-chart`]" style="margin-left:40px;">
                    <p :class="[`${classPrefix}-content-echar-fans`]">上周活跃统计</p>
                    <div :class="[`${classPrefix}-content-echar-fn-demo`]" style="width:560px;">
                        <div id="myChart-gardentow" :style="{width:'100%', height:'360px'}"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BigImg from './BigImg.vue';
    import echarts from 'echarts/lib/echarts';
    import toolTip from 'echarts/lib/component/tooltip';
    import legend from 'echarts/lib/component/legend';
    import line from 'echarts/lib/chart/line';
    import radar from 'echarts/lib/chart/radar';
    import bar from 'echarts/lib/chart/bar';
    import pie from 'echarts/lib/chart/pie';
    import Tabs from 'iview-ui/tabs'
    import Tooltip from 'iview-ui/tooltip';
    import { userPromise } from 'user'
    import Config from 'src/config'
    import S from 'service'
    import * as apis from './apis'
    import CryptoJS from 'utils/aes.js';
    const HOST = Config.APIHOST;

    S.$extend(apis)

    Vue.prototype.$echarts = echarts
    export default {
        name: 'PCelebrityLibraryDetail',
        mixins: [],

        props: {
        },

        components: {
            [Tabs.name]: Tabs,
            [Tabs.Pane.name]: Tabs.Pane,
            [Tooltip.name]:Tooltip,

            'big-img':BigImg
        },

        data () {
            return {
                classPrefix: 'c-detail',
                msg: 'Welcome to Your Vue.js App',
                data: {baseinfo: null, counts: null},
                zeLine:'days_fans',
                HOST,
                uid:'',
                showImg:false,
                imgSrc: '',
                picIndex: 0
            }
        },
        watch: {

        },
        computed: {
            isLogin(){
                return this.$store.state.User.isLogin 
            },
            getCodeParams(){
               
                return this.$route.query
            },

            baseinfo(){
                var {baseinfo} = this.data;

                if( !baseinfo){
                    return null;
                }

                baseinfo.pic =  baseinfo.pic.split(',');

                return baseinfo;
            },
            counts(){
                var {counts} = this.data;

                return counts;
            }
        },
        methods: {
            clickImg(index) {
                this.showImg = true;
                this.picIndex = index;
                // 获取当前图片地址
                // this.imgSrc = e.currentTarget.src;
            },
            viewImg(){
                this.showImg = false;
            }

            ,
            _host(){
                let uid = this.$route.query.uid;
                console.log('uid:', uid, this.isLogin);
                if( this.isLogin ){
                     window.location.href =  `${HOST}cptuser/invite/choose?uid=${uid}`// 登录
                 } else{
                    this.$router.push({
                        name: '/login/login' , 
                        params:{ 
                            nextPath:  `${HOST}cptuser/invite/choose?uid=${uid}`
                        }
                    })
                 }
            },
            numberFans(num){
                return this.$common.numberFans(num);
            },
            tabTap(name){
      
            },

            arrMax(arr){
                var max = arr[0];
                for(var i =1; i < arr.length; i++){
                    max = max < arr[i] ? arr[i] : max;
                }
                return max;
            },
            arrMin(arr ){
                var min = arr[0];
                for(var i =1; i< arr.length; i++){
                    min = min > arr[i] ? arr[i] : min
                }
                return min;
            },
            checkoutLine(key){
                var data = JSON.parse( this.data.counts[key]);
                if( !data ){
                    return ;
                }
                var kyes = [], values=[];
                this.zeLine = key;

                for( let i = 0 ; i< data.length ; i++ ){
                    let item = data[i];
                    kyes.push(Object.keys(item)[0])
                    values.push(item[kyes[i]] );
                }

                var max = this.arrMax( values );
                var min = this.arrMin( values );
                var d = max -min;
                max = max + 0.5*d;
                min =  Math.max( min - d*2, 0)  ;
                values.reverse();
                kyes.reverse();



                if( key == 'days_fans'){
                    var option = {
                    title: {
                        text: '近30天粉丝、映票增长趋势图'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        top: 20,
                        containLabel: true
                    },
                    xAxis : {
                        type : 'category',
                        boundaryGap : true,
                        splitNumber: 30,
                        data : kyes,
                        axisLine : {
                            show: true,
                            lineStyle: {
                                color: '#ccc'
                            }
                        },
                        axisLabel: {
                            rotate: 25,
                            showMinLabel: true,
                            textStyle:{
                                color: '#495353'
                            }
                        }
                    },
                    yAxis : 
                        {
                            type : 'value',
                            min,
                            // max,
                            splitLine:{
                                show: true,
                                lineStyle: {
                                    color: '#efefef'
                                }
                            },
                            axisLabel:{
                                show: true,
                                inside: false,
                                formatter: function(value, index){
                                    if( value/10000 > 1){
                                        return  parseFloat( (value/10000).toFixed(2)) + '万';
                                    }else{
                                        return value;
                                    }
                                },
                                textStyle:{
                                    color: '#495353'
                                }
                            },
                            splitNumber: 5,
                            axisLine : {
                                show: true,
                                lineStyle: {
                                    color: '#efefef'
                                }
                            },
                            containLabel: false,
                            axisTick:{
                                show: false
                            }
                    },
                    series : [
                        {
                            name:'粉丝',
                            type:'line',
                            stack: '总量',
                            symbolSize:10,
                            itemStyle:{
                                normal:{
                                    color: '#51BF91',
                                    borderWidth:2,
                                    lineStyle:{
                                        color: '#51BF91',
                                        width:3
                                    },
                                },
                            },

                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#51BF91'
                                    }, {
                                        offset: 1,
                                        color: '#FFF'
                                    }])
                                }
                            },
                            data:values
                        }
                    ],
                    color: ['rgba(81, 191, 145, 0.5)','rgba(255, 176, 87, 0.5)']
                 }
                } else{
                    var option = {
                    title: {
                        text: '近30天粉丝、映票增长趋势图'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                     grid: {
                        top: 20,
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : kyes,
                        }
                    ],
                    yAxis : [
                        {

                            type : 'value',
                            min, 
                            // max, 
                            axisLabel:{
                                show: true,
                                inside: false,
                                formatter: function(value, index){
                                    if( value/10000 > 1){
                                        return parseFloat( (value/10000).toFixed(2)) + '万';
                                    }else{
                                        return value;
                                    }
                                }
                            }
                        }
                    ],
                    series : [
                        {
                            name:'映票',
                            type:'line',
                            stack: '总量',
                            symbolSize:10,
                            itemStyle:{
                                normal:{
                                    color: '#ffb057',
                                    borderWidth:2,
                                    width:10,
                                    lineStyle:{
                                        color: '#ffb057',
                                        width:3
                                    },
                                },
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#ffb057'
                                    }, {
                                        offset: 1,
                                        color: '#FFF'
                                    }])
                                }
                            },
                            data:values
                        },


                    ],
                    color: ['rgba(81, 191, 145, 0.5)','rgba(255, 176, 87, 0.5)']
                    }
                }

                this.drawWire( option);
            },
            formatecounts( data ){

            },
            drawLiveTime(data){
                let myChart = this.$echarts.init(document.getElementById('myChart-scxterrain'));
            },
            drawLine( data ){
                let myChart = this.$echarts.init(document.getElementById('myChart-scxterrain'));
                var citys = [], cityNum = [];
                for( var key in data.fans_range){
                    citys.push(key);
                    var value =( (data.fans_range[key] * 100).toFixed(2)  ) ;
                    cityNum.push( value )
                }
                myChart.setOption({
                    title: { text: '粉丝地域分布' },
                    tooltip: {},
                    xAxis: {
                        splitLine:{show: false},
                        type : 'category',
                        data: citys,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine : {
                            show: true,
                            lineStyle: {
                                color: '#efefef'
                            }
                        },
                        axisLabel: {
                            textStyle:{
                                color: '#495353'
                            }
                        },
                        axisTick:{
                            show: false
                        }
                    },
                    yAxis: {
                        type : 'value',
                        splitNumber: 4,
                        splitLine:{
                            lineStyle: {
                                color: '#efefef'
                            }
                        },
                        axisLine : {
                            lineStyle: {
                                color: '#efefef',
                                shadowOffsetY: -20,
                                shadowColor : '#efefef'
                            },
                            shadowOffsetY : 100
                        },
                        axisLabel: {
                            textStyle:{
                                color: '#495353'
                            }
                        },
                        axisTick:{
                            show: false
                        }
                    },
                    series: [{
                        itemStyle : {
                            normal: {
                                label : {
                                    show: true,
                                    position:'top',
                                    formatter:'{c}%',
                                    textStyle: {
                                        color: '#495353'
                                    }
                                },
                                // barBorderRadius:[4, 4, 4, 4]
                            }
                        },
                        name: '地区',
                        type: 'bar',
                        data: cityNum,
                        barWidth : 30,
                    }],
                    color: ['#51BF91']
                });
            },
            drawPey(data){
                let myChart = this.$echarts.init(document.getElementById('myChart-sex'))
                myChart.setOption(  {
                    title: { text: '粉丝性别分布' },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}"
                    },
                    legend: {
                        orient: 'vertical',
                        x: '362',
                        bottom: '60',
                        data:[{ 
                            name:'  女性粉丝    '+data.girl_fans + '%',
                            icon: 'rect',
                            textStyle:{

                                color: '#495353',
                                fontSize: '14'
                            }
                        },
                        {
                            name:  '  男性粉丝    '+data.boy_fans+'%',
                            icon: 'rect',
                            textStyle:{
                                color: '#495353',
                                fontSize: '14'
                            }
                        }],
                        itemGap: 30,
                        itemWidth : 24,
                        itemHeight: 24,
                        selectedMode: false
                    },
                    series: [{
                        name:'粉丝性别分布',
                        type:'pie',
                        radius: ['60%', '75%'],
                        center : ['183', '183'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:data.girl_fans, name:'  女性粉丝    '+ data.girl_fans+'%'},
                            {value:data.boy_fans, name:'  男性粉丝    '+ data.boy_fans+'%'},
                        ],

                    }],
                    color: ['#51BF91','#89D5B5']
                });
            },
            // 折线图
            drawWire(option){
                let myChartTow = this.$echarts.init(document.getElementById('myChart-cross-tow'))
                myChartTow.setOption( option  );
            },
            drawgarden(data){

                var live_duration =  JSON.parse(this.data.counts.live_duration);
                var keys =  Object.keys(live_duration), values = [], selected={}, nodata = true;
                for( var i =0; i<keys.length ; i++){
                    var val = live_duration[keys[i]];
                    values.push({
                        value: val,//live_duration[keys[i]],
                        name: keys[i]
                    });
                    selected[keys[i]] = val;//!!live_duration[keys[i]];
                    keys[i] = { 
                        name: keys[i],
                        icon: 'rect',
                        textStyle:{
                            color: '#495353',
                            fontSize: '14'
                        }
                    };
                    if( val > 0 ){
                        nodata = false
                    }
                }


                let myChart = this.$echarts.init(document.getElementById('myChart-garden'))
                myChart.setOption(  {
                    title : {},
                    tooltip : {
                        trigger: 'item',
                        backgroundColor: '#fff',
                        borderColor:'efefef',
                        padding: 10,
                        textStyle:{
                            color: '#495353'
                        },
                        formatter:  nodata ? '{b}' : "直播时长统计<br/>{b}小时：{c}场"
                    },
                    legend: {
                        orient: 'vertical',
                        data: keys,
                        formatter: function(name){
                            return '  '+name + '小时  ' + live_duration[name]+'场';
                        },
                        x: '372',
                        bottom: '57',
                        itemGap: 20,
                        itemWidth : 24,
                        itemHeight: 24,
                        selectedMode: false,
                        selected:selected
                    },
                    series : [
                        {
                            type: 'pie',
                            radius : '121',
                            center: ['168', '185'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            data:values.concat({value:0, name:'上周未直播'}),
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ],
                    color: ['#51BF91','#7ED9E8','#FFB057','#8AB9FF']

                });
            },
            drawgar(data){

                let week_livedays = this.data.counts.week_livedays;
                let no_livedatys = 7 -week_livedays



                let myChart = this.$echarts.init(document.getElementById('myChart-gardentow'));
                myChart.setOption(  {
                     title: {
                        show: true,
                        text: '总资产',
                        // subtext: '2000000.00',
                        bottom: '0',
                        left: '0'
                    },
                    tooltip: {
                        trigger: 'item',
                        // alwaysShowContent : true,
                        formatter: "{b}: {c}天({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        formatter: function(name){
                            switch (name) {
                                case '直播天数':
                                    // statements_1
                                    return '  '+name +'     '+ week_livedays + '天';
                                    break;
                                case '未直播天数':
                                    return '  '+name +'  '+ no_livedatys + '天';
                                    break;
                            }
                        },
                        x: '372',
                        bottom: '57',
                        itemGap: 30,
                        itemWidth : 24,
                        itemHeight: 24,
                        data:[{ name: `直播天数`, icon:'rect', textStyle:{color:'#495353'}}, { name: `未直播天数`, icon:'rect', textStyle:{color:'#495353'}}],
                        selectedMode: false,
                        selected:{
                            '直播天数': true
                        }
                    },
                    series: [
                        {
                            name:'直播天数统计',
                            type:'pie',
                            radius: ['90', '121'],
                            center : ['168', '185'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position:'center',
                                    // formatter: '{b} {c} 天' ,
                                    // textStyle: {
                                    //     fontSize: '20',
                                    //     fontWeight: 'bold'
                                    // }
                                },
                                emphasis: {
                                    show: true,
                                    formatter: '{b} {c} ' ,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value: week_livedays, name:`直播天数`},
                                {value: no_livedatys, name: `未直播天数`},
                            ]
                        }
                    ],
                    color: ['#FFB057','#FFD5A7']
                });
            },
            details(){
                const {ZeroPadding} = this.$common;
                ZeroPadding(CryptoJS);
                var key = CryptoJS.enc.Utf8.parse("ae38764590123456");
                var iv  = CryptoJS.enc.Utf8.parse('1234567812345678');
                function strdecode(data){
                    var decrypted = CryptoJS.AES.decrypt(data,key,{iv:iv,padding:CryptoJS.pad.ZeroPadding});
                    decrypted=decrypted.toString(CryptoJS.enc.Utf8);
                    return decrypted;
                }

                this.$S.WH_DETAIL( this.getCodeParams ).then((data)=>{
                    if(  data.code != 100){ return;}
                    this.data = JSON.parse(strdecode(data.data));
                    this.drawPey( this.data.counts );
                    this.drawLine( this.data.counts );
                    this.checkoutLine('days_fans');
                    this.drawgarden();
                    this.drawgar();
                })
            }
        },

        filters: {

        },

        created () {

        },

        mounted () {
            this.details();
            this.uid = this.$route.query.uid;
            console.log('--------------->',this.uid, this.isLogin)
        },

        render (h) {

        }
    }

</script>


<style lang="less" scoped>
    .white_bj {
        background-color: #fff;
    }
    @component-prefix: ~'c-detail';
    .@{component-prefix} {
        &-content {
            div {
                overflow: hidden;
                position: relative;
            }
            &-introduction {
                /*margin-top: 60px;*/
                padding-top: 60px;
                img {
                    width: 160px;
                    height: 160px;
                    float: left;
                }
                p {
                    width: 1010px;
                    display: block;
                    font-size: 13px;
                    color: #999999;
                    margin-left: 23px;
                    float: left;
                }
                p:nth-of-type(1) span {
                    display: block;
                    font-size: 20px;
                    color: #282828;
                    line-height: 20px;
                    font-weight: bold; padding-bottom: 8px;

                    a {
                        width: 70px;
                        height: 24px;
                        display: inline-block;
                        background: #51BF91;
                        border-radius: 4px;
                        font-size: 13px;
                        color: #FFFFFF;
                        letter-spacing: 0;
                        line-height: 24px;
                        text-align: center;
                        margin-left: 48px;
                    }
                }
                p:nth-of-type(2) {
                    display: block;
                    float: left;
                    border-top:1px #EAEAEA solid;
                    margin-top: 24px;

                    span {
                        width: 248px;
                        display: inline-block;
                        float: left;
                        padding-top: 16px;

                        b {
                            color: #151515;
                        }

                    }
                }
            }
            &-photo {
                display: block;
                margin-top: 60px;

                img {
                    display: block;
                    width: 192px;
                    height: 234px;
                    float: left;
                    margin-right: 8px;
                }
                img:last-child {
                    margin-right:0;
                }
            }
            &-experience {
                display: block;

                .refer-yaoyue{
                    display: block;
                    font-size: 20px;
                    color: #282828;
                    padding-top: 50px;
                    height: 70px;
                    font-weight: bold;

                    
                    span{
                        line-height: 20px;
                        font-weight: bold;
                        float: left;
                        line-height: 24px;
                    }
                    i {
                        width: 24px;
                        height: 24px;
                        background: #CCCCCC;
                        display: inline-block;
                        vertical-align: middle;
                        border-radius: 100px 100px;
                        font-size: 20px;
                        color: #FFFFFF;
                        line-height: 24px;
                        text-align: center;
                    }
                    p{
                        width: 300px;
                        padding: 0;
                        font-weight: 100;
                    }
                }
                p {
                    font-size: 14px;
                    color: #999999;
                    line-height: 18px;
                    padding-top: 17px;
                }
                p:nth-of-type(2) {
                    width:1200px;
                    height: 120px;
                    background: #FFFFFF;
                    border: 1px solid #F0F0F0;
                    font-size: 14px;
                    color: #495353;
                    line-height: 14px;
                    margin-top: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    span {
                        width: 239px;
                        text-align: center;
                        // display: inline-block;
                        strong {
                            display: block;
                            font-size: 28px;
                            color: #51BF91;
                            line-height: 28px;
                            font-weight: bold;
                            padding-bottom: 10px;
                            &:after {
                                content: "";
                                display: inline-block;
                                width: 2px;
                                height: 32px;
                                background: #EFEFEF;
                                float: right;
                                margin-top: 10px;

                            }
                        }
                    }
                    span:last-child {
                        strong {
                            &:after {
                                width: 0;
                            }
                        }
                    }
                    span.det-land{
                        width: 100%;
                        display: block;
                        text-align: center;
                        padding-bottom: 17px;
                        a {
                            width: 500px;
                            height: 44px;
                            background: #51BF91;
                            border-radius: 4px;
                            display: block;
                            margin: 0 auto;
                            font-size: 18px;
                            color: #FFFFFF;
                            letter-spacing: 0;
                            line-height: 44px;
                            margin-bottom: 12px;
                        }
                    }

                }
                ul {
                    display: block;
                    font-size: 16px;
                    color: #495353;
                    letter-spacing: 0;
                    line-height: 24px;
                    li {
                        display: block;
                        margin-top: 20px;

                        span {
                            display: inline-block;
                            background: #FFFFFF;
                            border: 1px solid #EFEFEF;
                            border-radius: 100px;
                            font-size: 14px;
                            color: #495353;
                            padding: 10px 20px;
                            margin-right: 16px;
                        }
                        b {
                            display: inline-block;
                            width: 92px;
                            font-size: 16px;
                            padding-top: 0;
                        }
                    }
                    li:before {
                        content: "";
                        display: inline-block;
                        width: 6px;
                        height: 6px;
                        background: #51BF91;
                        border-radius: 100px 100px;
                        vertical-align: middle;
                        margin-right: 8px;
                    }
                }
            }
            &-echar{
                // padding-bottom: 50px;
                &-fn-chart{
                    // width: 591px;
                    height: 460px;
                    float: left;
                }
                &-fn-chart:nth-child(2) {
                    // width: 589px;
                    margin-left: 20px;
                }
                &-fans{
                    display: block;
                    padding:60px 0 16px 0;
                    font-size: 20px;
                    color: #282828;
                    font-weight: bold;
                }
                &-fn-demo {
                    display: block;
                    height: 360px;
                    border-radius: 3px;
                    border:1px #F0F0F0 solid;
                }
                &-cross {
                    display: block;
                    padding:0 0 16px 0;
                    font-size: 20px;
                    color: #282828;
                    font-weight: bold;
                }
                &-tim {
                    position: relative;
                    left: 377px;
                    bottom: 250px;
                    font-size: 14px;
                    color: #505050;
                    line-height: 12px;
                }
            }
        }
        #myChart-garden {
            position: relative;
            z-index: 6666;
        }

    }
 #myChart-cross-tow{
    height: 360px;
    overflow: hidden;
}

pre{
    white-space: pre-wrap; 
}
    .img-tow{ display: block; width: 200px; height: 200px;}
    .c-detail-content-tow{ padding-bottom: 30px;}
</style>
<style lang="less">

    .tab-detail .ivu-tabs .ivu-tabs-bar {
        border-bottom: 0;
        text-align: center;
    }
    .tab-detail .ivu-tabs .ivu-tabs-bar .ivu-tabs-nav {
        display: inline-block;
        margin: 0 auto;
        float: none;
    }
    .tab-detail .ivu-tabs .ivu-tabs-bar .ivu-tabs-nav .ivu-tabs-ink-bar {
        height: 0;
    }

    .tabs-pane{
        /*height: */
        width: 1200px;
    }

    .zeLine{
        display: flex;
        justify-content:center;
        align-items:center;
        height: 50px;   

        span{
             padding: 10px 0px;
             margin: 0 10px;

             &:before{
                content: "  ";
                display: inline-block;
                height: 12px;
                width: 12px;
                margin-right: 5px;
                border-radius: 100%;
                border: 2px solid #51BF91; 
             }

             &.action:before{
                background: #51BF91;
            }
        }

        span:nth-child(2){
            &:before{
                border: 2px solid #ffb057; 
            }
            &.action:before{
                background: #ffb057;
            }
        }
    }


.ivu-tooltip{
    padding: 0 20px;
    .ivu-tooltip-inner{
        background:rgba(255,255,255,1);
        box-shadow: 0 1px 6px rgba(0,0,0,0.5);
    }
    .ivu-tooltip-arrow{
        border-top-color: #ffffff !important;
    }
}


</style>



