/*!
  * liteAjax - v1.0.2
  * https://github.com/peterprins/liteajax
  *
  * Copyright 2015 Peter Prins
  * Released under the MIT license
  * http://mit-license.org/
  *
  * Date: 2015-04-20
  */

// this is the library
var $ajax = function(request_obj,callback_fn){

	// put response in arr
	var response = [];

	// ajax object
	var ajax_obj = {

		url : null,
		method : null,
		type : null,
		data : null,
		callback : null,
		response: function(){
				return response[0];
		},
		element_id : null,

		// init
		init: function(){

			//console.log('init');

			// get url
			if(typeof request_obj !== 'object' && typeof request_obj !== 'string'){

				// init props
				this.method = 'GET';
				this.type = 'application/json';

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

		// update element
		updateID: function(id,data){

			//console.log('updateID');

			// check typeof
			if((typeof data == 'string' || typeof data == 'object')
				&& typeof id == 'string'){

				// get element
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

					// update response
					response[0] = this.response;
					//console.log('response: ', response[0]);

					// update html element
					element.innerHTML = this.response;
				}

			}
			
		},

		// get json obj
		getJSONObj: function(){

			//console.log('getJSONObj');

			// check status
			if(this.status == 200){

				// update response
				response[0] = this.response;

				try{
					var json_obj = JSON.parse(this.response);
				}catch(e){
					var json_obj = this.response;
				}
			}

			// do callback fn
			callback_fn(json_obj);

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

				this.callback = this.updateID;

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

	// check typeof
	if(typeof request_obj == 'object' || typeof request_obj == 'string'){
		// load
		ajax_obj.load();
	}

	// return
	return ajax_obj;

}