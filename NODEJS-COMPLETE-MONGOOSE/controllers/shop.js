// const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then((products) => {
            const templateData = {
                prods: products,
                docTitle: "All Products",
                path: "/products",
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
            });
        })
        .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then((products) => {
            const templateData = {
                prods: products,
                docTitle: "Shop",
                path: "/",
            };
            res.render("shop/index", templateData);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then((products) => {
            const templateData = {
                path: "/cart",
                docTitle: "Your Cart",
                products: products,
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
            console.log("India", product);
            return req.user.addToCart(product);
        })
        .then((result) => {
            console.log(result);
            res.redirect("/cart");
        });
};

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .addOrder()
        .then((result) => {
            res.redirect("/orders");
        })
        .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    req.user
        .deleteItemFromCart(prodId)
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
    req.user
        .getOrders(req.user._id)
        .then((orders) => {
            console.log("orders", orders);
            const templateData = {
                path: "/orders",
                docTitle: "Your Orders",
                orders: orders,
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
