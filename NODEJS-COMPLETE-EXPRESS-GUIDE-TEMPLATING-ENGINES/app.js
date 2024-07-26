const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');
const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');
// I gave the engine name to 'hbs' but it can be anything and the same name shoud be passed with second parameter with view engine
// app.engine('hbs', expressHbs({layoutsDir: 'views/layouts', defaultLayout: 'main-layout', extname: 'hbs'}));
// app.set('view engine', 'hbs');
// // setting the templating engine to pug
// app.set('view engine', 'pug');
// app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// middleware use to parse req data passed through html form.
app.use(bodyParser.urlencoded({extended: true}));
//serving a static css files to access it in html files in link tag
app.use(express.static(path.join(__dirname, 'public')));
// middleware use to parse req data passed through rest api.
app.use(express.json());
app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
	// res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
	res.status(404).render('404', { docTitle: 'Page not found.'});
});

app.listen(3000, ()=>{
	console.log("Listening on port 3000.");
});