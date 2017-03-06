/*
    storagejs :  storage操作的小插件

.md
    有哪些功能

    1. 可以往  onstorage 这个方法 添加删除方法
    2. 在storage改变时（有多个回调方法的时候），指定回调的某个方法，或某几个方法， 或者不执行 onstorage的回调方法
    3. 在存储时，可以以任何数据类型存储，读取时，返回存储时的数据类型
    4. 保留原始的访问方式


    使用方法 ：

		storName: storage的key
		_key: stor响应的标识
		function： 响应函数的名字
    	setOnStorageListener( storName,  _key, function );


		key: storage的key
		value: 要设置的值
		_key: 要触发的回调标识
    	set( key, value, _key );

		
		// 获取 storage
    	get( key );
    
*/



(function (){


	// 这是什么情况
    var _Stor = function(){

    	// 检测在这之前是否添加过onstorage事件，不要影响
        if( typeof window.onstorage  === 'function' ){
            this.setOnStorageListener('onstorage','onstorage', window.onstorage );
        }
        window.onstorage = this.onstorage.bind(this);
    }



 	_Stor.prototype = {

        //  注册后的 onstorage的所有监听事件
        onstorages :{},

         // 添加监听事件
        // key: 该监听事件的标识,事件标识为不为空的字符串
        // func: 方法
        setOnStorageListener: function( storName, key , func  ){
            if( typeof func != 'function' ){
                console.error( '请传入一个function' );
                return ;
            }
            if( typeof this.onstorages[storName] == 'undefined' ){
				this.onstorages[storName] = {};
            }

            this.onstorages[storName][key] =  func ;
        },

        // 事件执行的方法体
        onstorage: function( ev ){

            // 特使的 回调，在这之前通过其他方式添加的事件  
            this.onstorages.onstorage  && this.onstorages.onstorage.onstorage(ev);

            // 该storagename不需要执行事件响应
            if( typeof this.onstorages[ev.key] == 'undefined' ){
            	return ;
            }


            // 将json转换为对象
            var newValue = ev.newValue ? JSON.parse( ev.newValue )  :  null ;
            var oldValue = ev.oldValue ? JSON.parse( ev.oldValue )  :  null ;

            // 提取storage中保存的数据
            var _key;
            if( newValue ){
                _key = newValue._key || null;
                newValue = newValue.data;
            }
            if( oldValue ){
                oldValue = oldValue.data;
            }
            var data = {
                newValue: newValue,
                oldValue: oldValue
            }

            // 如果为null 说明不需要执行 监听函数
            if( !_key  ){  return; };


            // '__all' 执行所有的回调
            if( _key == '__all' ){
                for( var key in this.onstorages[ev.key] ){
                    this.onstorages[ev.key][key] && this.onstorages[ev.key][key](ev, data);
                }
            } else{
                switch( typeof _key ){
                    case 'object': 
                        for( var key in _key ){
                            this.onstorages[ev.key][key] && this.onstorages[ev.key][key](ev, data);
                        };
                        break;
                    case 'string': 
                        this.onstorages[ev.key][_key] && this.onstorages[ev.key][_key](ev,data);
                }
            }
        },


        /* 以任意数据类型存储和读取 */
        // 保存数据
        set: function( key, value , _key){
            if(  typeof value == 'undefined'  || value == null  ) value = ''; 
            var type = typeof value;
            _key = _key || null;
            var data =  {
                type: type,
                data: value,
                _key: _key
            }
            // 将数据进行一次包装
            this._setItem( key, JSON.stringify(data) );
        },
        // 读取数据
        get: function( key){
            var data = this._getItem(key);
            if( data ){
                data = JSON.parse( data );
                var type = data.type;
                var data = data.data;
                switch( type ){
                    case 'number': data = Number(data);break;
                    case 'boolean': data = Boolean(data); break;
                }
            }
            return data;
        },



        /* 保留原始的使用方式*/
        // 设置
        _setItem: function(key, value){
            // this.setRunKeyOnstorage(_key);
            localStorage.setItem( key, value );
        },
        // 读取
        _getItem: function(key){
            // _key = _key || 'add';
            // this.setRunKeyOnstorage(_key);
            return localStorage.getItem( key );
        }

    }

	// 闭包中的storage单例，一个页面只有一份
	var stor = null;

	module.exports = (function(){
		if(  localStorage  &&  !stor ){
            stor = new _Stor();
        }
        return stor;
	})();

})();




