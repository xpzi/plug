
const SEARCH = {
	url: /\/cptuser\/invite\/search/,
	type: 'post',
	template: function( options ){
		var params = {
			fn   : "0",//粉丝
		    fn_m : "",//粉丝最小|number
		    fn_x : "",//粉丝最大 |number
		    g    : "0",//等级
		    g_m  : "",//等级最小 |number
		    g_x  : "",//等级最大 |number
		    t    : "3",//推广类型  3 
		    pr   : "0",//价格类型 
		    p_m  : "",//价格最小 |number
		    p_x  : "",//价格最大 |number
		    ps   : "0",//地区类型
		    sp   : "",//省份  |固定
		    sc   : "",//城市	|固定
		    sex  : "",//性别类型 |man female
		    f    : "",//粉丝性别  |man female
		    p    : 1,//分页 |number
            tag	 : '',	// 标签 |number
		    name : ""//搜索，|string
		};
		var data =  {
			uid: '3692332', 	// uid
			sex: 0, 			// 性别  0 女  1 男
			nick: 'Semon大圣', 	// 昵称
			location: '北京', 	// 城市
			level: '94', 		// 等级
			id: '1',			//
			head_pic: '',		// 图片
			fans_num: 335300,		// 图片
			cpt_price5: 2000,		// 图片
			cpt_price4: 2000,		// 图片
			cpt_price3: 2000,		// 图片
			cpt_price2: 2000,		// 图片
			cpt_price1: 2000,		// 图片
			active_count: 56872,
			check: 0
		}

		var newData = {"parms":{"fn":"0","fn_m":"0","fn_x":"2225","g":"0","g_m":"","g_x":"","t":"3","pr":"0","p_m":"4","p_x":"2425","ps":"0","sp":"","sc":"","sex":"","f":"","tag":"","p":1,"name":""},"size":10,"count":344,"data":[{"id":58,"uid":"3692332","nick":"Semon大圣","head_pic":"https:\/\/imagescale.inke.cn:443\/imageproxy2\/dimgm\/scaleImage?url=http%3A%2F%2Fimg2.inke.cn%2FMTQ5Mzg4NDc2MTMzNyM0NjEjanBn.jpg&w=750&h=750&s=80&c=0&o=0","sex":0,"location":"北京","fans_num":335360,"active_count":56872,"level":94,"cpt_price1":"0","cpt_price2":"0","cpt_price3":"1.10","cpt_price4":"0","cpt_price5":20000,"check":0},{"id":307,"uid":"671116","nick":"大大大黑牛","head_pic":"https:\/\/imagescale.inke.cn:443\/imageproxy2\/dimgm\/scaleImage?url=http%3A%2F%2Fimg2.inke.cn%2FMTUwMDI5ODA3NTg1NiM1OSNqcGc%3D.jpg&w=750&h=750&s=80&c=0&o=0","sex":1,"location":"济南","fans_num":989282,"active_count":42687,"level":186,"cpt_price1":"0","cpt_price2":"0","cpt_price3":"1.10","cpt_price4":"0","cpt_price5":"0","check":0},{"id":118,"uid":"3717769","nick":"🉐️赤弘^^大久戈^^🉐","head_pic":"https:\/\/imagescale.inke.cn:443\/imageproxy2\/dimgm\/scaleImage?url=http%3A%2F%2Fimg2.inke.cn%2FMTQ5ODQ4NzY2MDEzOCM0ODMjanBn.jpg&w=750&h=750&s=80&c=0&o=0","sex":1,"location":"北京","fans_num":127059,"active_count":39179,"level":171,"cpt_price1":"0","cpt_price2":"0","cpt_price3":"1.10","cpt_price4":"0","cpt_price5":"0","check":0},{"id":309,"uid":"58459027","nick":"丫丫丫宝贝","head_pic":"https:\/\/imagescale.inke.cn:443\/imageproxy2\/dimgm\/scaleImage?url=http%3A%2F%2Fimg2.inke.cn%2FMTQ5ODcwNDk0ODg0NCMyMzAjanBn.jpg&w=750&h=750&s=80&c=0&o=0","sex":0,"location":"渭南","fans_num":102742,"active_count":37288,"level":93,"cpt_price1":"0","cpt_price2":"0","cpt_price3":"1.10","cpt_price4":"0","cpt_price5":"0","check":0},{"id":217,"uid":"295772","nick":"我是幽默的小阿一！","head_pic":"https:\/\/imagescale.inke.cn:443\/imageproxy2\/dimgm\/scaleImage?url=http%3A%2F%2Fimg2.inke.cn%2FMTQ5Mzk4NDc0NjMzOCMxNzEjanBn.jpg&w=750&h=750&s=80&c=0&o=0","sex":1,"location":"北京","fans_num":340372,"active_count":29428,"level":112,"cpt_price1":"0","cpt_price2":"0","cpt_price3":"1.10","cpt_price4":"0","cpt_price5":"0","check":0},{"id":120,"uid":"3770813","nick":"Five","head_pic":"https:\/\/imagescale.inke.cn:443\/imageproxy2\/dimgm\/scaleImage?url=http%3A%2F%2Fimg2.inke.cn%2FMTQ5NTI3NDUyMzU3MiM5OTIjanBn.jpg&w=750&h=750&s=80&c=0&o=0","sex":1,"location":"上海","fans_num":311721,"active_count":34658,"level":118,"cpt_price1":"0","cpt_price2":"0","cpt_price3":"1.10","cpt_price4":"0","cpt_price5":"0","check":0},{"id":168,"uid":"2628736","nick":"\"左小神经🍒","head_pic":"https:\/\/imagescale.inke.cn:443\/imageproxy2\/dimgm\/scaleImage?url=http%3A%2F%2Fimg2.inke.cn%2FMTUwMDAwNzAzMDg3OSMyMzgjanBn.jpg&w=750&h=750&s=80&c=0&o=0","sex":0,"location":"北京","fans_num":543087,"active_count":41016,"level":116,"cpt_price1":"0","cpt_price2":"0","cpt_price3":"1.10","cpt_price4":"0","cpt_price5":"0","check":0},{"id":27,"uid":"3802234","nick":"沙小V","head_pic":"https:\/\/imagescale.inke.cn:443\/imageproxy2\/dimgm\/scaleImage?url=http%3A%2F%2Fimg2.inke.cn%2FMTUwMDMwMDkyMDQ2OSM0NzEjanBn.jpg&w=750&h=750&s=80&c=0&o=0","sex":0,"location":"上海","fans_num":555297,"active_count":47929,"level":99,"cpt_price1":"0","cpt_price2":"0","cpt_price3":"1.10","cpt_price4":"0","cpt_price5":"0","check":0},{"id":9,"uid":"2744234","nick":"🦄杰恩卑鄙","head_pic":"https:\/\/imagescale.inke.cn:443\/imageproxy2\/dimgm\/scaleImage?url=http%3A%2F%2Fimg2.inke.cn%2FMTUwMDIzOTU2MzM0OCM4NCNqcGc%3D.jpg&w=750&h=750&s=80&c=0&o=0","sex":1,"location":"沈阳","fans_num":517842,"active_count":44071,"level":70,"cpt_price1":"0","cpt_price2":"0","cpt_price3":"1.10","cpt_price4":"0","cpt_price5":"0","check":0},{"id":159,"uid":"10618503","nick":"🐷二豆二豆二豆","head_pic":"https:\/\/imagescale.inke.cn:443\/imageproxy2\/dimgm\/scaleImage?url=http%3A%2F%2Fimg2.inke.cn%2FMTQ5OTk0MjUzMTQxNiMzODkjanBn.jpg&w=750&h=750&s=80&c=0&o=0","sex":0,"location":"青岛","fans_num":238089,"active_count":52287,"level":128,"cpt_price1":"0","cpt_price2":"0","cpt_price3":"1.10","cpt_price4":"0","cpt_price5":"0","check":0}]};
		newData.parms = options.options.body || newData.parms;
		return newData;
	}
}


export default {
	SEARCH
	// USER_INFO
}