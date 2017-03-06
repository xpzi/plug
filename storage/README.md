##  y_storage

storagejs :  storage操作的小插件

### 有哪些功能

    1. 可以往  onstorage 这个方法 添加删除方法
    2. 在storage改变时（有多个回调方法的时候），指定回调的某个方法，或某几个方法， 或者不执行 onstorage的回调方法
    3. 在存储时，可以以任何数据类型存储，读取时，返回存储时的数据类型
    4. 保留原始的访问方式


### 使用方法 ：

setOnStorageListener( key,  _key, func )
```
		key: storage的key
		_key: stor响应的标识
		func: 响应函数
			func( event, data );  
			// event,  storage原生事件对象
			// data, 包含旧的数据和新的数据
    	
```


set( key, value, _key );
```
		key: storage的key
		value: 要设置的值
		_key: 要触发的回调标识
			_key,可以是字符串触发单个  可以是字符串数组，触发多个
```

get( key )
```
		// 获取 storage
    	get( key );
```