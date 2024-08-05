const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
// const expressHbs = require('express-handlebars');
const app = express();
const MONGODB_URI =
    "mongodb+srv://Jayant:EtQ0tiHYdgml5SPu@cluster0.nl6148i.mongodb.net/shop";

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions",
});

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
const authRoutes = require("./routes/auth");
const errorController = require("./controllers/error");
const User = require("./models/user");

// middleware use to parse req data passed through html form.
app.use(bodyParser.urlencoded({ extended: true }));
//serving a static css files to access it in html files in link tag
app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});
// middleware use to parse req data passed through rest api.
app.use(express.json());
// middleware to make available user for each request
// app.use((req, res, next) => {

// });
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
    .connect(MONGODB_URI)
    .then((result) => {
        User.findOne().then((user) => {
            if (!user) {
                const user = new User({
                    name: "Jayant Kurve",
                    email: "jayant@gmail.com",
                    cart: {
                        items: [],
                    },
                });
                user.save();
            }
        });
        app.listen(3000);
        console.log("connected");
    })
    .catch((err) => {
        console.log(err);
    });
