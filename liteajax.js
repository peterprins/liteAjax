/*!
  * liteAjax - v1.0 
  * https://github.com/peterprins/liteajax
  *
  * Copyright 2015 Peter Prins
  * Released under the MIT license
  * http://mit-license.org/
  *
  * Date: 2015-04-19
  */

// this is the library
var $ajax = function(request_obj,callback_fn){

	// return
	return {

		url : '',
		method :'',
		type : '',
		data : '',
		callback : '',
		response : '',
		element_id : '',
		json : '',

		// update element
		updateElement: function(id,data){

			//console.log('updateElement');

			// check typeof
			if((typeof data == 'string' || typeof data == 'object')
				&& typeof id == 'string'){
				var element = document.getElementById(id);

				try{
					element.innerHTML = JSON.stringify(data);
				}catch(e){
					element.innerHTML = data;
				}

			}else{

				// check status
				if(this.status == 200){
					var element = document.getElementById(element_id);
					element.innerHTML = this.response;
				}

			}
			
		},

		// get json obj
		getJSONObj: function(){

			//console.log('getJSONObj');

			// check status
			if(this.status == 200){
				try{
					var json_obj = JSON.parse(this.response);
				}catch(e){
					var json_obj = this.response;
				}
			}

			// do callback fn
			callback_fn(json_obj);

		},

		// init
		init: function(){

			//console.log('init');

			// get url
			if(typeof request_obj !== 'object' && typeof request_obj !== 'string'){

				// init props
				this.method = 'GET';
				this.type = 'application/json';
				this.callback = null;

			}else{

				// get url
				if(typeof request_obj == 'object'){
					this.url = request_obj['url'];
				}else if(typeof request_obj == 'string'){
					this.url = request_obj;
				}
		  
				// get method
				this.method = request_obj['method'] ? request_obj['method'] : 'GET';
		  
		  		// get type
				if( this.method == 'POST' ){
					this.type = request_obj['type'] ? request_obj['type'] : 'application/x-www-form-urlencoded;charset=UTF-8';
					
				}else{
					this.type = request_obj['type'] ? request_obj['type'] : 'application/json';
				}

				// get data
				this.data = request_obj['data'] ? JSON.stringify(request_obj['data']) : null;
		 
			}

		},

		// load ajax
		load: function(){

			//console.log('load');

			// init
			this.init();

			// create object
			json = new XMLHttpRequest();

			// set content type 
			json.type = this.type;

			// is doc loaded ?
			document.addEventListener( 'DOMContentLoaded', this.send(json), false);

		},

		// send ajax
		send: function(json){

			//console.log('send');

			// get callback
			if(typeof callback_fn == 'function'){

				this.callback = this.getJSONObj;

			}else if(typeof callback_fn == 'string'){

				this.element_id = callback_fn;
				element_id = callback_fn;

				this.callback = this.updateElement;

			}else{

				this.callback = null;
			}

			// do we have a callback ?
			if(this.callback !== null){

				// modern browsers
				if( json.addEventListener ) {

					// when file is loaded do callback
					json.addEventListener( 'load', this.callback, false);

				}else if( json.readyState ){

					// microsoft IE9 compatability
					// if(json.readyState == 4) success
					json.onreadystatechange = this.callback;
				}

			}

			// open file
			json.open( this.method , this.url );

			// if POST
			if( this.method == 'POST'){
				json.setRequestHeader( 'Content-type', this.type );
			}

			// send request
			json.send( this.data );

		}

	}

}