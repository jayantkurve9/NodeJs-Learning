const express = require('express');
const path = require('path');
const userRoutes = require('./routes/users');
const app = express();

app.use(userRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
	res.sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3005, () => {
	console.log("Listening on 3005");
})