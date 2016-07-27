var http = require('http'); // do not change this line
var url = require('url'); // do not change this line
var querystring = require('querystring'); // do not change this line

var server = http.createServer(function(req, res) {
  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write('you have accessed the root');
  } else if (req.url.indexOf('/test/') === 0) {
		res.writeHead(200, {
      'Content-Type': 'text/plain'
    });

    res.write('you have accessed \"' + decodeURIComponent(req.url.substr(6)) + '\" within test');
		//decodeURIComponent(req.url.substr(6));
  } else if (req.url.indexOf('/attributes') === 0) {
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		var query = url.parse(req.url, true).query;
		
		var table_before = "<tr><td>";
		var table_middle = "</td><td>";
		var table_after = "</td></tr>";
		var content = "";

		for (var property in query) {
			content += table_before + property + table_middle + query[property] + table_after;
		}

		if (content !== "") {
			res.write('<table border=\"1\"><tbody>' + content + "</tbody></table>");
		} else {
			res.write('<table border=\"1\"></table>');
		}
  }

  res.end();
});

server.listen(process.env.PORT || 8080);

// create a server just like in the first exercise
// as shown in the examples, you are asked to respond to various requests in different ways

// examples which serve as a specification for the required features:
//   http://localhost:8080/ should return 'you have accessed the root' in plain text
//   http://localhost:8080/test/hello should return 'you have accessed hello within test' in plain text
//   http://localhost:8080/test/world should return 'you have accessed world within test' in plain text
//   http://localhost:8080/attributes?hello=world&lorem=ipsum should return the following as html
//     <!DOCTYPE html>
//       <html>
//       <body>
//         <table border="1">
//           <tr>
//             <td>hello</td><td>world</td>
//           </tr>
//           <tr>
//             <td>lorem</td><td>ipsum</td>
//           </tr>
//         </table>
//       </body>
//     </html>
//   http://localhost:8080/attributes?first=1&second=2&third=3 should return the following as html
//     <!DOCTYPE html>
//       <html>
//       <body>
//         <table border="1">
//           <tr>
//             <td>first</td><td>1</td>
//           </tr>
//           <tr>
//             <td>second</td><td>2</td>
//           </tr>
//           <tr>
//             <td>third</td><td>3</td>
//           </tr>
//         </table>
//       </body>
//     </html>
