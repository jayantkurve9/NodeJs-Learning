const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require('express-handlebars');
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
// I gave the engine name to 'hbs' but it can be anything and the same name shoud be passed with second parameter with view engine
// app.engine('hbs', expressHbs({layoutsDir: 'views/layouts', defaultLayout: 'main-layout', extname: 'hbs'}));
// app.set('view engine', 'hbs');
// // setting the templating engine to pug
// app.set('view engine', 'pug');
// app.set('views', 'views');

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

// middleware use to parse req data passed through html form.
app.use(bodyParser.urlencoded({ extended: true }));
//serving a static css files to access it in html files in link tag
app.use(express.static(path.join(__dirname, "public")));
// middleware use to parse req data passed through rest api.
app.use(express.json());
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000, () => {
    console.log("Listening on port 3000.");
});
