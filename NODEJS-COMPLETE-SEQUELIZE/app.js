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

const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

// middleware use to parse req data passed through html form.
app.use(bodyParser.urlencoded({ extended: true }));
//serving a static css files to access it in html files in link tag
app.use(express.static(path.join(__dirname, "public")));
// middleware use to parse req data passed through rest api.
app.use(express.json());
// middleware to make available user for each request
app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user; // user is not plain JS object but sequelize object containing all sequelize methods
            next();
        })
        .catch((err) => console.log(err));
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product); // This is inverse of above line written just for knowlegde

User.hasOne(Cart);
Cart.belongsTo(User); // This is inverse of above line written just for knowlegde

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });

sequelize
    // .sync({ force: true })
    .sync()
    .then((result) => {
        return User.findByPk(1);
    })
    .then((user) => {
        if (!user) {
            User.create({ name: "Jayant", email: "jayant@gmail.com" });
        }
        return user;
    })
    .then((user) => {
        return user.createCart();
    })
    .then((cart) => {
        app.listen(3000, () => {
            console.log("Listening on port 3000.");
        });
    })
    .catch((err) => {
        console.log(err);
    });
