'use strict';

var express = require('express'); // do not change this line

var server = express();

server.get('/', function(req, res) {
	res.status(200);
	res.set({ 'Content-Type': 'text/plain' });
	res.write('you have accessed the root');
	res.end();
});

server.get('/test/:parameter', function(req, res) {
	res.status(200);
	res.set({ 'Content-Type': 'text/plain' });
	res.write('you have accessed \"' + req.params.parameter + '\" within test');
	res.end();
});

server.get('/attributes?*', function(req, res) {
	res.status(200);
  res.set({ 'Content-Type': 'text/html' });

	var table_before = "<tr><td>";
	var table_middle = "</td><td>";
	var table_after = "</td></tr>";
	var content = "<table border=\"1\">";

	var keys = Object.keys(req.query);

	if (keys.length > 0) {
		content += "<tbody>";

		for (var keyIndex in keys) {
			var key = keys[keyIndex];
			content += table_before + key + table_middle + req.query[key] + table_after;
		}
		content += "</tbody>";
	}
	content += "</table>";

	res.write(content);
	res.end();
});

server.listen(process.env.PORT || 8080);

// create an express server just like in the first exercise
// as shown in the examples, you are asked to respond to various requests in different ways

// examples which serve as a specification for the required features:
//   http://localhost:8080/ should return 'you have accessed the root' in plain text
//   http://localhost:8080/test/hello should return 'you have accessed "hello" within test' in plain text
//   http://localhost:8080/test/world should return 'you have accessed "world" within test' in plain text
//   http://localhost:8080/attributes?hello=world&lorem=ipsum should return the following as html (row order might differ)
//     <!DOCTYPE html>
//     <html>
//       <body>
//         <table border="1">
//           <tr><td>hello</td><td>world</td></tr>
//           <tr><td>lorem</td><td>ipsum</td></tr>
//         </table>
//       </body>
//     </html>
//   http://localhost:8080/attributes?first=1&second=2&third=3 should return the following as html (row order might differ)
//     <!DOCTYPE html>
//     <html>
//       <body>
//         <table border="1">
//           <tr><td>first</td><td>1</td></tr>
//           <tr><td>second</td><td>2</td></tr>
//           <tr><td>third</td><td>3</td></tr>
//         </table>
//       </body>
//     </html>
