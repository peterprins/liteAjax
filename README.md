# liteAjax Javascript Library

* [Library Syntax](#library-syntax)
* [Library Usage](#library-usage)
* [Class Syntax](#class-syntax)
* [Class Usage](#class-usage)

### Description

liteAjax is a fast lightweight cross-platform JavaScript library to simplify the loading of JSON with Ajax. You could also use it to dynamically load a CSS file to parse into a JavaScript Object with the [CSStoJSObjectParser Javascript Class](https://github.com/peterprins/CSStoJSObjectParser).

The minified library is only 2k in size, is easy to use and works with all Modern Browsers and requires no other library. There is also a Javascript Class version included.

### Library Syntax

```JavaScript
$ajax(string or object[, string or function])
```

**methods:**

```JavaScript
$ajax().updateID( string, object or string )
```
description: updates the innerHTML of an html element id with the string or object (converts object with JSON.stringify to string)

### Class Syntax

```JavaScript
liteAjax(string or object[, string or function])
```

**methods:**

```JavaScript
updateID( string, object or string )
```
description: updates the innerHTML of an html element id with the string or object (converts object with JSON.stringify to string)

**string or object:**

*string - a file path string*

```JavaScript
'myfile.json'
```

*object - a properties object*

```JavaScript
var properties = {
	url: 'filepath.json',
	method: 'GET',
	type: 'application/json',
	data: '{"test":"this is a test"}'
}
```

**string or function:**

*string - a html element id*

```JavaScript
'my-html-element-id'
```

*function - a callback function*

```JavaScript
mycallback
```

*or*

```JavaScript
function(){
	// my callback code
}
```

### Library Usage

This command loads 'test.json' into an html element with the id of 'test' and does so after the document has loaded and is ready.

```JavaScript
$ajax('test.json', 'test');
```

You can also load text just as easy.

```JavaScript
$ajax('test.txt', 'test');
```

You can specify the properties (but you don't have to)

```JavaScript
$ajax( { url: 'test.json',
		method: 'GET',
		type: 'application/json' });
```

You can specify a callback function if you want.

```JavaScript
function mycallback(data){
	console.log('data: ', data);
	document.writeln('data: ' + data);
}

$ajax( { url: 'test.json',
		method: 'GET',
		type: 'application/json' }, mycallback);
```

Or you can use an anonymous function as the callback.

```JavaScript
$ajax( { url: 'test.txt',
		type: 'text/plain' }, function(data){

			console.log('data: ', data);
			$ajax().updateID('test', data);

});
```

And of course you can send POST data and it will set the type for you.

```JavaScript
$ajax( { url: 'test.json',
		method: 'POST',
		data: '{ "test": { "testing": "1 2 3" } }' }, function(data){

			console.log('data: ', data);
			$ajax().updateID('test', data);

});
```

Create an $ajax object called test3 load 'test.json' and then run myCallBack3

```JavaScript
var myCallBack3 = function( data ){
  
	// test object properties
	console.log( 'test3 object: ', test3 );
	console.log( 'url: ' + test3.url );
	console.log( 'method: ' + test3.method );
	console.log( 'type: ' + test3.type );
	console.log( 'data: ' + test3.data );
	console.log( 'response: ' + test3.response() );
	console.log( 'element_id: ' + test3.element_id );
	console.log( 'callback: ', test3.callback );
  
    // do something with the data
    for( element in data ){
			data[element] = data[element] + ' >> :D << ';
	}

	// load the new data into the 'test3' div
	$ajax().updateID( 'test3', data );

}

var test3 = $ajax( 'test.json', myCallBack3 );
```

### Class Usage

This loads 'test.json' into an html element with the id of 'test' and does so after the document has loaded and is ready.

```JavaScript
var test = new liteAjax('test.json', 'test');
test.load();
```

You can specify the properties and a callback function if you want.

```JavaScript
function mycallback(){
	console.log('data: ', data);
	test.updateElement('test', data);
}

var test = new liteAjax( {
	url: 'test.json',
	method: 'GET',
	type: 'application/json' }, mycallback);
test.load();
```

