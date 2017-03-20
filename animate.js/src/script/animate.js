function OrderAnimta( option ){
	this.option = option;
	this.els = option.el;
	this.anis = option.ani;
	this.len = this.els.length || 0;
	this.index = 0;
}
OrderAnimta.prototype = {
	runlist: [],
	// 分配
	fenpei: function( start){
		if( start ){
			this.runlist.push(this);
			this.index = 0;
			this.ispush = true;
		}
		switch( this.option.type ){
			case 'chuanxing':
				this.chuanxing();
				break;
			case 'bingxing':
				this.bingxing();
				break;
			case 'delay':
				this.delayfunc();
				break;
		}
	},
	
	// 串行
	chuanxing: function(){
		index = this.index;
		var select = this.els[index];
		var animateName = this.anis[index];
		this.index;
		if( typeof select == 'string' ){
			this.animate(select, animateName);
		} else{
			select && (new OrderAnimta( select )).fenpei(true);   // 这里的问题  解决不了我要放弃了  这个延时问题解决不了我要放弃了	
		}
		this.index++;
	},
	
	// 并行
	bingxing: function(){
		for(var i =0; i< this.len ; i++){
			if(  typeof this.els[i] == 'string' ){
				this.animate(this.els[i], this.anis[i]);	
			}else{
				
				this.els[i] && (new OrderAnimta( this.els[i] )).fenpei(true);
			}
		}
	},
	
	// 并行延时
	delayfunc: function(){
		var that =this;
		for(var i =0; i< this.len ; i++){
			
			if( typeof this.option.delay != 'object'){
				var delay = Number(this.option.delay);
			} else{
				var delay = Number(this.option.delay[i]);
			}

			if( typeof this.els[i] == 'string' ){
				(function(i){
					setTimeout( function(){
						that.animate(that.els[i], that.anis[i]);	
					}, delay);
				})(i)
			}else{
				this.els[i] && (new OrderAnimta( this.els[i] )).fenpei(true);	
			}
		}
	},
	
	// 执行动画
	animate: function(select, x){
		var that = this;
		$(select).show();
		var oldclass = $(select).attr('class');
		$(select).removeClass( oldclass ).addClass(oldclass+' '+ x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	    	$(this).removeClass().addClass(oldclass);
	    	if( that.index < that.len  && that.option.type == 'chuanxing'){
	    		
	    		that.fenpei();
	    	}else{
	    		var length = that.runlist.length;
	    		
	    		if( that.ispush ){
	    			that.runlist.pop();
	    			that.ispush = false;
	    			if( length > 1 ){
						that.runlist[length -2 ].fenpei();
					}
	    		}	
	    	}
	  	});
	}
}