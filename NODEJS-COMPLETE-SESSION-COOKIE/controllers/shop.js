// const Cart = require("../models/cart");
const Order = require("../models/order");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
    Product.find()
        .then((products) => {
            const templateData = {
                prods: products,
                docTitle: "All Products",
                path: "/products",
                isAuthenticated: req.session.isLoggedIn,
            };
            res.render("shop/product-list", templateData);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then((product) => {
            res.render("shop/product-detail", {
                product: product,
                docTitle: product.title,
                path: "/products",
                isAuthenticated: req.session.isLoggedIn,
            });
        })
        .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.find()
        .then((products) => {
            const templateData = {
                prods: products,
                docTitle: "Shop",
                path: "/",
                isAuthenticated: req.session.isLoggedIn,
            };
            res.render("shop/index", templateData);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getCart = (req, res, next) => {
    req.user
        .populate("cart.items.productId")
        .then((user) => {
            const products = user.cart.items;
            const templateData = {
                path: "/cart",
                docTitle: "Your Cart",
                products: products,
                isAuthenticated: req.session.isLoggedIn,
            };
            res.render("shop/cart", templateData);
        })
        .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log("Product id", prodId);
    Product.findById(prodId)
        .then((product) => {
            return req.user.addToCart(product);
        })
        .then((result) => {
            console.log(result);
            res.redirect("/cart");
        });
};

exports.postOrder = (req, res, next) => {
    req.user
        .populate("cart.items.productId")
        .then((user) => {
            const products = user.cart.items.map((i) => {
                return {
                    quantity: i.quantity,
                    product: { ...i.productId._doc },
                }; // _doc is mongoose method which return full document of that id
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user,
                },
                products: products,
            });
            return order.save();
        })
        .then((result) => {
            req.user.clearCart();
        })
        .then(() => {
            res.redirect("/orders");
        })
        .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    req.user
        .removeFromCart(prodId)
        .then((result) => {
            res.redirect("/cart");
        })
        .catch((err) => console.log(err));
    // Product.findById(prodId, (product) => {
    //     Cart.deleteProduct(prodId, product.price);
    //     res.redirect("/cart");
    // });
};

exports.getOrders = (req, res, next) => {
    Order.find({ "user.userId": req.user._id })
        .then((orders) => {
            console.log("orders", orders);
            const templateData = {
                path: "/orders",
                docTitle: "Your Orders",
                orders: orders,
                isAuthenticated: req.session.isLoggedIn,
            };
            res.render("shop/orders", templateData);
        })
        .catch((err) => console.log(err));
};

// exports.getCheckout = (req, res, next) => {
//     const templateData = {
//         path: "/checkout",
//         docTitle: "Checkout",
//     };
//     res.render("shop/checkout", templateData);
// };
