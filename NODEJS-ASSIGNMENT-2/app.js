const express = require('express');
const app = express();

app.use('/users', (req,res,next) => {
	console.log("In second middleware");
	res.send('<h1>Hello from users</h1>');
});

app.use('/', (req,res,next) => {
	console.log("In first middleware");
	res.send('<h1>Hello from default</h1>');
});


app.listen(3000, () => {
	console.log("Listening on port 3000.");
});