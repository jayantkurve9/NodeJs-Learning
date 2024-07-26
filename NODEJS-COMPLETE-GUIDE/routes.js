const fs = require('fs');

const requestHandler = (req, res) => {
		// stops server which is listening on port 3000 in a lookup.
	// process.exit();
	const url = req.url;
	const method = req.method;
	if (url === '/') {
		res.write('<html>');
		res.write('<head><title>Enter Message</title></head>');
		res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button>Send</button></form></body>');
		res.write('</html>');
		return res.end();
	}

	if (url === '/message' && method === 'POST') {
		const body = [];
		req.on('data', (chunk) => {
			body.push(chunk);
		});
		
		return req.on('end', () => {
			const parsedBody = Buffer.concat(body).toString();
			const message = parsedBody.split('=')[1].replace('+', ' ');
			fs.writeFileSync('./data.txt', message, err => {
				res.statusCode = 302;
				// Redirecting to '/' path.
				res.setHeader('Location', '/');
				return res.end();
			});
		});
	}
	res.setHeader('Content-Type', 'text/html');
	res.write('<html>');
	res.write('<head><title>My First Page</title></head>');
	res.write('<body><h1>Hello from my Node.js server</h1></body>');
	res.write('</html>');
	res.end();
};

module.exports = requestHandler;