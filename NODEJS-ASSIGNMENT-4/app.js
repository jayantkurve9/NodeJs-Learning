const express = require('express');
const bodyParser = require('body-parser');
const usersData = require('./routes/users');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(usersData.routes);

const data = {
	docTitle: 'Add User'
};
app.get('/', (req,res) => {
	res.render('add-user', data);
});

app.use((req,res,next) => {
	res.status(404).render('404', { docTitle: 'Page Not Found' });
})


app.listen(3100, () => {
	console.log("Listening on port 3100");
})