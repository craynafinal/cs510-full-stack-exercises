var http = require('http'); // do not change this line

var server = http.createServer(function(req, res) {
  if (req.url === '/missing') {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.write('your princess is in another castle');
		//res.status(404).send('your princess is in another castle');
  } else if (req.url === '/redirect') {
		res.writeHead(302, { 'Location': '/redirected' });
  } else if (req.url === '/cache') {
		res.writeHead(200, {
			'Content-Type': 'text/plain',
			'Cache-Control': 'max-age=86400'
		});	
		res.write('cache this resource');
  } else if (req.url === '/cookie') {
		res.writeHead(200, {
			'Content-Type': 'text/plain',
			'Set-Cookie': 'hello=world'
		});
		res.write('i gave you a cookie');
	
  } else if (req.url === '/check') {
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});

/*
		var incoming_cookies = '';

		if (req.headers.cookie) {
			incoming_cookies = cookie.parse(req.headers.cookie);
		}	
		*/
		var incoming_cookies = req.headers.cookie;

		if (incoming_cookies !== undefined && incoming_cookies.includes('hello')) {
			res.write('yes');
		} else {
			res.write('no');
		}
  }

  res.end();
});

server.listen(process.env.PORT || 8080);

// create a server just like in the first exercise
// as shown in the examples, you are asked to respond to various requests in different ways

// examples which serve as a specification for the required features:
//   http://localhost:8080/missing should return a status code 404 with 'your princess is in another castle' in plain text
//   http://localhost:8080/redirect should redirect the request to '/redirected' by using 302 as the status code
//   http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day
//   http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie
//   http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie
