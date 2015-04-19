# liteAjax
Lite Ajax

2k minified Ajax Javascript Library and Bonus Class for Modern Browsers to load JSON and/or any other file with AJAX no other library needed.

LIBRARY SYNTAX

This command loads 'test.json' into an html element with the id of 'test' and does so after the document has loaded and is ready...

$ajax('test.json', 'test').load();

You can also load text just as easy...

$ajax('test.txt', 'test').load();

You can specify the properties... (but you don't have to)

$ajax( { url: 'test.json',
		method: 'GET',
		type: 'application/json' }).load();

You can specify a callback function if you want...

function mycallback(data){
	console.log('data: ', data);
	document.writeln('data: ' + data);
}

$ajax( { url: 'test.json',
		method: 'GET',
		type: 'application/json' }, mycallback).load();


Or you can use an anonymous function...

$ajax( { url: 'test.txt',
		type: 'text/plain' }, function(data){

			console.log('data: ', data);
			$ajax().updateElement('test', data);

}).load();

And of course you can send POST data and it will set the type for you...

$ajax( { url: 'test.json',
		method: 'POST',
		data: '{ "test": { "testing": "1 2 3" } }' }, function(data){

			console.log('data: ', data);
			$ajax().updateElement('test', data);

}).load();

CLASS SYNTAX

load 'test.json' into 'test' id

var test = new liteAjax('test.json', 'test');
test.load();

load 'test.json' and run mycallback

function mycallback(){
	console.log('data: ', data);
	test.updateElement('test', data);
}

var test = new liteAjax( {
	url: 'test.json',
	method: 'GET',
	type: 'application/json' }, mycallback);

