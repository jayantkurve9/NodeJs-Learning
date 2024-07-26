const fs = require('fs');

module.exports = (req, res) => {
	const url = req.url
	const method = req.method;

	if (url === '/') {
		res.write('<html>');
		res.write('<head><title>Form Page</title></head>');
		res.write('<body>')
		res.write('<form action="create-user" method="POST"><input type="text" placeholder="Type username..." name="username"/><button>Click</button></form>');
		res.write('<a href="/users">Users</a>');
		res.write('</body>');
		res.write('</html>');
		return res.end();
	}

	if (url === '/create-user' && method === 'POST') {
		const data = [];
		req.on('data', (chunk) => {
			data.push(chunk);
		});

		return req.on('end', () => {
			const parsedData = Buffer.concat(data).toString();
			const username = parsedData.split('=')[1];
			fs.appendFileSync('./data.txt', `${username} `);
			console.log(username);
			res.statusCode = 302;
			res.setHeader('Location', '/');
			return res.end();
		})
		
	}

	if (url === '/users') {
		const data = fs.readFileSync('./data.txt');
		const users = data.toString().trim().split(' ');
		res.write('<html>');
		res.write('<head><title>Users Page</title></head>');
		res.write('<body>');
		res.write('<a href="/">Back</a>');
		res.write('<h1>List of Users.</h1>');
		res.write('<ul>');
		for (const user of users) {
			res.write(`<li>${user}</li>`);
		}
		res.write('</ul>');
		res.write('</body>');
		res.write('</html>');
		return res.end();
	}

	res.write('<html>');
	res.write('<head><title>Hello There</title></head>');
	res.write('<body><h1>This is default route</h1></body>');
	res.write('</html>');
};