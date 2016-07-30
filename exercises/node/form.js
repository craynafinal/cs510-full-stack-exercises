var http = require('http'); // do not change this line
var message = [];

var server = http.createServer(function(req, res) {

	if (req.url === '/form') {
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});

		res.write('<!DOCTYPE html>');
		res.write('<html>');
			res.write('<body>');
				res.write('<form action="/new" method="post">');
					res.write('<input type="text" name="name">');
					res.write('<input type="text" name="message">');
					res.write('<input type="submit" value="submit">');
				res.write('</form>');
			res.write('</body>');
		res.write('</html>');
	} else if (req.url === '/new') {
		/*
			1. prepare the stream to receive data
			2. node will see the incoming data and that you prepared the stream, such that it will call the event handlers that you registered for receiving the data
			3. after a call to the 'end' handler, you would make use of the received data
			4. send the header (200, text/plain content-type)
			5. write 'thank you for your message'
			6. end the response
			7. hand the execution back to the event handler of node
		*/
		var body = [];

		req.on('error', function(err) {
			console.error(err);
		}).on('data', function(chunk) {
			body.push(chunk);
		}).on('end', function() {
			body = Buffer.concat(body).toString();
			
			var posts = body.split('&');
			var name = '';
			var msg = '';
 
			for (var idx in posts) {
				var tokens = posts[idx].split('=');
				if (tokens[0] === 'name')
					name = tokens[1];
				else if (tokens[0] === 'message')
					msg = tokens[1];
			}

			if (name !== '' && msg !== '')
				message.push(name + ': ' + msg);
		});
	
		res.writeHead(200, {
      'Content-Type': 'text/plain'
    });

		res.write('thank you for your message');
	} else if (req.url === '/list') {
		res.writeHead(200, {
      'Content-Type': 'text/plain'
    });

		var returnString = '';

		if (message !== []) {
			returnString = message.join('\n');
		}
		res.write(returnString);
	}

	res.end();
});

server.listen(process.env.PORT || 8080);

// create a server just like in the first exercise
// as shown in the examples, you are asked to respond to various requests in different ways
// you will need to use a stream to retrieve the post data

// examples which serve as a specification for the required features, note that they have an order:
//   http://localhost:8080/form should return the form as shown below
//   http://localhost:8080/new should retrieve the post data, save the name / message and return 'thank you for your message' in plain text
//   http://localhost:8080/list should return the stored messages 'name: message' in plain text
//   http://localhost:8080/form should return the form as shown below
//   http://localhost:8080/new should retrieve the post data, save the name / message and return 'thank you for your message' in plain text
//   http://localhost:8080/list should return the stored messages 'name: message\nanother name: another message' in plain text
//   [the server restarts and looses all messages]
//   http://localhost:8080/list should return '' in plain text

/*
res.writeHead(200, {
	'Content-Type': 'text/html'
});

res.write('<!DOCTYPE html>');
res.write('<html>');
	res.write('<body>');
		res.write('<form action="/new" method="post">');
			res.write('<input type="text" name="name">');
			res.write('<input type="text" name="message">');
			res.write('<input type="submit" value="submit">');
		res.write('</form>');
	res.write('</body>');
res.write('</html>');

res.end();
*/
